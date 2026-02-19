"use client";

import AnimatedModal, {
  type AnimatedModalProps,
  type ModalCloseReason,
} from "@/app/components/ui/AnimatedModal";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useId, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editPermitRequest,
  postPermitRequest,
  type GetPermitResT,
  type PermitPayload,
  type PermitTypeT,
} from "@/app/api/permit";
import {
  MdAddAPhoto,
  MdArrowBack,
  MdArrowForward,
  MdBadge,
  MdCheck,
  MdCheckCircle,
  MdCloudUpload,
  MdClose,
  MdDescription,
  MdExpandMore,
  MdFolderShared,
  MdInfo,
  MdPayment,
  MdPerson,
  MdPublic,
} from "react-icons/md";

export type PermitType = "hajj" | "umrah";

type PaymentMethod = "card" | "bank";

type CardData = {
  cardholder: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

type PaymentErrors = Partial<
  Record<
    "method" | "cardholder" | "cardNumber" | "expiry" | "cvc" | "receipt",
    string
  >
>;

function joinClassNames(...values: Array<string | undefined | false | null>) {
  return values.filter(Boolean).join(" ");
}

function isValidISODate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const dt = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(dt.getTime())) return false;
  const [y, m, d] = value.split("-").map(Number);
  return (
    dt.getUTCFullYear() === y &&
    dt.getUTCMonth() + 1 === m &&
    dt.getUTCDate() === d
  );
}

