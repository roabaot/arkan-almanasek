"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import SarAmount from "@/app/components/ui/SarAmount";

import type { Step2CustomerInfoValues } from "@/lib/validation";
import type { PaymentSummary } from "@/app/[locale]/cart/steps/Step3Payment";

type CartLine = {
  key: string;
  sectionLabel: string;
  itemLabel: string;
  qty: number;
  lineTotal: number;
};

export default function CheckoutReview({
  cartLines,
  formatNumber,
  subtotal,
  tax,
  total,
  customerInfo,
  payment,
  onBack,
  onConfirm,
}: {
  cartLines: CartLine[];
  formatNumber: Intl.NumberFormat;
  subtotal: number;
  tax: number;
  total: number;
  customerInfo: Step2CustomerInfoValues;
  payment: PaymentSummary;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const tQurbani = useTranslations("qurbani");
  const tStep2 = useTranslations("cart.step2");
  const tStep3 = useTranslations("cart.step3");

  const phoneDialByCountry = useMemo(
    () =>
      ({
        sa: "+966",
        id: "+62",
        ms: "+60",
        tr: "+90",
        lk: "+94",
      }) as const,
    [],
  );

  const phoneLabel = useMemo(() => {
    const key = customerInfo.phoneCountry as string;
    const dial =
      key in phoneDialByCountry
        ? phoneDialByCountry[key as keyof typeof phoneDialByCountry]
        : "";
    const raw = String(customerInfo.phone ?? "");
    return `${dial}${raw}`;
  }, [customerInfo.phone, customerInfo.phoneCountry, phoneDialByCountry]);

  const paymentLabel =
    payment.method === "card"
      ? tStep3("methods.card.title")
      : tStep3("methods.bank.title");

  return (
    <section className="rounded-3xl bg-white/60 backdrop-blur border border-[var(--color-accent)] p-6">
      <div className="flex justify-between items-center mb-8 border-b border-[var(--color-accent)] pb-4">
        <h2 className="text-xl font-bold">
          {tQurbani("checkout.reviewTitle")}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-[var(--color-accent)] bg-white p-5 shadow-[var(--shadow-soft)]">
          <h3 className="text-sm font-bold mb-4">{tStep2("title")}</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-black/60">
                {tStep2("fields.fullNameLabel")}
              </span>
              <span className="font-semibold">{customerInfo.fullName}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-black/60">
                {tStep2("fields.phoneLabel")}
              </span>
              <span className="font-semibold" dir="ltr">
                {phoneLabel}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-black/60">
                {tStep2("fields.emailLabel")}
              </span>
              <span className="font-semibold" dir="ltr">
                {customerInfo.email}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-black/60">
                {tStep2("fields.countryLabel")}
              </span>
              <span className="font-semibold">{customerInfo.country}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-black/60">
                {tStep2("fields.birthDateLabel")}
              </span>
              <span className="font-semibold" dir="ltr">
                {customerInfo.birthDate}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-black/60">
                {tStep2("fields.performedHajjOrUmrahBeforeLabel")}
              </span>
              <span className="font-semibold">
                {customerInfo.performedHajjOrUmrahBefore === "yes"
                  ? tStep2("options.yesNo.yes")
                  : tStep2("options.yesNo.no")}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-accent)] bg-white p-5 shadow-[var(--shadow-soft)]">
          <h3 className="text-sm font-bold mb-4">{tStep3("title")}</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-black/60">{tStep3("title")}</span>
              <span className="font-semibold">{paymentLabel}</span>
            </div>

            {payment.method === "card" && payment.cardLast4 ? (
              <div className="flex justify-between gap-4">
                <span className="text-black/60">••••</span>
                <span className="font-semibold" dir="ltr">
                  {payment.cardLast4}
                </span>
              </div>
            ) : null}

            {payment.method === "bank" && payment.receiptName ? (
              <div className="flex items-start gap-4">
                <span className="text-black/60 shrink-0">
                  {tStep3("bank.receipt.title")}
                </span>
                <span
                  className="font-semibold min-w-0 flex-1 break-all text-left"
                  dir="ltr"
                  title={payment.receiptName}
                >
                  {payment.receiptName}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-[var(--color-accent)] bg-white p-5 shadow-[var(--shadow-soft)]">
        <h3 className="text-sm font-bold mb-4">{tQurbani("cart.title")}</h3>

        <div className="space-y-4">
          {cartLines.map((line) => (
            <div key={line.key} className="flex justify-between items-start">
              <div>
                <div className="text-sm font-semibold">
                  {line.itemLabel} ({line.sectionLabel})
                </div>
                <div className="text-xs text-black/60 font-light mt-1">
                  {tQurbani("cart.quantityLabel")}{" "}
                  {formatNumber.format(line.qty)}
                </div>
              </div>
              <div className="text-sm font-bold text-[var(--color-primary)]">
                <SarAmount value={line.lineTotal} />
              </div>
            </div>
          ))}

          <div className="pt-6 border-t border-dashed border-[var(--color-accent)] space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-black/60 font-light">
                {tQurbani("summary.subtotal")}
              </span>
              <span className="font-medium">
                <SarAmount value={subtotal} />
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-black/60 font-light">
                {tQurbani("summary.tax", { rate: 15 })}
              </span>
              <span className="font-medium">
                <SarAmount value={tax} />
              </span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="font-bold text-lg">
                {tQurbani("summary.total")}
              </span>
              <span className="text-[var(--color-primary)] text-2xl font-bold">
                <SarAmount
                  value={total}
                  className="text-[var(--color-primary)] text-2xl font-bold"
                  symbolClassName="inline-block h-[0.95em] w-auto"
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-3 rounded-xl border border-[var(--color-accent)] bg-white text-black/60 font-bold hover:bg-white/70 transition-colors"
        >
          {tStep2("actions.back")}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="px-5 py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold hover:bg-[var(--color-primary-dark)] transition-colors"
        >
          {tQurbani("cart.checkout")}
        </button>
      </div>
    </section>
  );
}
