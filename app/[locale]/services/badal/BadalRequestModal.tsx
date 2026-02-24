"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

import AnimatedModal, {
  type AnimatedModalProps,
  type ModalCloseReason,
} from "@/app/components/ui/AnimatedModal";

import {
  editBadelRequest,
  postBadelRequest,
  type BadelPayload,
} from "@/app/api/badel";

import { formatCardNumber, formatExpiry, formatFileSize } from "@/lib/utils";

export type BadalServiceType = "umrah" | "hajj";

type CountryValue = "sa" | "id" | "ms" | "tr" | "lk";

type CountryOption = {
  value: CountryValue;
  dial: string;
  flag: string;
  label: string;
};

const COUNTRY_OPTIONS: readonly CountryOption[] = [
  { value: "sa", dial: "+966", flag: "sa", label: "السعودية" },
  { value: "id", dial: "+62", flag: "id", label: "إندونيسيا" },
  { value: "ms", dial: "+60", flag: "my", label: "ماليزيا" },
  { value: "tr", dial: "+90", flag: "tr", label: "تركيا" },
  { value: "lk", dial: "+94", flag: "lk", label: "سريلانكا" },
] as const;

type CountryDropdownMode = "dial" | "country";

function CountryDropdown({
  value,
  onChange,
  options,
  mode,
  placeholder,
  invalid,
  buttonClassName,
  dir,
}: {
  value: CountryValue | "";
  onChange: (value: CountryValue | "") => void;
  options: readonly CountryOption[];
  mode: CountryDropdownMode;
  placeholder?: string;
  invalid?: boolean;
  buttonClassName: string;
  dir?: "ltr" | "rtl";
}) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const selected = useMemo(
    () => options.find((o) => o.value === value) ?? null,
    [options, value],
  );

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node | null;
      if (!target) return;
      if (!rootRef.current?.contains(target)) setOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const displayText =
    mode === "dial"
      ? (selected?.dial ?? placeholder ?? "")
      : (selected?.label ?? placeholder ?? "");

  return (
    <div ref={rootRef} className="relative" dir={dir}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((s) => !s)}
        className={buttonClassName}
        data-invalid={invalid ? "true" : "false"}
      >
        <span className="flex min-w-0 items-center gap-2">
          {selected ? (
            <span
              className={`fi fi-${selected.flag} inline-block size-4 shrink-0 overflow-hidden rounded-sm ring-1 ring-black/10`}
              aria-hidden
            />
          ) : null}
          <span className="truncate">{displayText}</span>
        </span>
        <span className="ml-3 text-gray-400" aria-hidden="true">
          ▾
        </span>
      </button>

      {open ? (
        <div
          id={listboxId}
          role="listbox"
          className="absolute z-50 mt-2 w-full overflow-auto rounded-xl border border-gray-200 bg-background-light shadow-sm dark:border-[#332e25] dark:bg-background-dark max-h-64"
        >
          {mode === "country" && placeholder ? (
            <button
              type="button"
              role="option"
              aria-selected={value === ""}
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className="w-full px-4 py-2 text-right text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-[#221d14]"
            >
              {placeholder}
            </button>
          ) : null}

          {options.map((o) => {
            const isSelected = o.value === value;
            return (
              <button
                key={o.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={joinClassNames(
                  "flex w-full items-center justify-between gap-3 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-[#221d14]",
                  isSelected
                    ? "bg-primary/5 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-200",
                )}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span
                    className={`fi fi-${o.flag} inline-block size-4 shrink-0 overflow-hidden rounded-sm ring-1 ring-black/10`}
                    aria-hidden
                  />
                  <span className="truncate">{o.label}</span>
                </span>
                <span className="shrink-0" dir="ltr">
                  {mode === "dial" ? o.dial : o.value.toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
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

const customerSchema = z.object({
  fullName: z.string().trim().min(1, "الاسم الكامل مطلوب"),
  phoneCountry: z
    .string()
    .trim()
    .min(1, "رمز الدولة مطلوب")
    .refine(
      (v) => COUNTRY_OPTIONS.some((c) => c.value === v),
      "رمز الدولة غير صالح",
    ),
  phone: z
    .string()
    .trim()
    .min(1, "رقم الجوال مطلوب")
    .transform((value) => value.replace(/\s+/g, ""))
    .refine((value) => /^\d{8,12}$/.test(value), "رقم الجوال غير صحيح"),
  country: z
    .string()
    .trim()
    .min(1, "الدولة مطلوبة")
    .refine(
      (v) => COUNTRY_OPTIONS.some((c) => c.value === v),
      "الدولة غير صالحة",
    ),
  email: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine(
      (v) => v == null || v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      "البريد الإلكتروني غير صحيح",
    ),
  birthDate: z
    .string()
    .trim()
    .min(1, "تاريخ الميلاد مطلوب")
    .refine((v) => isValidISODate(v), "تاريخ الميلاد غير صحيح"),
  performedHajjOrUmrahBefore: z
    .string()
    .trim()
    .min(1, "هذا الحقل مطلوب")
    .refine((v) => v === "yes" || v === "no", "هذا الحقل مطلوب"),
});

type CustomerFormValues = z.input<typeof customerSchema>;

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

const bankSchema = z.object({
  method: z.literal("bank"),
  receipt: receiptSchema,
});

const paymentSchema = z.discriminatedUnion("method", [cardSchema, bankSchema]);

type PaymentValues = z.infer<typeof paymentSchema>;

export type BadalRequestPayload = {
  serviceType: BadalServiceType;
  customer: {
    name: string;
    phone: string;
    email?: string;
    country?: string;
    dob?: string;
    performed_hajj_or_umrah_before?: string;
    phone_country?: string;
  };
  payment: PaymentValues;
};

export type BadalRequestModalProps = {
  open: boolean;
  onOpenChange: (open: boolean, reason: ModalCloseReason) => void;
  serviceType: BadalServiceType;

  onComplete?: (payload: BadalRequestPayload) => void | Promise<void>;

  modalProps?: Omit<
    AnimatedModalProps,
    "open" | "onOpenChange" | "children" | "title" | "description"
  >;
};

function getServiceTitle(serviceType: BadalServiceType) {
  return serviceType === "umrah" ? "طلب عمرة بدل" : "طلب حج بدل";
}

function joinClassNames(...values: Array<string | undefined | false | null>) {
  return values.filter(Boolean).join(" ");
}

export default function BadalRequestModal({
  open,
  onOpenChange,
  serviceType,
  onComplete,
  modalProps,
}: BadalRequestModalProps) {
  const formId = useId();
  const [step, setStep] = useState<1 | 2>(1);

  const countryOptions = useMemo(() => COUNTRY_OPTIONS, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      fullName: "",
      phoneCountry: "sa",
      phone: "",
      country: "sa",
      email: "",
      birthDate: "",
      performedHajjOrUmrahBefore: "",
    },
    mode: "onSubmit",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [cardData, setCardData] = useState<CardData>({
    cardholder: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [bankReceipt, setBankReceipt] = useState<File | null>(null);
  const [paymentErrors, setPaymentErrors] = useState<PaymentErrors>({});

  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const phoneCountry = watch("phoneCountry");
  const selectedPhoneDial =
    countryOptions.find((c) => c.value === phoneCountry)?.dial ?? "";

  useEffect(() => {
    if (open) return;
    setStep(1);
    reset();
    setPaymentMethod("card");
    setCardData({ cardholder: "", cardNumber: "", expiry: "", cvc: "" });
    setBankReceipt(null);
    setPaymentErrors({});
    setIsSending(false);
    setSubmitError(null);
  }, [open, reset]);

  const inputBase =
    "w-full rounded-xl border bg-background-light dark:bg-background-dark px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary";

  const inputBorderOk = "border-gray-200 dark:border-[#332e25]";
  const inputBorderErr =
    "border-red-400 dark:border-red-500 focus:ring-red-500/30 focus:border-red-500";

  const stepTitle = step === 1 ? "بيانات المستفيد" : "الدفع";

  const canClose = !(isSubmitting || isSending);

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

  async function saveAndGoToStep2(customerValues: CustomerFormValues) {
    setSubmitError(null);

    const onBehalfType: BadelPayload["on_behalf_type"] =
      serviceType === "hajj" ? "OnBehalfHajj" : "OnBehalfUmrah";

    const dial =
      countryOptions.find((c) => c.value === customerValues.phoneCountry)
        ?.dial ?? "";
    const phone = `${dial}${customerValues.phone.replace(/\s+/g, "")}`;

    const apiPayload: BadelPayload = {
      on_behalf_type: onBehalfType,
      customer: {
        name: customerValues.fullName,
        phone,
        email:
          customerValues.email && customerValues.email !== ""
            ? customerValues.email
            : undefined,
        country: customerValues.country,
        dob: customerValues.birthDate,
        performed_hajj: customerValues.performedHajjOrUmrahBefore === "yes",
      },
    };

    setIsSending(true);
    try {
      const hasToken = hasSavedRequestToken();

      if (hasToken) {
        await editBadelRequest(apiPayload);
      } else {
        const res = (await postBadelRequest(apiPayload)) as unknown as {
          token?: unknown;
        };
        const token = res?.token;
        if (typeof token === "string" && token.length >= 10) {
          persistRequestToken(token);
        }
      }

      setStep(2);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "حدث خطأ غير متوقع");
    } finally {
      setIsSending(false);
    }
  }

  function validatePayment(): PaymentValues | null {
    const values: unknown =
      paymentMethod === "card"
        ? {
            method: paymentMethod,
            ...cardData,
          }
        : {
            method: paymentMethod,
            receipt: bankReceipt,
          };

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

  async function submitRequest(customerValues: CustomerFormValues) {
    setSubmitError(null);

    const paymentValues = validatePayment();
    if (!paymentValues) return;

    const dial =
      countryOptions.find((c) => c.value === customerValues.phoneCountry)
        ?.dial ?? "";
    const phone = `${dial}${customerValues.phone.replace(/\s+/g, "")}`;

    const uiPayload: BadalRequestPayload = {
      serviceType,
      customer: {
        name: customerValues.fullName,
        phone,
        email:
          customerValues.email && customerValues.email !== ""
            ? customerValues.email
            : undefined,
        country: customerValues.country,
        dob: customerValues.birthDate,
        performed_hajj_or_umrah_before:
          customerValues.performedHajjOrUmrahBefore,
        phone_country: customerValues.phoneCountry,
      },
      payment: paymentValues,
    };

    setIsSending(true);
    try {
      await onComplete?.(uiPayload);
      onOpenChange(false, "programmatic");
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "حدث خطأ غير متوقع");
    } finally {
      setIsSending(false);
    }
  }

  const panel = (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="min-w-0">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            الخطوة {step} من 2
          </p>
          <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
            {stepTitle}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={joinClassNames(
              "inline-flex items-center justify-center size-8 rounded-full text-sm font-bold",
              step === 1
                ? "bg-primary text-white"
                : "bg-primary/10 text-primary",
            )}
          >
            1
          </span>
          <span className="text-gray-300 dark:text-gray-700">—</span>
          <span
            className={joinClassNames(
              "inline-flex items-center justify-center size-8 rounded-full text-sm font-bold",
              step === 2
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-500",
            )}
          >
            2
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {step === 1 ? (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <form id={formId} onSubmit={handleSubmit(saveAndGoToStep2)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <label className="md:col-span-2 space-y-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    الاسم الكامل
                  </span>
                  <input
                    {...register("fullName")}
                    className={joinClassNames(
                      inputBase,
                      errors.fullName ? inputBorderErr : inputBorderOk,
                    )}
                    type="text"
                    aria-invalid={Boolean(errors.fullName)}
                  />
                  {errors.fullName?.message ? (
                    <p className="text-sm text-red-500">
                      {errors.fullName.message}
                    </p>
                  ) : null}
                </label>

                <div className="space-y-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    رقم الجوال (مع رمز الدولة)
                  </span>

                  <div className="flex w-full min-w-0" dir="ltr">
                    <CountryDropdown
                      value={watch("phoneCountry") as CountryValue}
                      onChange={(next) =>
                        setValue("phoneCountry", next as CountryValue, {
                          shouldValidate: true,
                        })
                      }
                      options={countryOptions}
                      mode="dial"
                      invalid={Boolean(errors.phoneCountry)}
                      dir="ltr"
                      buttonClassName={joinClassNames(
                        "shrink-0 inline-flex items-center justify-between rounded-l-xl border bg-background-light dark:bg-background-dark px-3 py-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary",
                        errors.phoneCountry ? inputBorderErr : inputBorderOk,
                      )}
                    />

                    <input
                      {...register("phone")}
                      className={joinClassNames(
                        "flex-1 min-w-0 w-0 rounded-r-xl border-t border-r border-b bg-background-light dark:bg-background-dark px-4 py-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary",
                        errors.phone ? inputBorderErr : inputBorderOk,
                      )}
                      inputMode="numeric"
                      placeholder="5xxxxxxxx"
                      aria-invalid={Boolean(errors.phone)}
                    />
                  </div>

                  {(errors.phoneCountry?.message || errors.phone?.message) && (
                    <p className="text-sm text-red-500">
                      {errors.phoneCountry?.message ?? errors.phone?.message}
                    </p>
                  )}

                  {selectedPhoneDial ? (
                    <p
                      className="text-xs text-gray-500 dark:text-gray-400"
                      dir="ltr"
                    >
                      سيتم الحفظ بصيغة: {selectedPhoneDial}
                      {watch("phone").replace(/\s+/g, "")}
                    </p>
                  ) : null}
                </div>

                <label className="space-y-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    الدولة
                  </span>
                  <CountryDropdown
                    value={watch("country") as CountryValue | ""}
                    onChange={(next) =>
                      setValue("country", next as CountryValue, {
                        shouldValidate: true,
                      })
                    }
                    options={countryOptions}
                    mode="country"
                    placeholder="اختر الدولة"
                    invalid={Boolean(errors.country)}
                    buttonClassName={joinClassNames(
                      inputBase,
                      "inline-flex items-center justify-between",
                      errors.country ? inputBorderErr : inputBorderOk,
                    )}
                  />
                  {errors.country?.message ? (
                    <p className="text-sm text-red-500">
                      {errors.country.message}
                    </p>
                  ) : null}
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    البريد الإلكتروني (اختياري)
                  </span>
                  <input
                    {...register("email")}
                    className={joinClassNames(
                      inputBase,
                      errors.email ? inputBorderErr : inputBorderOk,
                    )}
                    type="email"
                    inputMode="email"
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email?.message ? (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  ) : null}
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    العمر - تاريخ الميلاد
                  </span>
                  <input
                    {...register("birthDate")}
                    className={joinClassNames(
                      inputBase,
                      errors.birthDate ? inputBorderErr : inputBorderOk,
                    )}
                    type="date"
                    aria-invalid={Boolean(errors.birthDate)}
                  />
                  {errors.birthDate?.message ? (
                    <p className="text-sm text-red-500">
                      {errors.birthDate.message}
                    </p>
                  ) : null}
                </label>

                <div className="md:col-span-2 space-y-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    هل تم الحج أو اعتمر من قبل؟
                  </span>

                  <div className="flex flex-wrap gap-3">
                    <label className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-[#332e25] bg-background-light dark:bg-background-dark px-4 py-3">
                      <input
                        type="radio"
                        value="yes"
                        {...register("performedHajjOrUmrahBefore")}
                        className="size-4 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-900 dark:text-white">
                        نعم
                      </span>
                    </label>

                    <label className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-[#332e25] bg-background-light dark:bg-background-dark px-4 py-3">
                      <input
                        type="radio"
                        value="no"
                        {...register("performedHajjOrUmrahBefore")}
                        className="size-4 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-900 dark:text-white">
                        لا
                      </span>
                    </label>
                  </div>

                  {errors.performedHajjOrUmrahBefore?.message ? (
                    <p className="text-sm text-red-500">
                      {errors.performedHajjOrUmrahBefore.message}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => onOpenChange(false, "programmatic")}
                  disabled={!canClose}
                  className="px-5 py-3 rounded-xl border border-gray-200 dark:border-[#332e25] text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#221d14] transition-colors"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || isSending}
                  className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors"
                >
                  {isSending ? "جارٍ حفظ الطلب..." : "التالي"}
                </button>
              </div>

              {submitError ? (
                <p className="mt-4 text-sm text-red-600 dark:text-red-400">
                  {submitError}
                </p>
              ) : null}
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="space-y-4">
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
                          inputBase,
                          paymentErrors.cardholder
                            ? inputBorderErr
                            : inputBorderOk,
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
                          inputBase,
                          paymentErrors.cardNumber
                            ? inputBorderErr
                            : inputBorderOk,
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
                          setPaymentErrors((s) => ({
                            ...s,
                            expiry: undefined,
                          }));
                        }}
                        className={joinClassNames(
                          inputBase,
                          paymentErrors.expiry ? inputBorderErr : inputBorderOk,
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
                        رمز الأمان (CVC)
                      </span>
                      <input
                        dir="ltr"
                        value={cardData.cvc}
                        onChange={(e) => {
                          const v = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 4);
                          setCardData((s) => ({ ...s, cvc: v }));
                          setPaymentErrors((s) => ({ ...s, cvc: undefined }));
                        }}
                        className={joinClassNames(
                          inputBase,
                          paymentErrors.cvc ? inputBorderErr : inputBorderOk,
                        )}
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        placeholder="123"
                        aria-invalid={Boolean(paymentErrors.cvc)}
                      />
                      {paymentErrors.cvc ? (
                        <p className="text-sm text-red-500">
                          {paymentErrors.cvc}
                        </p>
                      ) : null}
                    </label>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-gray-100 dark:border-[#332e25] bg-background-light/60 dark:bg-background-dark/40 p-5">
                  <label className="space-y-2 block">
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
                        inputBase,
                        "file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:text-white file:px-4 file:py-2 file:text-sm file:font-bold",
                        paymentErrors.receipt ? inputBorderErr : inputBorderOk,
                      )}
                      aria-invalid={Boolean(paymentErrors.receipt)}
                    />
                    {bankReceipt ? (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {bankReceipt.name}
                        {bankReceipt.size
                          ? ` • ${formatFileSize(bankReceipt.size)}`
                          : ""}
                      </p>
                    ) : null}
                    {paymentErrors.receipt ? (
                      <p className="text-sm text-red-500">
                        {paymentErrors.receipt}
                      </p>
                    ) : null}
                  </label>
                </div>
              )}

              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitError(null);
                    setStep(1);
                  }}
                  disabled={isSending}
                  className="px-5 py-3 rounded-xl border border-gray-200 dark:border-[#332e25] text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#221d14] transition-colors"
                >
                  السابق
                </button>

                <button
                  type="button"
                  disabled={isSubmitting || isSending}
                  onClick={handleSubmit(submitRequest)}
                  className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors"
                >
                  {isSending
                    ? "جارٍ إرسال الطلب..."
                    : serviceType === "umrah"
                      ? "تأكيد طلب عمرة بدل"
                      : "تأكيد طلب حج بدل"}
                </button>
              </div>

              {submitError ? (
                <p className="mt-4 text-sm text-red-600 dark:text-red-400">
                  {submitError}
                </p>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <AnimatedModal
      open={open}
      onOpenChange={(nextOpen, reason) => {
        if (!nextOpen && !canClose) return;
        onOpenChange(nextOpen, reason);
      }}
      title={getServiceTitle(serviceType)}
      description="أكمل بياناتك ثم انتقل للدفع"
      size="lg"
      closeOnBackdropClick={canClose}
      closeOnEscape={canClose}
      showCloseButton={canClose}
      {...modalProps}
    >
      {panel}
    </AnimatedModal>
  );
}