function luhnCheck(inputDigits: string) {
  let sum = 0;
  let shouldDouble = false;

  for (let i = inputDigits.length - 1; i >= 0; i -= 1) {
    const code = inputDigits.charCodeAt(i) - 48;
    if (code < 0 || code > 9) return false;

    let digit = code;
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

function isValidExpiryMMYY(value: string) {
  const match = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(value);
  if (!match) return false;

  const mm = Number(match[1]);
  const yy = Number(match[2]);

  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  if (yy < currentYear) return false;
  if (yy === currentYear && mm < currentMonth) return false;
  return true;
}

function formatCardNumber(value: string) {
  const digits = value.replace(/\D+/g, "").slice(0, 19);
  const groups: string[] = [];
  for (let i = 0; i < digits.length; i += 4) {
    groups.push(digits.slice(i, i + 4));
  }
  return groups.join(" ");
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D+/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

const step1Schema = z.object({
  permitType: z
    .string()
    .trim()
    .min(1, "نوع التصريح مطلوب")
    .refine((v) => v === "hajj" || v === "umrah", "نوع التصريح مطلوب"),
  notes: z.string().trim().optional().or(z.literal("")),
});

const step2Schema = z.object({
  fullName: z.string().trim().min(1, "الاسم الكامل مطلوب"),
  idNumber: z.string().trim().min(6, "رقم الهوية / الجواز غير صحيح"),
  birthDate: z
    .string()
    .trim()
    .min(1, "تاريخ الميلاد مطلوب")
    .refine((v) => isValidISODate(v), "تاريخ الميلاد غير صحيح"),
  nationality: z.string().trim().min(1, "الجنسية مطلوبة"),
});

const receiptSchema = z
  .instanceof(File, { message: "إيصال التحويل مطلوب" })
  .refine(
    (f) =>
      f.type === "application/pdf" ||
      f.type.startsWith("image/") ||
      f.type === "",
    "صيغة الإيصال غير مدعومة",
  )
  .refine((f) => f.size <= 10 * 1024 * 1024, "حجم الملف كبير جداً");

const cardSchema = z.object({
  method: z.literal("card"),
  cardholder: z.string().trim().min(2, "اسم حامل البطاقة مطلوب"),
  cardNumber: z
    .string()
    .trim()
    .min(12, "رقم البطاقة غير صحيح")
    .transform((v) => v.replace(/\s+/g, ""))
    .refine((digits) => /^\d{12,19}$/.test(digits), "رقم البطاقة غير صحيح")
    .refine((digits) => luhnCheck(digits), "رقم البطاقة غير صحيح"),
  expiry: z
    .string()
    .trim()
    .min(1, "تاريخ الانتهاء مطلوب")
    .refine((v) => isValidExpiryMMYY(v), "تاريخ الانتهاء غير صحيح"),
  cvc: z
    .string()
    .trim()
    .min(3, "رمز الأمان غير صحيح")
    .refine((v) => /^\d{3,4}$/.test(v), "رمز الأمان غير صحيح"),
});

const bankSchema = z.object({
  method: z.literal("bank"),
  receipt: receiptSchema,
});

const paymentSchema = z.discriminatedUnion("method", [cardSchema, bankSchema]);
type PaymentValues = z.infer<typeof paymentSchema>;

export type PermitsRequestPayload = {
  permitType: PermitType;
  notes?: string;
  applicant: {
    fullName: string;
    idNumber: string;
    birthDate: string;
    nationality: string;
  };
  documents: {
    idFile: File;
    personalPhoto: File;
  };
  payment: PaymentValues;
};

type PermitSubmitArgs = {
  apiPayload: PermitPayload;
  apiResponse: unknown;
  mode: "create" | "update";
};

export type PermitsRequestModalProps = {
  open: boolean;
  onOpenChange: (open: boolean, reason: ModalCloseReason) => void;

  permits?: GetPermitResT;

  onComplete?: (args: PermitSubmitArgs) => void | Promise<void>;

  modalProps?: Omit<
    AnimatedModalProps,
    "open" | "onOpenChange" | "children" | "title" | "description"
  >;
};

type FormValues = z.infer<typeof step1Schema> & z.infer<typeof step2Schema>;

const NATIONALITIES = [
  "المملكة العربية السعودية",
  "مصر",
  "الإمارات العربية المتحدة",
  "الكويت",
  "الأردن",
  "أخرى",
] as const;

function getPermitLabel(type: PermitType) {
  return type === "hajj" ? "تصريح حج" : "تصريح عمرة";
}

export default function PermitsRequestModal({
  open,
  onOpenChange,
  permits,
  onComplete,
  modalProps,
}: PermitsRequestModalProps) {
  const formId = useId();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [personalPhoto, setPersonalPhoto] = useState<File | null>(null);
  const [docsError, setDocsError] = useState<string | null>(null);

  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [savedRequest, setSavedRequest] = useState<PermitSubmitArgs | null>(
    null,
  );

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [cardData, setCardData] = useState<CardData>({
    cardholder: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [bankReceipt, setBankReceipt] = useState<File | null>(null);
  const [paymentErrors, setPaymentErrors] = useState<PaymentErrors>({});

  const {
    register,
    trigger,
    watch,
    getValues,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(step1Schema.merge(step2Schema)),
    defaultValues: {
      permitType: "umrah",
      notes: "",
      fullName: "",
      idNumber: "",
      birthDate: "",
      nationality: "",
    },
    mode: "onSubmit",
  });

  const canClose = !(isSubmitting || isSending);

  useEffect(() => {
    if (open) return;
    setStep(1);
    reset();
    setIdFile(null);
    setPersonalPhoto(null);
    setDocsError(null);
    setSubmitError(null);
    setIsSending(false);
    setSavedRequest(null);
    setPaymentMethod("card");
    setCardData({ cardholder: "", cardNumber: "", expiry: "", cvc: "" });
    setBankReceipt(null);
    setPaymentErrors({});
  }, [open, reset]);

  const permitType = watch("permitType") as PermitType;

  const formatNumber = useMemo(
    () =>
      new Intl.NumberFormat(undefined, {
        maximumFractionDigits: 2,
      }),
    [],
  );

  function formatSAR(value: number) {
    return `${formatNumber.format(value)} SAR`;
  }

  const permitPriceByType = useMemo(() => {
    const out: Partial<Record<PermitType, number>> = {};
    for (const p of permits?.permits ?? []) {
      if (p?.type === "PermitHajj") out.hajj = Number(p.price);
      if (p?.type === "PermitUmrah") out.umrah = Number(p.price);
    }
    return out;
  }, [permits]);

  function mapPermitTypeToApi(type: PermitType): PermitTypeT {
    return type === "hajj" ? "PermitHajj" : "PermitUmrah";
  }

  function hasSavedRequestToken(): boolean {
    try {
      const token = window.localStorage.getItem("token");
      return typeof token === "string" && token.length >= 10;
    } catch {
      return false;
    }
  }

  function persistRequestToken(token: string) {
    try {
      window.localStorage.setItem("token", token);
    } catch {
      // ignore
    }
  }

  async function savePermitRequest(): Promise<PermitSubmitArgs> {
    if (!idFile || !personalPhoto) {
      throw new Error("يرجى رفع صورة الهوية والصورة الشخصية");
    }

    const values = getValues();
    const apiPayload: PermitPayload = {
      customer: {
        name: values.fullName.trim(),
        phone: "",
        country: "",
        email: "",
        dob: values.birthDate,
        id_number: values.idNumber.trim(),
        nationality: values.nationality,
        additional_notes: values.notes?.trim() ? values.notes.trim() : "",
        permit_type: mapPermitTypeToApi(values.permitType as PermitType),
      },
      files: {
        id_number_file: idFile,
        personal_photo_file: personalPhoto,
      },
    };

    const hasToken = hasSavedRequestToken();
    let apiResponse: unknown;
    let mode: "create" | "update";

    if (hasToken) {
      mode = "update";
      apiResponse = await editPermitRequest(apiPayload);
    } else {
      mode = "create";
      apiResponse = await postPermitRequest(apiPayload);

      const token = (apiResponse as { token?: unknown } | null)?.token;
      if (typeof token === "string" && token.length >= 10) {
        persistRequestToken(token);
      }
    }

    return { apiPayload, apiResponse, mode };
  }

  async function finalizeAndClose() {
    setSubmitError(null);
    try {
      const args = savedRequest ?? (await savePermitRequest());
      await (onComplete?.(args) ?? Promise.resolve());
      onOpenChange(false, "programmatic");
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "حدث خطأ غير متوقع");
    }
  }

  const progressPercent = useMemo(() => {
    const idx = step - 1;
    return Math.round((idx / 3) * 100);
  }, [step]);

  const inputBase =
    "w-full pr-10 pl-4 py-3 bg-input-fill dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-[#332e25] focus:ring-2 focus:ring-primary/50 focus:border-primary text-gray-900 dark:text-white placeholder-gray-400 transition-all";

  const inputBaseNoIcon =
    "w-full px-4 py-3 bg-input-fill dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-[#332e25] focus:ring-2 focus:ring-primary/50 focus:border-primary text-gray-900 dark:text-white placeholder-gray-400 transition-all";

  function validateDocuments() {
    if (!idFile || !personalPhoto) {
      setDocsError("يرجى رفع صورة الهوية والصورة الشخصية");
      return false;
    }
    setDocsError(null);
    return true;
  }

  function validatePayment(): PaymentValues | null {
    const values: unknown =
      paymentMethod === "card"
        ? { method: paymentMethod, ...cardData }
        : { method: paymentMethod, receipt: bankReceipt };

    const result = paymentSchema.safeParse(values);
    if (result.success) {
      setPaymentErrors({});
      return result.data;
    }

    const nextErrors: PaymentErrors = {};
    for (const issue of result.error.issues) {
      const key = (issue.path[0] ?? "method") as keyof PaymentErrors;
      if (!nextErrors[key]) nextErrors[key] = issue.message;
    }
    setPaymentErrors(nextErrors);
    return null;
  }

  async function goNext() {
    if (step === 1) {
      const ok = await trigger(["permitType", "notes"]);
      if (ok) setStep(2);
      return;
    }

    if (step === 2) {
      const ok = await trigger([
        "fullName",
        "idNumber",
        "birthDate",
        "nationality",
      ]);
      if (!ok) return;
      if (!validateDocuments()) return;

      setSubmitError(null);
      setIsSending(true);
      try {
        const args = await savePermitRequest();
        setSavedRequest(args);
        setStep(3);
      } catch (e) {
        setSubmitError(e instanceof Error ? e.message : "حدث خطأ غير متوقع");
      } finally {
        setIsSending(false);
      }
      return;
    }

    if (step === 3) {
      // Payment integration isn't wired yet; allow moving forward.
      setStep(4);
    }
  }

  function goBack() {
    setDocsError(null);
    setPaymentErrors((s) => ({ ...s, method: undefined }));
    setStep((s) => (s === 1 ? 1 : ((s - 1) as 1 | 2 | 3 | 4)));
  }

  async function submitRequest() {
    await finalizeAndClose();
  }

  const steps = [
    { n: 1, label: "نوع التصريح", icon: <MdDescription aria-hidden /> },
    {
      n: 2,
      label: "البيانات والمستندات",
      icon: <MdFolderShared aria-hidden />,
    },
    { n: 3, label: "الدفع", icon: <MdPayment aria-hidden /> },
    { n: 4, label: "مراجعة الطلب", icon: <MdCheckCircle aria-hidden /> },
  ] as const;

  const stepPanel = (
    <AnimatePresence mode="wait" initial={false}>
      {step === 1 ? (
        <motion.div
          key="step-1"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="space-y-6"
        >
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            اختر نوع التصريح المطلوب
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="cursor-pointer relative">
              <input
                type="radio"
                value="hajj"
                {...register("permitType")}
                className="sr-only"
              />
              <div
                className={joinClassNames(
                  "h-full p-6 border-2 rounded-xl transition-all flex flex-col items-center text-center gap-4 bg-white dark:bg-gray-800",
                  permitType === "hajj"
                    ? "border-primary/60"
                    : "border-gray-100 dark:border-gray-700 hover:border-primary/40",
                )}
              >
                <div className="w-16 h-16 rounded-full bg-input-fill dark:bg-gray-700 flex items-center justify-center text-primary mb-2">
                  <MdDescription className="text-3xl" aria-hidden />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                    تصريح حج
                  </h3>
                  {typeof permitPriceByType.hajj === "number" &&
                  Number.isFinite(permitPriceByType.hajj) ? (
                    <p className="mt-2 text-sm font-bold text-primary">
                      {formatSAR(permitPriceByType.hajj)}
                    </p>
                  ) : null}
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                    إصدار تصريح لأداء فريضة الحج للمواطنين والمقيمين.
                  </p>
                </div>
              </div>
            </label>

            <label className="cursor-pointer relative">
              <input
                type="radio"
                value="umrah"
                {...register("permitType")}
                className="sr-only"
              />
              <div
                className={joinClassNames(
                  "h-full p-6 border-2 rounded-xl transition-all flex flex-col items-center text-center gap-4 bg-white dark:bg-gray-800",
                  permitType === "umrah"
                    ? "border-primary/60"
                    : "border-gray-100 dark:border-gray-700 hover:border-primary/40",
                )}
              >
                <div className="w-16 h-16 rounded-full bg-input-fill dark:bg-gray-700 flex items-center justify-center text-primary mb-2">
                  <MdDescription className="text-3xl" aria-hidden />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                    تصريح عمرة
                  </h3>
                  {typeof permitPriceByType.umrah === "number" &&
                  Number.isFinite(permitPriceByType.umrah) ? (
                    <p className="mt-2 text-sm font-bold text-primary">
                      {formatSAR(permitPriceByType.umrah)}
                    </p>
                  ) : null}
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                    إصدار تصريح لأداء العمرة وزيارة الروضة الشريفة.
                  </p>
                </div>
              </div>
            </label>
          </div>

          {errors.permitType?.message ? (
            <p className="text-sm text-red-500">{errors.permitType.message}</p>
          ) : null}

          <label className="space-y-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              ملاحظات إضافية (اختياري)
            </span>
            <textarea
              {...register("notes")}
              rows={3}
              className={joinClassNames(
                "w-full px-4 py-3 bg-input-fill dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-[#332e25] focus:ring-2 focus:ring-primary/50 focus:border-primary text-gray-900 dark:text-white placeholder-gray-400 transition-all",
              )}
              placeholder="أي تفاصيل تساعدنا في إنجاز طلبك"
            />
          </label>
        </motion.div>
      ) : step === 2 ? (
        <motion.div
          key="step-2"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              المعلومات الشخصية
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  الاسم الكامل (كما في الهوية)
                </label>
                <div className="relative">
                  <span className="absolute right-3 inset-y-0 flex items-center text-gray-400 pointer-events-none">
                    <MdPerson className="text-lg" aria-hidden />
                  </span>
                  <input
                    {...register("fullName")}
                    className={joinClassNames(
                      inputBase,
                      errors.fullName ? "ring-2 ring-red-500/40" : undefined,
                    )}
                    placeholder="أدخل اسمك الرباعي"
                    type="text"
                    aria-invalid={Boolean(errors.fullName)}
                  />
                </div>
                {errors.fullName?.message ? (
                  <p className="text-sm text-red-500">
                    {errors.fullName.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  رقم الهوية / جواز السفر
                </label>
                <div className="relative">
                  <span className="absolute right-3 inset-y-0 flex items-center text-gray-400 pointer-events-none">
                    <MdBadge className="text-lg" aria-hidden />
                  </span>
                  <input
                    {...register("idNumber")}
                    className={joinClassNames(
                      inputBase,
                      errors.idNumber ? "ring-2 ring-red-500/40" : undefined,
                    )}
                    placeholder="1234567890"
                    type="text"
                    aria-invalid={Boolean(errors.idNumber)}
                  />
                </div>
                {errors.idNumber?.message ? (
                  <p className="text-sm text-red-500">
                    {errors.idNumber.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  تاريخ الميلاد
                </label>
                <div className="relative">
                  <input
                    {...register("birthDate")}
                    className={joinClassNames(
                      inputBaseNoIcon,
                      errors.birthDate ? "ring-2 ring-red-500/40" : undefined,
                    )}
                    type="date"
                    aria-invalid={Boolean(errors.birthDate)}
                  />
                </div>
                {errors.birthDate?.message ? (
                  <p className="text-sm text-red-500">
                    {errors.birthDate.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  الجنسية
                </label>
                <div className="relative">
                  <span className="absolute right-3 inset-y-0 flex items-center text-gray-400 pointer-events-none">
                    <MdPublic className="text-lg" aria-hidden />
                  </span>
                  <select
                    {...register("nationality")}
                    className={joinClassNames(
                      "w-full pr-10 pl-10 py-3 bg-input-fill dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-[#332e25] focus:ring-2 focus:ring-primary/50 focus:border-primary text-gray-900 dark:text-white transition-all appearance-none cursor-pointer",
                      errors.nationality ? "ring-2 ring-red-500/40" : undefined,
                    )}
                    aria-invalid={Boolean(errors.nationality)}
                  >
                    <option value="">اختر الجنسية</option>
                    {NATIONALITIES.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <span className="absolute left-3 inset-y-0 flex items-center text-gray-400 pointer-events-none">
                    <MdExpandMore className="text-lg" aria-hidden />
                  </span>
                </div>
                {errors.nationality?.message ? (
                  <p className="text-sm text-red-500">
                    {errors.nationality.message}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              المرفقات والمستندات
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group relative">
                <label className="block w-full cursor-pointer">
                  <input
                    className="hidden"
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => {
                      const f = e.target.files?.[0] ?? null;
                      setIdFile(f);
                      setDocsError(null);
                    }}
                  />
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all group-hover:border-primary/50 group-hover:bg-primary/5 bg-white dark:bg-gray-800">
                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 group-hover:text-primary mb-3 transition-colors">
                      <MdCloudUpload className="text-2xl" aria-hidden />
                    </div>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-1">
                      صورة الهوية
                    </span>
                    <span className="text-xs text-gray-400">
                      JPG, PNG, PDF بحد أقصى 10MB
                    </span>
                    {idFile ? (
                      <span className="mt-2 text-xs text-primary truncate max-w-full">
                        {idFile.name}
                      </span>
                    ) : null}
                  </div>
                </label>
              </div>

              <div className="group relative">
                <label className="block w-full cursor-pointer">
                  <input
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0] ?? null;
                      setPersonalPhoto(f);
                      setDocsError(null);
                    }}
                  />
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all group-hover:border-primary/50 group-hover:bg-primary/5 bg-white dark:bg-gray-800">
                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 group-hover:text-primary mb-3 transition-colors">
                      <MdAddAPhoto className="text-2xl" aria-hidden />
                    </div>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-1">
                      الصورة الشخصية
                    </span>
                    <span className="text-xs text-gray-400">
                      يجب أن تكون خلفية بيضاء
                    </span>
                    {personalPhoto ? (
                      <span className="mt-2 text-xs text-primary truncate max-w-full">
                        {personalPhoto.name}
                      </span>
                    ) : null}
                  </div>
                </label>
              </div>
            </div>

            {docsError ? (
              <p className="mt-3 text-sm text-red-500">{docsError}</p>
            ) : null}
          </div>
        </motion.div>
      ) : step === 3 ? (
        <motion.div
          key="step-3"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="space-y-5"
        >
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            الدفع
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label
              className={joinClassNames(
                "relative flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all",
                paymentMethod === "card"
                  ? "border-2 border-primary bg-primary/5"
                  : "border border-gray-200 dark:border-[#332e25] hover:bg-gray-50 dark:hover:bg-[#221d14]",
              )}
            >
              <input
                type="radio"
                checked={paymentMethod === "card"}
                onChange={() => {
                  setPaymentMethod("card");
                  setPaymentErrors((s) => ({
                    ...s,
                    method: undefined,
                    receipt: undefined,
                  }));
                }}
                className="size-4 text-primary focus:ring-primary"
              />
              <span className="font-bold text-gray-900 dark:text-white">
                بطاقة
              </span>
            </label>

            <label
              className={joinClassNames(
                "relative flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all",
                paymentMethod === "bank"
                  ? "border-2 border-primary bg-primary/5"
                  : "border border-gray-200 dark:border-[#332e25] hover:bg-gray-50 dark:hover:bg-[#221d14]",
              )}
            >
              <input
                type="radio"
                checked={paymentMethod === "bank"}
                onChange={() => {
                  setPaymentMethod("bank");
                  setPaymentErrors((s) => ({
                    ...s,
                    method: undefined,
                    cardholder: undefined,
                    cardNumber: undefined,
                    expiry: undefined,
                    cvc: undefined,
                  }));
                }}
                className="size-4 text-primary focus:ring-primary"
              />
              <span className="font-bold text-gray-900 dark:text-white">
                تحويل بنكي
              </span>
            </label>
          </div>

          {paymentErrors.method ? (
            <p className="text-sm text-red-500">{paymentErrors.method}</p>
          ) : null}

          {paymentMethod === "card" ? (
            <div className="rounded-2xl border border-gray-100 dark:border-[#332e25] bg-background-light/60 dark:bg-background-dark/40 p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="sm:col-span-2 space-y-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    اسم حامل البطاقة
                  </span>
                  <input
                    value={cardData.cardholder}
                    onChange={(e) => {
                      const v = e.target.value;
                      setCardData((s) => ({ ...s, cardholder: v }));
                      setPaymentErrors((s) => ({
                        ...s,
                        cardholder: undefined,
                      }));
                    }}
                    className={joinClassNames(
                      "w-full rounded-xl border bg-background-light dark:bg-background-dark px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary",
                      paymentErrors.cardholder
                        ? "border-red-400 dark:border-red-500 focus:ring-red-500/30 focus:border-red-500"
                        : "border-gray-200 dark:border-[#332e25]",
                    )}
                    type="text"
                    aria-invalid={Boolean(paymentErrors.cardholder)}
                  />
                  {paymentErrors.cardholder ? (
                    <p className="text-sm text-red-500">
                      {paymentErrors.cardholder}
                    </p>
                  ) : null}
                </label>

                <label className="sm:col-span-2 space-y-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    رقم البطاقة
                  </span>
                  <input
                    dir="ltr"
                    value={cardData.cardNumber}
                    onChange={(e) => {
                      const v = formatCardNumber(e.target.value);
                      setCardData((s) => ({ ...s, cardNumber: v }));
                      setPaymentErrors((s) => ({
                        ...s,
                        cardNumber: undefined,
                      }));
                    }}
                    className={joinClassNames(
                      "w-full rounded-xl border bg-background-light dark:bg-background-dark px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary",
                      paymentErrors.cardNumber
                        ? "border-red-400 dark:border-red-500 focus:ring-red-500/30 focus:border-red-500"
                        : "border-gray-200 dark:border-[#332e25]",
                    )}
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="0000 0000 0000 0000"
                    aria-invalid={Boolean(paymentErrors.cardNumber)}
                  />
                  {paymentErrors.cardNumber ? (
                    <p className="text-sm text-red-500">
                      {paymentErrors.cardNumber}
                    </p>
                  ) : null}
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    تاريخ الانتهاء
                  </span>
                  <input
                    dir="ltr"
                    value={cardData.expiry}
                    onChange={(e) => {
                      const v = formatExpiry(e.target.value);
                      setCardData((s) => ({ ...s, expiry: v }));
                      setPaymentErrors((s) => ({ ...s, expiry: undefined }));
                    }}
                    className={joinClassNames(
                      "w-full rounded-xl border bg-background-light dark:bg-background-dark px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary",
                      paymentErrors.expiry
                        ? "border-red-400 dark:border-red-500 focus:ring-red-500/30 focus:border-red-500"
                        : "border-gray-200 dark:border-[#332e25]",
                    )}
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    placeholder="MM/YY"
                    aria-invalid={Boolean(paymentErrors.expiry)}
                  />
                  {paymentErrors.expiry ? (
                    <p className="text-sm text-red-500">
                      {paymentErrors.expiry}
                    </p>
                  ) : null}
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    CVC
                  </span>
                  <input
                    dir="ltr"
                    value={cardData.cvc}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D+/g, "").slice(0, 4);
                      setCardData((s) => ({ ...s, cvc: v }));
                      setPaymentErrors((s) => ({ ...s, cvc: undefined }));
                    }}
                    className={joinClassNames(
                      "w-full rounded-xl border bg-background-light dark:bg-background-dark px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary",
                      paymentErrors.cvc
                        ? "border-red-400 dark:border-red-500 focus:ring-red-500/30 focus:border-red-500"
                        : "border-gray-200 dark:border-[#332e25]",
                    )}
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    placeholder="123"
                    aria-invalid={Boolean(paymentErrors.cvc)}
                  />
                  {paymentErrors.cvc ? (
                    <p className="text-sm text-red-500">{paymentErrors.cvc}</p>
                  ) : null}
                </label>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-100 dark:border-[#332e25] bg-background-light/60 dark:bg-background-dark/40 p-5 space-y-3">
              <label className="space-y-2">
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  رفع إيصال التحويل
                </span>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => {
                    const f = e.target.files?.[0] ?? null;
                    setBankReceipt(f);
                    setPaymentErrors((s) => ({ ...s, receipt: undefined }));
                  }}
                  className={joinClassNames(
                    "w-full rounded-xl border bg-background-light dark:bg-background-dark px-4 py-3 text-gray-900 dark:text-white",
                    paymentErrors.receipt
                      ? "border-red-400 dark:border-red-500"
                      : "border-gray-200 dark:border-[#332e25]",
                  )}
                />
                {paymentErrors.receipt ? (
                  <p className="text-sm text-red-500">
                    {paymentErrors.receipt}
                  </p>
                ) : null}
                {bankReceipt ? (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    تم اختيار: {bankReceipt.name}
                  </p>
                ) : null}
              </label>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          key="step-4"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
              ملخص الطلب
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between border-b border-primary/10 pb-2">
                <span className="text-gray-500">نوع التصريح</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {getPermitLabel(permitType)}
                </span>
              </div>

              <div className="flex justify-between border-b border-primary/10 pb-2">
                <span className="text-gray-500">الاسم الكامل</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {watch("fullName") || "—"}
                </span>
              </div>

              <div className="flex justify-between border-b border-primary/10 pb-2">
                <span className="text-gray-500">رقم الهوية</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {watch("idNumber") || "—"}
                </span>
              </div>

              <div className="flex justify-between border-b border-primary/10 pb-2">
                <span className="text-gray-500">الجنسية</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {watch("nationality") || "—"}
                </span>
              </div>

              <div className="flex justify-between pt-2">
                <span className="text-gray-500">المستندات</span>
                <span className="font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
                  <MdCheck className="text-sm" aria-hidden />
                  مكتملة
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-300">
            <MdInfo className="text-primary mt-0.5" aria-hidden />
            <p>
              بالضغط على &quot;إرسال الطلب&quot;، فإنك تقر بصحة جميع البيانات
              المدخلة وتوافق على الشروط والأحكام الخاصة بوزارة الحج والعمرة.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <AnimatedModal
      open={open}
      onOpenChange={(nextOpen, reason) => {
        if (!nextOpen && !canClose) return;
        onOpenChange(nextOpen, reason);
      }}
      size="xl"
      showCloseButton={false}
      closeOnBackdropClick={canClose}
      closeOnEscape={canClose}
      panelClassName="max-w-4xl rounded-3xl border border-primary/10 bg-surface-light dark:bg-surface-dark"
      bodyClassName="px-0 pb-0"
      {...modalProps}
    >
      <main className="w-full flex flex-col max-h-[90vh]">
        <header className="flex items-center justify-between p-6 pb-4 border-b border-gray-100 dark:border-gray-700/50">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
              طلب خدمة تصاريح الحج والعمرة
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              أكمل البيانات للحصول على التصريح الرسمي
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false, "closeButton")}
            disabled={!canClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400"
            aria-label="إغلاق"
          >
            <MdClose className="text-2xl" aria-hidden />
          </button>
        </header>

        <div className="px-8 py-6">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 -z-10 transform -translate-y-1/2 mx-12" />
            <div
              className="absolute top-1/2 right-0 h-0.5 bg-primary -z-10 transform -translate-y-1/2 mx-12 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />

            {steps.map((s) => {
              const isActive = s.n <= step;
              const isCurrent = s.n === step;
              return (
                <div
                  key={s.n}
                  className={joinClassNames(
                    "flex flex-col items-center gap-2 group",
                    s.n < step ? "cursor-pointer" : "cursor-default",
                    !isActive ? "opacity-50" : undefined,
                  )}
                  onClick={() => {
                    if (s.n < step) setStep(s.n);
                  }}
                  role={s.n < step ? "button" : undefined}
                  tabIndex={s.n < step ? 0 : -1}
                  onKeyDown={(e) => {
                    if (s.n >= step) return;
                    if (e.key === "Enter" || e.key === " ") setStep(s.n);
                  }}
                >
                  <div
                    className={joinClassNames(
                      "w-10 h-10 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-surface-dark z-10 transition-transform",
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400",
                      isCurrent ? "group-hover:scale-105" : undefined,
                    )}
                  >
                    <span className="text-lg" aria-hidden>
                      {s.icon}
                    </span>
                  </div>
                  <span
                    className={joinClassNames(
                      "text-xs font-bold",
                      isActive
                        ? "text-primary"
                        : "text-gray-500 dark:text-gray-400",
                    )}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <form
          id={formId}
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex-1 overflow-y-auto px-8 py-4"
        >
          {stepPanel}
        </form>

        <footer className="p-6 border-t border-gray-100 dark:border-gray-700/50 bg-surface-light dark:bg-surface-dark rounded-b-3xl">
          {submitError ? (
            <p className="mb-3 text-sm text-red-500">{submitError}</p>
          ) : null}

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={
                step === 1 ? () => onOpenChange(false, "programmatic") : goBack
              }
              disabled={!canClose}
              className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 group"
            >
              <MdArrowForward
                className="text-lg group-hover:-translate-x-1 transition-transform ltr:rotate-180"
                aria-hidden
              />
              {step === 1 ? "إلغاء" : "السابق"}
            </button>

            {step === 4 ? (
              <button
                type="button"
                onClick={() => submitRequest()}
                disabled={!canClose}
                className="px-8 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40 flex items-center gap-2 group transform active:scale-95"
              >
                إرسال الطلب
                <MdArrowBack
                  className="text-lg group-hover:translate-x-[-4px] transition-transform ltr:rotate-180"
                  aria-hidden
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => goNext()}
                disabled={!canClose}
                className="px-8 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40 flex items-center gap-2 group transform active:scale-95"
              >
                التالي
                <MdArrowBack
                  className="text-lg group-hover:translate-x-[-4px] transition-transform ltr:rotate-180"
                  aria-hidden
                />
              </button>
            )}
          </div>
        </footer>
      </main>
    </AnimatedModal>
  );
}
