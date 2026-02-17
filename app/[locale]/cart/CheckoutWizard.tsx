"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import {
  RiArrowLeftLine,
  RiArrowLeftSLine,
  RiCustomerService2Line,
  RiLock2Line,
} from "react-icons/ri";

import Step1CartReview from "./steps/Step1CartReview";
import Step2CustomerInfo from "./steps/Step2CustomerInfo";
import Step3Payment from "./steps/Step3Payment";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/hooks/useCart";
import { addRequest, getRequestCart, type CheckoutPayload } from "@/app/api";
import { isoDateFromDDMMYYYY } from "@/lib/utils";
import type { Step2CustomerInfoValues } from "@/lib/validation";
import type { CartItem as StoredCartItem } from "@/lib/utils/cart";

type Step = 1 | 2 | 3;

function parseStep(value: string | null): Step | null {
  if (!value) return null;
  const num = Number(value);
  if (num === 1 || num === 2 || num === 3) return num;
  return null;
}

function formatNumberWithCurrency({
  locale,
  value,
  currencyLabel,
}: {
  locale: string;
  value: number;
  currencyLabel: string;
}) {
  const formatted = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
  }).format(value);
  return `${formatted} ${currencyLabel}`;
}

function Stepper({ step }: { step: Step }) {
  const t = useTranslations("cart.checkout");
  const steps = useMemo(
    () => [
      { n: 1 as const, label: t("stepper.step1") },
      { n: 2 as const, label: t("stepper.step2") },
      { n: 3 as const, label: t("stepper.step3") },
    ],
    [t],
  );

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm md:text-base font-medium">
      {steps.map((s, index) => {
        const isActive = s.n === step;
        const isDone = s.n < step;

        return (
          <div key={s.n} className="flex items-center gap-2">
            <div
              className={
                isActive
                  ? "flex items-center gap-2 text-primary"
                  : isDone
                    ? "flex items-center gap-2 text-gray-500 dark:text-gray-400"
                    : "flex items-center gap-2 text-gray-400 dark:text-gray-500"
              }
            >
              <span
                className={
                  isActive
                    ? "flex items-center justify-center size-6 rounded-full bg-primary text-white text-xs"
                    : isDone
                      ? "flex items-center justify-center size-6 rounded-full bg-primary/15 text-primary text-xs border border-primary/25"
                      : "flex items-center justify-center size-6 rounded-full border border-gray-300 dark:border-gray-600 text-xs"
                }
              >
                {s.n}
              </span>
              <span>{s.label}</span>
            </div>

            {index < steps.length - 1 ? (
              <RiArrowLeftSLine
                className="text-sm text-gray-300 dark:text-gray-600"
                aria-hidden
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function ProgressBar({ step }: { step: Step }) {
  const t = useTranslations("cart.checkout");
  const progress = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <div className="mb-10">
      <div className="flex justify-between mb-2 text-sm font-medium">
        <span className="text-primary">
          {t("progress.stepOf", { step, total: 3 })}
        </span>
        <span className="text-gray-500 dark:text-gray-400">
          {t("progress.completePercent", { percent: progress })}
        </span>
      </div>
      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default function CheckoutWizard() {
  const t = useTranslations("cart.checkout");
  const tCart = useTranslations("cart");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { total: cartSubtotal, cart, replaceCart } = useCart();

  useEffect(() => {
    let cancelled = false;

    const toNumber = (v: unknown) => {
      const n =
        typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
      return Number.isFinite(n) ? n : null;
    };

    const mapItem = (
      raw: unknown,
      type: "product" | "service",
    ): StoredCartItem | null => {
      if (!raw || typeof raw !== "object") return null;
      const obj = raw as Record<string, unknown>;

      const nested =
        (obj[type] as Record<string, unknown> | undefined) ??
        (type === "product"
          ? (obj.product as Record<string, unknown> | undefined)
          : (obj.service as Record<string, unknown> | undefined)) ??
        obj;

      const id =
        toNumber(obj.id) ?? toNumber(obj[`${type}_id`]) ?? toNumber(nested?.id);

      const quantity =
        toNumber(obj.quantity) ?? toNumber(obj.qty) ?? toNumber(obj.count) ?? 1;

      if (!id || !quantity || quantity <= 0) return null;

      const name = typeof nested?.name === "string" ? nested.name : undefined;
      const description =
        typeof nested?.description === "string"
          ? nested.description
          : undefined;
      const image =
        typeof nested?.image === "string"
          ? nested.image
          : typeof nested?.image_url === "string"
            ? (nested.image_url as string)
            : undefined;
      const price =
        toNumber(nested?.price) ??
        toNumber(nested?.discount_price) ??
        undefined;

      return {
        id,
        quantity,
        type,
        name,
        description,
        image,
        price: price ?? undefined,
      };
    };

    const hydrateFromServerCart = async () => {
      try {
        const res = await getRequestCart();
        if (cancelled) return;

        const products = Array.isArray(res?.cart?.products)
          ? res.cart.products
          : [];
        const services = Array.isArray(res?.cart?.services)
          ? res.cart.services
          : [];

        const mapped: StoredCartItem[] = [];
        for (const p of products) {
          const item = mapItem(p, "product");
          if (item) mapped.push(item);
        }
        for (const s of services) {
          const item = mapItem(s, "service");
          if (item) mapped.push(item);
        }

        // If token exists but cart is empty, we still sync to empty.
        replaceCart(mapped);
      } catch {
        // No valid cookie / backend rejected / network issue → keep local cart.
      }
    };

    void hydrateFromServerCart();
    return () => {
      cancelled = true;
    };
  }, [replaceCart]);

  const customerInfoFormId = "customer-info-form";
  const [customerInfoValues, setCustomerInfoValues] =
    useState<Step2CustomerInfoValues | null>(null);
  // const [requestOrderId, setRequestOrderId] = useState<number | null>(null);

  const addRequestMutation = useMutation({
    mutationFn: (payload: CheckoutPayload) => addRequest(payload),
  });

  const subtotalSar = cartSubtotal;
  const vatSar = useMemo(() => subtotalSar * 0.15, [subtotalSar]);
  const serviceFeeSar = 0;
  const totalSar = subtotalSar + vatSar + serviceFeeSar;

  const currencyLabel = tCart("currency.sar");
  const subtotalLabel = formatNumberWithCurrency({
    locale,
    value: subtotalSar,
    currencyLabel,
  });
  const vatLabel = formatNumberWithCurrency({
    locale,
    value: vatSar,
    currencyLabel,
  });
  const serviceFeeLabel = formatNumberWithCurrency({
    locale,
    value: serviceFeeSar,
    currencyLabel,
  });
  const totalLabel = formatNumberWithCurrency({
    locale,
    value: totalSar,
    currencyLabel,
  });

  const stepFromUrl = parseStep(searchParams.get("step")) ?? 1;
  const [step, setStep] = useState<Step>(stepFromUrl);

  useEffect(() => {
    setStep(stepFromUrl);
  }, [stepFromUrl]);

  const setStepAndSyncUrl = (next: Step) => {
    setStep(next);

    const params = new URLSearchParams(searchParams.toString());
    if (next === 1) params.delete("step");
    else params.set("step", String(next));

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const onPrimaryActionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (step === 1) {
      setStepAndSyncUrl(2);
      return;
    }

    if (step === 2) {
      const form = document.getElementById(
        customerInfoFormId,
      ) as HTMLFormElement | null;
      form?.requestSubmit();
      return;
    }

    // step === 3: payment confirmation is handled inside Step3Payment for now.
  };

  const submitCustomerInfoAndCreateRequest = async (
    values: Step2CustomerInfoValues,
  ) => {
    setCustomerInfoValues(values);

    const dialByCountry: Record<string, string> = {
      sa: "+966",
      id: "+62",
      ms: "+60",
      tr: "+90",
      lk: "+94",
    };

    const dial = dialByCountry[values.phoneCountry] ?? "";
    const phone = `${dial}${values.phone}`;

    const items = cart.map(({ id, quantity }) => ({
      id,
      quantity,
    }));

    const payload: CheckoutPayload = {
      customer: {
        name: values.fullName,
        phone,
        email: values.email,
        country: values.country,
        dob: isoDateFromDDMMYYYY(values.birthDate),
        performed_hajj_or_umrah_before: values.performedHajjOrUmrahBefore,
        phone_country: values.phoneCountry,
      },
      items,
    };

    addRequestMutation.reset();
    try {
      const res = await addRequestMutation.mutateAsync(payload);
      console.log("addRequest response:", res);

      // Persist token securely (HttpOnly cookie) for returning users.
      try {
        await fetch("/api/session/request-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: res.token }),
        });
      } catch (e) {
        console.warn("Failed to persist request token:", e);
      }

      // setRequestOrderId(res.order_id);
      setStepAndSyncUrl(3);
    } catch (error) {
      console.error("addRequest failed:", error);
      // error is surfaced via addRequestMutation.error
    }
  };

  return (
    <div className="bg-surface-light dark:bg-background-dark border-b border-gray-100 dark:border-[#332e25]">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">
            {t("title")}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg">
            {t("subtitle")}
          </p>

          <Stepper step={step} />
        </div>

        <ProgressBar step={step} />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-8">
            {step === 1 ? <Step1CartReview items={cart} /> : null}

            {step === 2 ? (
              <Step2CustomerInfo
                onBack={() => setStepAndSyncUrl(1)}
                onNext={submitCustomerInfoAndCreateRequest}
                formId={customerInfoFormId}
                initialValues={customerInfoValues ?? undefined}
                isSaving={addRequestMutation.isPending}
                submitError={
                  addRequestMutation.isError
                    ? addRequestMutation.error instanceof Error
                      ? addRequestMutation.error.message
                      : "حدث خطأ غير متوقع"
                    : null
                }
              />
            ) : null}

            {step === 3 ? (
              <Step3Payment
                onBack={() => setStepAndSyncUrl(2)}
                onConfirm={() => {
                  // if (!requestOrderId) return;
                  // placeholder for submitting payment
                }}
              />
            ) : null}
          </div>

          <div className="lg:w-96 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft p-6 border border-gray-100 dark:border-[#332e25]">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  {t("summary.title")}
                </h3>

                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>{t("summary.subtotal")}</span>
                    <span>{subtotalLabel}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>{t("summary.vat", { rate: 15 })}</span>
                    <span>{vatLabel}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>{t("summary.serviceFee")}</span>
                    <span>{serviceFeeLabel}</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-[#332e25] pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {t("summary.total")}
                    </span>
                    <span className="text-2xl font-black text-primary">
                      {totalLabel}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mb-6">
                  <input
                    className="flex-1 rounded-lg border border-gray-200 dark:border-[#332e25] bg-background-light dark:bg-background-dark px-4 py-3 text-sm focus:border-primary focus:ring-primary"
                    placeholder={t("discount.placeholder")}
                    type="text"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 dark:bg-[#1a160e] text-gray-700 dark:text-gray-200 rounded-lg text-sm font-bold hover:bg-gray-300 dark:hover:bg-[#221d14] transition-colors"
                  >
                    {t("discount.apply")}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={onPrimaryActionClick}
                  disabled={step === 2 ? addRequestMutation.isPending : false}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>
                    {step === 1
                      ? t("actions.continueToCustomerInfo")
                      : step === 2
                        ? t("actions.continueToPayment")
                        : t("actions.confirmPayment")}
                  </span>
                  <RiArrowLeftLine
                    className="group-hover:-translate-x-1 transition-transform"
                    aria-hidden
                  />
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                  <RiLock2Line className="text-sm" aria-hidden />
                  <span>{t("securityHint")}</span>
                </div>
              </div>

              <div className="bg-[#201b12] rounded-2xl p-6 text-white bg-[url('https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/80" />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="size-10 rounded-full bg-white/20 flex items-center justify-center mb-3 backdrop-blur-sm">
                    <RiCustomerService2Line aria-hidden />
                  </div>
                  <h4 className="font-bold mb-1">{t("help.title")}</h4>
                  <p className="text-sm opacity-90 mb-4">
                    {t("help.description")}
                  </p>
                  <Link
                    href="/contact-us"
                    className="bg-white text-primary text-sm font-bold px-6 py-2 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    {t("help.contact")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
