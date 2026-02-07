"use client";

import Breadcrumbs, { BreadcrumbItem } from "@/app/components/ui/Breadcrumbs";
import { useMemo, useState } from "react";
import { GiSheep } from "react-icons/gi";

type SectionId = "udhiyah" | "fidya" | "aqiqah";

type Item = {
  id: string;
  label: string;
  price: number;
};

type Section = {
  id: SectionId;
  label: string;
  icon: string;
  items: Item[];
};

const SECTIONS: Section[] = [
  {
    id: "udhiyah",
    label: "الأضحية",
    icon: "pets",
    items: [
      { id: "european", label: "أوروبي", price: 1050 },
      { id: "sawakni-1", label: "سواكني", price: 850 },
      { id: "african", label: "إفريقي", price: 450 },
      { id: "hari", label: "حري", price: 1200 },
      { id: "naimi", label: "نعيمي", price: 1300 },
    ],
  },
  {
    id: "fidya",
    label: "الفدية",
    icon: "volunteer_activism",
    items: [
      { id: "barbary", label: "بربري", price: 750 },
      { id: "sawakni-2", label: "سواكني", price: 850 },
    ],
  },
  {
    id: "aqiqah",
    label: "العقيقة",
    icon: "child_care",
    items: [
      { id: "naimi-2", label: "نعيمي", price: 1500 },
      { id: "sawakni-3", label: "سواكني", price: 1100 },
    ],
  },
];

const BreadcrumbItems: BreadcrumbItem[] = [
  { label: "الرئيسية", href: "/" },
  { label: "الهدي والأضاحي", current: true },
];

function formatSAR(value: number) {
  const formatted = new Intl.NumberFormat("ar-SA", {
    maximumFractionDigits: 2,
  }).format(value);
  return `${formatted} ر.س`;
}

function clampQty(next: number) {
  return Math.max(0, Math.min(99, next));
}

