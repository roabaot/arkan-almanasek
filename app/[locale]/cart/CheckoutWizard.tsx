"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import {
  addRequest,
  getCartItemsByIds,
  getRequestCart,
  updateRequest,
  type CheckoutPayload,
} from "@/app/api";
import { ApiError } from "@/app/api/base";
import { ddmmyyyyFromISODate, isoDateFromDDMMYYYY } from "@/lib/utils";
import SarAmount from "@/app/components/ui/SarAmount";
import type { Step2CustomerInfoValues } from "@/lib/validation";
import type { CartItem as StoredCartItem } from "@/lib/utils/cart";

type Step = 1 | 2 | 3;

function toFiniteNumber(v: unknown): number | null {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
  return Number.isFinite(n) ? n : null;
}

function mapRequestCartProduct(raw: unknown): StoredCartItem | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;

  const nested =
    (obj.product as Record<string, unknown> | undefined) ??
    (obj["product"] as Record<string, unknown> | undefined) ??
    obj;

  const id =
    toFiniteNumber(obj.id) ??
    toFiniteNumber(obj["product_id"]) ??
    toFiniteNumber(nested?.id);

  const quantity =
    // Request cart uses requested_quantity (not stock quantity).
    toFiniteNumber(obj.requested_quantity) ??
    toFiniteNumber(obj.requestedQuantity) ??
    toFiniteNumber(obj.quantity) ??
    toFiniteNumber(obj.qty) ??
    toFiniteNumber(obj.count) ??
    1;

  if (!id || !quantity || quantity <= 0) return null;

  const name = typeof nested?.name === "string" ? nested.name : undefined;
  const description =
    typeof nested?.description === "string" ? nested.description : undefined;
  const image =
    typeof nested?.image === "string"
      ? nested.image
      : typeof nested?.image_url === "string"
        ? (nested.image_url as string)
        : undefined;
  const price =
    toFiniteNumber(nested?.discount_price) ??
    toFiniteNumber(nested?.price) ??
    undefined;

  return {
    id,
    quantity,
    type: "product",
    name,
    description,
    image,
    price: price ?? undefined,
  };
}

function coerceBoolean(value: unknown): boolean | null {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;
  }
  if (typeof value === "number") {
    if (value === 1) return true;
    if (value === 0) return false;
  }
  return null;
}

function mapRequestCartCustomerToStep2InitialValues(
  raw: unknown,
): Partial<Step2CustomerInfoValues> | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;

  const name =
    (typeof obj.name === "string" ? obj.name : undefined) ??
    (typeof obj.full_name === "string" ? obj.full_name : undefined) ??
    (typeof obj.fullName === "string" ? obj.fullName : undefined);

  const email = typeof obj.email === "string" ? obj.email : undefined;

  const countryRaw = typeof obj.country === "string" ? obj.country : undefined;
  const normalizedCountry = countryRaw?.trim().toLowerCase() ?? "";
  const normalizedCountryLetters = normalizedCountry.replace(/[^a-z]/g, "");
  const country =
    normalizedCountry === "sa" ||
    normalizedCountryLetters === "ksa" ||
    normalizedCountryLetters === "saudiarabia"
      ? "sa"
      : normalizedCountry === "id" ||
          normalizedCountry === "ms" ||
          normalizedCountry === "tr" ||
          normalizedCountry === "lk"
        ? normalizedCountry
        : "";

  const dobRaw = typeof obj.dob === "string" ? obj.dob : undefined;
  const birthDate = dobRaw ? ddmmyyyyFromISODate(dobRaw) : "";

  const performed = coerceBoolean(obj.performed_hajj);
  const performedHajjOrUmrahBefore =
    performed === null ? "" : performed ? "yes" : "no";

  const phoneRaw = typeof obj.phone === "string" ? obj.phone : "";
  const phoneDigits = phoneRaw.replace(/\D/g, "");
  const dialMap = [
    { value: "sa" as const, dial: "966" },
    { value: "id" as const, dial: "62" },
    { value: "ms" as const, dial: "60" },
    { value: "tr" as const, dial: "90" },
    { value: "lk" as const, dial: "94" },
  ];

  let phoneCountry: Step2CustomerInfoValues["phoneCountry"] = "sa";
  let phone = phoneDigits;
  for (const opt of dialMap) {
    if (phoneDigits.startsWith(opt.dial)) {
      phoneCountry = opt.value;
      phone = phoneDigits.slice(opt.dial.length);
      break;
    }
  }
  phone = phone.replace(/^0+/, "");

  const out: Partial<Step2CustomerInfoValues> = {
    fullName: name ?? "",
    email: email ?? "",
    country,
    birthDate,
    performedHajjOrUmrahBefore,
    phoneCountry,
    phone,
  };

  const hasAny = Object.values(out).some(
    (v) => typeof v === "string" && v.trim().length > 0,
  );

  return hasAny ? out : null;
}

