"use client";

import Breadcrumbs, { BreadcrumbItem } from "@/app/components/ui/Breadcrumbs";
import Step2CustomerInfo from "./Step2CustomerInfo";
import {
  editHadiRequest,
  getHadi,
  postHadiRequest,
  type GetHadiResT,
  type QurbaniPayload,
} from "@/app/api";
import type { Step2CustomerInfoValues } from "@/lib/validation";
import { isoDateFromDDMMYYYY } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import {
  MdAccountBalanceWallet,
  MdDescription,
  MdPets,
  MdSearch,
  MdVerified,
} from "react-icons/md";
import CartSummary from "./CartSummary";
import CheckoutReview from "./CheckoutReview";
import HeroHeader from "./HeroHeader";
import NoticeCard from "./NoticeCard";
import ServiceSelectionSection from "./ServiceSelectionSection";
import StepsStrip from "./StepsStrip";
import type { Item, Section } from "./types";
import { clampQty } from "./utils";
import Step3Payment, { PaymentSummary } from "./Step3Payment";
import SaudiRiyalSymbol from "@/app/components/ui/SaudiRiyalSymbol";

type Props = {
  initialHadi: GetHadiResT;
};

export default function HadiAndUdhiyahClient({ initialHadi }: Props) {
  const t = useTranslations("qurbani");
  const locale = useLocale();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [customerInfo, setCustomerInfo] =
    useState<Step2CustomerInfoValues | null>(null);
  const [paymentSummary, setPaymentSummary] = useState<PaymentSummary | null>(
    null,
  );

  const { data: hadiRes } = useQuery({
    queryKey: ["hadi"],
    queryFn: getHadi,
    initialData: initialHadi,
    staleTime: 1000 * 60,
  });

  const sections: Section[] = useMemo(() => {
    const hadi = hadiRes?.hadi ?? [];
    return hadi.map((h): Section => {
      const items: Item[] = (h.types ?? []).map((type) => ({
        id: String(type.id),
        label: type.name,
        classification: type.classefication ?? undefined,
        price: Number(type.price ?? 0),
      }));

      return {
        id: String(h.id),
        label: h.name,
        Icon: MdPets,
        items,
      };
    });
  }, [hadiRes]);

  const breadcrumbItems: BreadcrumbItem[] = useMemo(
    () => [
      { label: t("breadcrumbs.home"), href: "/" },
      { label: t("breadcrumbs.current"), current: true },
    ],
    [t],
  );

  const steps = useMemo(
    () => [
      {
        Icon: MdSearch,
        title: t("steps.selectType.title"),
        desc: t("steps.selectType.desc"),
      },
      {
        Icon: MdAccountBalanceWallet,
        title: t("steps.securePayment.title"),
        desc: t("steps.securePayment.desc"),
      },
      {
        Icon: MdVerified,
        title: t("steps.sharia.title"),
        desc: t("steps.sharia.desc"),
      },
      {
        Icon: MdDescription,
        title: t("steps.confirmation.title"),
        desc: t("steps.confirmation.desc"),
      },
    ],
    [t],
  );

  const formatNumber = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        maximumFractionDigits: 2,
      }),
    [locale],
  );

  const currencyMark = useMemo(
    () => (
      <SaudiRiyalSymbol className="inline-block h-[0.9em] w-auto" title="SAR" />
    ),
    [],
  );

  const [selection, setSelection] = useState<
    Record<string, Record<string, number>>
  >(() => ({}));
  const [cart, setCart] = useState<Record<string, number>>({});
  const [committedSelection, setCommittedSelection] = useState<
    Record<string, Record<string, number>>
  >(() => ({}));
  const [checkoutAttempted, setCheckoutAttempted] = useState(false);
  const [customerInfoSubmitError, setCustomerInfoSubmitError] = useState<
    string | null
  >(null);
  const [isSavingCustomerInfo, setIsSavingCustomerInfo] = useState(false);

  const itemIndex = useMemo(() => {
    const index = new Map<string, { section: Section; item: Item }>();
    for (const section of sections) {
      for (const item of section.items) {
        index.set(`${section.id}:${item.id}`, { section, item });
      }
    }
    return index;
  }, [sections]);

  const selectionTotals = useMemo(() => {
    const totals: Record<string, number> = {};

    for (const section of sections) {
      const perItem = selection[section.id] ?? {};
      let sum = 0;
      for (const item of section.items) {
        sum += (perItem[item.id] ?? 0) * item.price;
      }
      totals[section.id] = sum;
    }

    return totals;
  }, [selection, sections]);

  const cartLines = useMemo(() => {
    const lines: Array<{
      key: string;
      sectionLabel: string;
      itemLabel: string;
      qty: number;
      unitPrice: number;
      lineTotal: number;
    }> = [];

    for (const [key, qty] of Object.entries(cart)) {
      if (qty <= 0) continue;
      const entry = itemIndex.get(key);
      if (!entry) continue;
      const lineTotal = qty * entry.item.price;
      lines.push({
        key,
        sectionLabel: entry.section.label,
        itemLabel: entry.item.label,
        qty,
        unitPrice: entry.item.price,
        lineTotal,
      });
    }

    lines.sort((a, b) => a.sectionLabel.localeCompare(b.sectionLabel, locale));
    return lines;
  }, [cart, itemIndex, locale]);

  const subtotal = useMemo(
    () => cartLines.reduce((acc, line) => acc + line.lineTotal, 0),
    [cartLines],
  );
  const tax = useMemo(() => subtotal * 0.15, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  const outOfSyncSectionLabels = useMemo(() => {
    const labels: string[] = [];
    for (const section of sections) {
      const current = selection[section.id] ?? {};
      const committed = committedSelection[section.id] ?? {};

      let dirty = false;
      for (const item of section.items) {
        const currentQty = current[item.id] ?? 0;
        const committedQty = committed[item.id] ?? 0;
        if (currentQty !== committedQty) {
          dirty = true;
          break;
        }
      }

      if (dirty) labels.push(section.label);
    }
    return labels;
  }, [selection, committedSelection, sections]);

  const hasOutOfSyncSections = outOfSyncSectionLabels.length > 0;

  function updateSelectionQty(
    sectionId: string | number,
    itemId: string,
    delta: number,
  ) {
    setSelection((prev) => {
      const prevSection = prev[sectionId] ?? {};
      const prevQty = prevSection[itemId] ?? 0;
      const nextQty = clampQty(prevQty + delta);
      return {
        ...prev,
        [sectionId]: {
          ...prevSection,
          [itemId]: nextQty,
        },
      };
    });
  }

  function clearSection(sectionId: string | number) {
    setSelection((prev) => ({ ...prev, [sectionId]: {} }));
  }

  function commitSectionToCart(section: Section) {
    const current = selection[section.id] ?? {};

    setCart((prevCart) => {
      const next = { ...prevCart };

      for (const item of section.items) {
        const qty = clampQty(current[item.id] ?? 0);
        const key = `${section.id}:${item.id}`;
        if (qty <= 0) {
          delete next[key];
        } else {
          next[key] = qty;
        }
      }

      return next;
    });

    setCommittedSelection((prev) => {
      const nextSection: Record<string, number> = {};
      for (const item of section.items) {
        const qty = clampQty(current[item.id] ?? 0);
        if (qty > 0) nextSection[item.id] = qty;
      }
      return { ...prev, [section.id]: nextSection };
    });

    setCheckoutAttempted(false);
  }

  function clearCart() {
    setCart({});
    setCommittedSelection({});
    setCheckoutAttempted(false);
    setStep(1);
    setCustomerInfo(null);
    setPaymentSummary(null);
  }

  function proceedToCustomerInfo() {
    setCheckoutAttempted(true);
    if (hasOutOfSyncSections) return;
    if (cartLines.length === 0) return;
    setStep(2);
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

  async function submitCustomerInfo(values: Step2CustomerInfoValues) {
    setCustomerInfo(values);
    setCustomerInfoSubmitError(null);
    setIsSavingCustomerInfo(true);

    const dialByCountry: Record<string, string> = {
      sa: "+966",
      id: "+62",
      ms: "+60",
      tr: "+90",
      lk: "+94",
    };

    const dial = dialByCountry[values.phoneCountry] ?? "";
    const phone = `${dial}${values.phone}`;

    const items: QurbaniPayload["items"] = Object.entries(cart)
      .filter(([, qty]) => qty > 0)
      .map(([key, qty]) => {
        const parts = key.split(":");
        const typeIdStr = parts[1] ?? "";
        const type_id = Number(typeIdStr);
        return {
          type_id,
          quantity: qty,
        };
      })
      .filter((it) => Number.isFinite(it.type_id) && it.type_id > 0);

    const payload: QurbaniPayload = {
      customer: {
        name: values.fullName,
        phone,
        email: values.email,
        country: values.country,
        dob: isoDateFromDDMMYYYY(values.birthDate),
        performed_hajj: values.performedHajjOrUmrahBefore === "yes",
      },
      items,
    };

    try {
      const hasToken = hasSavedRequestToken();

      if (hasToken) {
        await editHadiRequest(payload);
      } else {
        const res = (await postHadiRequest(payload)) as unknown as {
          token?: string;
        };
        if (typeof res?.token === "string" && res.token.length >= 10) {
          persistRequestToken(res.token);
        }
      }

      setStep(3);
    } catch (e) {
      setCustomerInfoSubmitError(
        e instanceof Error ? e.message : "حدث خطأ غير متوقع",
      );
    } finally {
      setIsSavingCustomerInfo(false);
    }
  }

  function handleFinalCheckout() {
    // TODO: proceed to payment flow / API call.
  }

  return (
    <main className="text-[#111811] antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <Breadcrumbs
          items={breadcrumbItems}
          ariaLabel={t("breadcrumbs.ariaLabel")}
        />
      </div>

      <HeroHeader
        titlePrefix={t("hero.titlePrefix")}
        titleHighlight={t("hero.titleHighlight")}
        description={t("hero.description")}
      />

      <StepsStrip steps={steps} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            {step === 1 ? (
              <>
                <NoticeCard title={t("notice.title")} body={t("notice.body")} />

                {sections.map((section) => (
                  <ServiceSelectionSection
                    key={section.id}
                    section={section}
                    selectionTotal={selectionTotals[section.id] ?? 0}
                    selection={selection}
                    committedSelection={committedSelection}
                    formatNumber={formatNumber}
                    t={t}
                    currencyMark={currencyMark}
                    onClearSection={clearSection}
                    onCommitSection={commitSectionToCart}
                    onUpdateQty={updateSelectionQty}
                  />
                ))}
              </>
            ) : null}

            {step === 2 ? (
              <Step2CustomerInfo
                onBack={() => setStep(1)}
                onNext={submitCustomerInfo}
                initialValues={customerInfo ?? undefined}
                isSaving={isSavingCustomerInfo}
                submitError={customerInfoSubmitError}
              />
            ) : null}

            {step === 3 ? (
              <Step3Payment
                onBack={() => setStep(2)}
                onConfirm={(summary) => {
                  setPaymentSummary(summary);
                  setStep(4);
                }}
              />
            ) : null}

            {step === 4 && customerInfo && paymentSummary ? (
              <CheckoutReview
                cartLines={cartLines}
                formatNumber={formatNumber}
                subtotal={subtotal}
                tax={tax}
                total={total}
                customerInfo={customerInfo}
                payment={paymentSummary}
                onBack={() => setStep(3)}
                onConfirm={handleFinalCheckout}
              />
            ) : null}
          </div>

          <CartSummary
            cartLines={cartLines}
            formatNumber={formatNumber}
            subtotal={subtotal}
            tax={tax}
            total={total}
            checkoutAttempted={checkoutAttempted}
            hasOutOfSyncSections={hasOutOfSyncSections}
            outOfSyncSectionLabels={outOfSyncSectionLabels}
            checkoutLabel={t("cart.continue")}
            checkoutDisabled={cartLines.length === 0 || hasOutOfSyncSections}
            t={t}
            onClearCart={clearCart}
            onCheckout={proceedToCustomerInfo}
            showCheckoutButton={step === 1}
          />
        </div>
      </div>
    </main>
  );
}