export default function QurbaniPage() {
  const [selection, setSelection] = useState<
    Record<SectionId, Record<string, number>>
  >(() => ({ udhiyah: {}, fidya: {}, aqiqah: {} }));
  const [cart, setCart] = useState<Record<string, number>>({});
  const [committedSelection, setCommittedSelection] = useState<
    Record<SectionId, Record<string, number>>
  >(() => ({ udhiyah: {}, fidya: {}, aqiqah: {} }));
  const [checkoutAttempted, setCheckoutAttempted] = useState(false);

  const itemIndex = useMemo(() => {
    const index = new Map<string, { section: Section; item: Item }>();
    for (const section of SECTIONS) {
      for (const item of section.items) {
        index.set(`${section.id}:${item.id}`, { section, item });
      }
    }
    return index;
  }, []);

  const selectionTotals = useMemo(() => {
    const totals: Record<SectionId, number> = {
      udhiyah: 0,
      fidya: 0,
      aqiqah: 0,
    };
    for (const section of SECTIONS) {
      const perItem = selection[section.id] ?? {};
      let sum = 0;
      for (const item of section.items) {
        sum += (perItem[item.id] ?? 0) * item.price;
      }
      totals[section.id] = sum;
    }
    return totals;
  }, [selection]);

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

    lines.sort((a, b) => a.sectionLabel.localeCompare(b.sectionLabel, "ar"));
    return lines;
  }, [cart, itemIndex]);

  const subtotal = useMemo(
    () => cartLines.reduce((acc, line) => acc + line.lineTotal, 0),
    [cartLines],
  );
  const tax = useMemo(() => subtotal * 0.15, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  const outOfSyncSectionLabels = useMemo(() => {
    const labels: string[] = [];
    for (const section of SECTIONS) {
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
  }, [selection, committedSelection]);

  const hasOutOfSyncSections = outOfSyncSectionLabels.length > 0;

  function updateSelectionQty(
    sectionId: SectionId,
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

  function clearSection(sectionId: SectionId) {
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
    setCommittedSelection({ udhiyah: {}, fidya: {}, aqiqah: {} });
    setCheckoutAttempted(false);
  }

  function handleCheckout() {
    setCheckoutAttempted(true);
    if (hasOutOfSyncSections) return;

    // TODO: proceed to payment flow / API call.
  }

  return (
    <main className="text-[#111811] antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <Breadcrumbs items={BreadcrumbItems} />
      </div>
      <header className="py-12 px-4 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extralight mb-4 tracking-tight">
          شراء{" "}
          <span className="font-bold text-[var(--color-primary)]">النسك</span>
        </h1>
        <p className="text-black/60 font-light max-w-2xl mx-auto leading-relaxed">
          خدمات ذبح وتوزيع الأضاحي والهدي والفدية وفق الشريعة الإسلامية، بكل
          سهولة ويسر.
        </p>
      </header>

      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              icon: "search_check",
              title: "حدد نوع النسك",
              desc: "اختر النوع المناسب لك",
            },
            {
              icon: "account_balance_wallet",
              title: "دفع آمن",
              desc: "بوابات دفع موثوقة",
            },
            {
              icon: "verified",
              title: "تنفيذ شرعي",
              desc: "ذبح بإشراف مختصين",
            },
            {
              icon: "description",
              title: "تأكيد الإنجاز",
              desc: "تقرير عبر رسالة نصية",
            },
          ].map((step) => (
            <div
              key={step.icon}
              className="group text-center flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-2xl border border-[var(--color-accent)] flex items-center justify-center transition-colors group-hover:bg-gray-50 duration-300 ease-in-out">
                <span className="material-symbols-outlined text-2xl text-[var(--color-primary)]">
                  {step.icon}
                </span>
              </div>
              <h4 className="text-sm font-bold mt-3 mb-1">{step.title}</h4>
              <p className="text-xs text-black/60 font-light">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            <div className="border border-[var(--color-accent)] rounded-2xl p-6 flex items-start gap-5">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[var(--color-accent)] shrink-0">
                <span className="material-symbols-outlined text-[var(--color-primary)]">
                  info
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm mb-1 uppercase tracking-wider">
                  تنبيه شرعي
                </h3>
                <p className="text-sm text-black/60 font-light leading-relaxed">
                  جميع الذبائح تخضع للفحص البيطري والشرعي الدقيق، وتوزع على
                  فقراء الحرم في أوقاتها المحددة شرعاً.
                </p>
              </div>
            </div>

            {SECTIONS.map((section) => {
              const sectionTotal = selectionTotals[section.id];
              const current = selection[section.id] ?? {};
              const committed = committedSelection[section.id] ?? {};

              let isDirty = false;
              for (const item of section.items) {
                const currentQty = current[item.id] ?? 0;
                const committedQty = committed[item.id] ?? 0;
                if (currentQty !== committedQty) {
                  isDirty = true;
                  break;
                }
              }

              let hasCommitted = false;
              for (const item of section.items) {
                if ((committed[item.id] ?? 0) > 0) {
                  hasCommitted = true;
                  break;
                }
              }

              const canCommit = !hasCommitted ? sectionTotal > 0 : isDirty;
              const commitLabel = !hasCommitted
                ? "إضافة إلى الطلب"
                : isDirty
                  ? "تحديث الطلب"
                  : "تمت الإضافة";

              return (
                <section
                  key={section.id}
                  className="rounded-3xl bg-white/60 backdrop-blur border border-[var(--color-accent)] p-6"
                >
                  <div className="flex justify-between items-center mb-8 border-b border-[var(--color-accent)] pb-4">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-3xl text-[var(--color-primary)]">
                        {section.icon}
                      </span>
                      <h2 className="text-xl font-bold">{section.label}</h2>
                    </div>
                  </div>

                  <div className="flex flex-col-reverse md:flex-row gap-5">
                    <div className="w-full md:w-1/3 shrink-0">
                      <div className="rounded-2xl border border-[var(--color-accent)] bg-white p-6 shadow-[var(--shadow-soft)] flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-3xl font-bold text-[#111811]">
                            {new Intl.NumberFormat("ar-SA").format(
                              sectionTotal,
                            )}
                          </span>
                          <span className="text-sm text-black/60 font-medium">
                            التكلفة
                          </span>
                        </div>

                        <div className="text-3xl font-bold text-[var(--color-primary)] mb-6">
                          ر.س
                        </div>

                        <div className="space-y-3 mt-auto">
                          <button
                            type="button"
                            onClick={() => clearSection(section.id)}
                            className="w-full py-2.5 rounded-xl border border-[var(--color-accent)] text-black/60 text-sm hover:bg-white hover:text-red-500 transition-colors"
                          >
                            مسح
                          </button>
                          <button
                            type="button"
                            onClick={() => commitSectionToCart(section)}
                            disabled={!canCommit}
                            className="w-full py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold shadow-sm hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-50 disabled:hover:bg-[var(--color-primary)]"
                          >
                            {commitLabel}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-2/3 overflow-x-auto pb-4">
                      <div className="flex flex-wrap gap-6 rounded-2xl border border-[var(--color-accent)] bg-white p-5 shadow-[var(--shadow-soft)]">
                        {section.items.map((item, index) => {
                          const qty = selection[section.id]?.[item.id] ?? 0;
                          return (
                            <>
                              {index > 0 && (
                                <div className="border-t sm:border-t-0 sm:border-s border-accent dark:border-neutral-700 my-9"></div>
                              )}
                              <div
                                key={item.id}
                                className="flex flex-col items-center text-center"
                              >
                                <GiSheep className="w-10 h-10 text-grey" />

                                <span className="text-sm font-bold text-[#111811] mt-3">
                                  {item.label}
                                </span>

                                <div className="mt-4 w-full flex items-center justify-center">
                                  <div className="w-24 rounded-xl border border-[var(--color-accent)] overflow-hidden grid grid-cols-3">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        updateSelectionQty(
                                          section.id,
                                          item.id,
                                          +1,
                                        )
                                      }
                                      className="py-1.5 text-sm font-bold hover:bg-[var(--color-background-light)]"
                                      aria-label={`زيادة كمية ${item.label}`}
                                    >
                                      +
                                    </button>
                                    <div className="py-1.5 text-sm font-bold bg-white">
                                      {new Intl.NumberFormat("ar-SA").format(
                                        qty,
                                      )}
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        updateSelectionQty(
                                          section.id,
                                          item.id,
                                          -1,
                                        )
                                      }
                                      className="py-1.5 text-sm font-bold hover:bg-[var(--color-background-light)]"
                                      aria-label={`إنقاص كمية ${item.label}`}
                                    >
                                      -
                                    </button>
                                  </div>
                                </div>

                                <div className="mt-4 flex items-baseline gap-2">
                                  <span className="text-lg font-bold">
                                    {new Intl.NumberFormat("ar-SA").format(
                                      item.price,
                                    )}
                                  </span>
                                  <span className="text-sm text-black/60">
                                    ر.س
                                  </span>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-2xl border border-[var(--color-accent)] bg-white/80 backdrop-blur shadow-[var(--shadow-soft)] p-8">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--color-accent)]">
                  <h3 className="font-bold text-lg">تفاصيل الطلب</h3>
                  <span className="material-symbols-outlined text-[var(--color-primary)]">
                    shopping_basket
                  </span>
                </div>

                {cartLines.length === 0 ? (
                  <div className="text-sm text-black/60 font-light">
                    لم تقم بإضافة أي عناصر بعد.
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cartLines.map((line) => (
                      <div
                        key={line.key}
                        className="flex justify-between items-start"
                      >
                        <div>
                          <h5 className="text-sm font-semibold">
                            {line.itemLabel} ({line.sectionLabel})
                          </h5>
                          <p className="text-xs text-black/60 font-light mt-1">
                            الكمية:{" "}
                            {new Intl.NumberFormat("ar-SA").format(line.qty)}
                          </p>
                        </div>
                        <span className="text-sm font-bold text-[var(--color-primary)]">
                          {formatSAR(line.lineTotal)}
                        </span>
                      </div>
                    ))}

                    <div className="pt-6 border-t border-dashed border-[var(--color-accent)] space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-black/60 font-light">
                          المجموع الفرعي
                        </span>
                        <span className="font-medium">
                          {formatSAR(subtotal)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-black/60 font-light">
                          الضريبة (15%)
                        </span>
                        <span className="font-medium">{formatSAR(tax)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="font-bold text-lg">الإجمالي</span>
                        <span className="text-[var(--color-primary)] text-2xl font-bold">
                          {formatSAR(total)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={clearCart}
                        className="py-2.5 rounded-xl border border-[var(--color-accent)] text-sm text-black/60 hover:text-red-500 hover:bg-white transition-colors"
                      >
                        مسح الطلب
                      </button>
                      <button
                        type="button"
                        onClick={handleCheckout}
                        className="py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold hover:bg-[var(--color-primary-dark)] transition-colors"
                      >
                        إتمام الدفع
                      </button>

                      {checkoutAttempted && hasOutOfSyncSections && (
                        <div className="col-span-2 text-xs text-red-600 font-medium">
                          القيمة غير متوافقة. يرجى تحديث الطلب في:{" "}
                          {outOfSyncSectionLabels.join("، ")}.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--color-accent)] bg-white/80 backdrop-blur shadow-[var(--shadow-soft)]">
                  <span className="material-symbols-outlined text-lg text-green-600">
                    shield
                  </span>
                  <span className="text-[10px] font-bold text-black/50 uppercase tracking-tighter">
                    دفع آمن
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--color-accent)] bg-white/80 backdrop-blur shadow-[var(--shadow-soft)]">
                  <span className="material-symbols-outlined text-lg text-blue-600">
                    support_agent
                  </span>
                  <span className="text-[10px] font-bold text-black/50 uppercase tracking-tighter">
                    دعم 24/7
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