function parseStep(value: string | null): Step | null {
  if (!value) return null;
  const num = Number(value);
  if (num === 1 || num === 2 || num === 3) return num;
  return null;
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { total: cartSubtotal, cart, clearCart } = useCart();

  const requestCartQuery = useQuery({
    queryKey: ["requestCart"],
    queryFn: () => getRequestCart(),
    staleTime: 1000 * 30,
    retry: false,
  });

  const requestProductLines = useMemo(() => {
    const raw = requestCartQuery.data?.cart?.products;
    const products = Array.isArray(raw) ? raw : [];

    const out: { id: number; quantity: number }[] = [];
    for (const p of products) {
      const mapped = mapRequestCartProduct(p);
      if (!mapped) continue;
      out.push({ id: mapped.id, quantity: mapped.quantity });
    }
    return out;
  }, [requestCartQuery.data]);

  const effectiveQtyByProductId = useMemo(() => {
    const out = new Map<number, number>();

    // Start from request cart quantities (returning users).
    for (const line of requestProductLines) {
      out.set(line.id, Math.max(0, Math.floor(line.quantity)));
    }

    // Overlay local cart quantities (current session). Never reduce.
    for (const line of cart) {
      if (line.type !== "product") continue;
      const prev = out.get(line.id) ?? 0;
      out.set(line.id, Math.max(prev, line.quantity));
    }

    return out;
  }, [cart, requestProductLines]);

  const itemsIds = useMemo(() => {
    return Array.from(effectiveQtyByProductId.keys());
  }, [effectiveQtyByProductId]);

  const isCartEmpty = itemsIds.length === 0;

  const { data: cartItemsData } = useQuery({
    queryKey: ["cartItems", itemsIds],
    queryFn: () => getCartItemsByIds(itemsIds),
    staleTime: 1000 * 60,
  });

  const cartItems: StoredCartItem[] = useMemo(() => {
    const products = cartItemsData?.products ?? [];

    const itemsFromApi = products.map((product) => {
      const effectivePrice =
        product.discount_price ?? product.price ?? undefined;
      const quantity = effectiveQtyByProductId.get(product.id) ?? 0;

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: effectivePrice,
        image: product.image ?? undefined,
        maxQuantity: product.quantity ?? undefined,
        quantity,
        type: "product" as const,
      };
    });

    const apiIds = new Set(itemsFromApi.map((p) => p.id));
    const fallback: StoredCartItem[] = [];
    for (const id of itemsIds) {
      if (apiIds.has(id)) continue;
      const local = cart.find((c) => c.type === "product" && c.id === id);
      fallback.push({
        id,
        type: "product",
        quantity: effectiveQtyByProductId.get(id) ?? 0,
        name: local?.name,
        description: local?.description,
        image: local?.image,
        price: local?.price,
        maxQuantity: local?.maxQuantity,
      });
    }

    return [...itemsFromApi, ...fallback];
  }, [cart, cartItemsData, effectiveQtyByProductId, itemsIds]);

  const customerInfoFormId = "customer-info-form";
  const [customerInfoValues, setCustomerInfoValues] =
    useState<Partial<Step2CustomerInfoValues> | null>(null);
  // const [requestOrderId, setRequestOrderId] = useState<number | null>(null);

  const upsertRequestMutation = useMutation({
    mutationFn: async (payload: CheckoutPayload) => {
      try {
        const res = await updateRequest(payload);
        return { mode: "update" as const, res };
      } catch (e) {
        if (
          e instanceof ApiError &&
          (e.status === 401 || e.status === 403 || e.status === 404)
        ) {
          const res = await addRequest(payload);
          return { mode: "create" as const, res };
        }
        throw e;
      }
    },
  });

  const subtotalSar = useMemo(() => {
    // Prefer API-backed prices (from cartItems) when available.
    if (cartItems.length > 0) {
      return cartItems.reduce(
        (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 0),
        0,
      );
    }
    return cartSubtotal;
  }, [cartItems, cartSubtotal]);
  const vatSar = useMemo(() => subtotalSar * 0.15, [subtotalSar]);
  const serviceFeeSar = 0;
  const totalSar = subtotalSar + vatSar + serviceFeeSar;

  // Render amounts with the official Riyal mark (asset-based) instead of
  // string currency symbols.

  const rawStepFromUrl = parseStep(searchParams.get("step")) ?? 1;
  const stepFromUrl: Step = isCartEmpty ? 1 : rawStepFromUrl;
  const [step, setStep] = useState<Step>(stepFromUrl);

  useEffect(() => {
    setStep(stepFromUrl);
  }, [stepFromUrl]);

  useEffect(() => {
    if (step !== 2) return;
    if (customerInfoValues) return;
    if (!requestCartQuery.data) return;

    const rawCustomer =
      (requestCartQuery.data as { customer?: unknown } | undefined)?.customer ??
      (requestCartQuery.data as { cart?: { customer?: unknown } } | undefined)
        ?.cart?.customer;

    const mapped = mapRequestCartCustomerToStep2InitialValues(rawCustomer);
    if (!mapped) return;
    setCustomerInfoValues(mapped);
  }, [customerInfoValues, requestCartQuery.data, step]);

  useEffect(() => {
    if (!isCartEmpty) return;
    if (!searchParams.get("step")) return;

    const params = new URLSearchParams(searchParams.toString());
    params.delete("step");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }, [isCartEmpty, pathname, router, searchParams]);

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
      if (isCartEmpty) return;
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

    const items = itemsIds
      .map((id) => ({ id, quantity: effectiveQtyByProductId.get(id) ?? 0 }))
      .filter((it) => it.quantity > 0);

    const payload: CheckoutPayload = {
      customer: {
        name: values.fullName,
        phone,
        email: values.email,
        country: values.country,
        dob: isoDateFromDDMMYYYY(values.birthDate),
        performed_hajj: values.performedHajjOrUmrahBefore === "yes",
      },
      cart: items,
    };

    upsertRequestMutation.reset();
    try {
      const out = await upsertRequestMutation.mutateAsync(payload);
      console.log("request upsert response:", out);

      // Ensure request cart is available for the next step.
      try {
        await requestCartQuery.refetch();
      } catch {
        // ignore
      }

      // Step 2 completed successfully -> cart is now captured server-side.
      // Clear localStorage cart.
      clearCart();

      // setRequestOrderId(res.order_id);
      setStepAndSyncUrl(3);
    } catch (error) {
      console.error("request upsert failed:", error);
      // error is surfaced via upsertRequestMutation.error
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
            {step === 1 ? (
              <Step1CartReview items={cartItems} isEmpty={isCartEmpty} />
            ) : null}

            {step === 2 ? (
              <Step2CustomerInfo
                onBack={() => setStepAndSyncUrl(1)}
                onNext={submitCustomerInfoAndCreateRequest}
                formId={customerInfoFormId}
                initialValues={customerInfoValues ?? undefined}
                isSaving={upsertRequestMutation.isPending}
                submitError={
                  upsertRequestMutation.isError
                    ? upsertRequestMutation.error instanceof Error
                      ? upsertRequestMutation.error.message
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
                    <SarAmount value={subtotalSar} />
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>{t("summary.vat", { rate: 15 })}</span>
                    <SarAmount value={vatSar} />
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>{t("summary.serviceFee")}</span>
                    <SarAmount value={serviceFeeSar} />
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-[#332e25] pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {t("summary.total")}
                    </span>
                    <span className="text-2xl font-black text-primary">
                      <SarAmount
                        value={totalSar}
                        className="text-2xl font-black text-primary"
                        symbolClassName="inline-block h-[0.95em] w-auto"
                      />
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mb-6">
                  <input
                    className="md:w-auto w-full flex-1 rounded-lg border border-gray-200 dark:border-[#332e25] bg-background-light dark:bg-background-dark px-4 py-3 text-sm focus:border-primary focus:ring-primary"
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
                  disabled={
                    step === 1
                      ? isCartEmpty
                      : step === 2
                        ? upsertRequestMutation.isPending
                        : false
                  }
                  className="w-full bg-primary hover:bg-primary-dark disabled:hover:bg-primary disabled:opacity-60 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2 group disabled:cursor-not-allowed"
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
