import { Fragment } from "react";
import { GiCamel, GiCow, GiSheep } from "react-icons/gi";

import type { Section, Classification } from "./types";
import type { ReactNode } from "react";

type TranslateFn = (
  key: string,
  values?: Record<string, string | number | Date>,
) => string;

type Props = {
  section: Section;
  selectionTotal: number;
  selection: Record<string | number, Record<string, number>>;
  committedSelection: Record<string | number, Record<string, number>>;
  formatNumber: Intl.NumberFormat;
  t: TranslateFn;
  currencyMark: ReactNode;
  onClearSection: (sectionId: string | number) => void;
  onCommitSection: (section: Section) => void;
  onUpdateQty: (
    sectionId: string | number,
    itemId: string,
    delta: number,
  ) => void;
};

export default function ServiceSelectionSection({
  section,
  selectionTotal,
  selection,
  committedSelection,
  formatNumber,
  t,
  currencyMark,
  onClearSection,
  onCommitSection,
  onUpdateQty,
}: Props) {
  const SectionIcon = section.Icon;
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

  const canCommit = !hasCommitted ? selectionTotal > 0 : isDirty;
  const commitLabel = !hasCommitted
    ? t("section.commit.addToOrder")
    : isDirty
      ? t("section.commit.updateOrder")
      : t("section.commit.added");

  function ItemIcon({ classification }: { classification?: Classification }) {
    const cls = classification ?? "sheep";
    const Icon = (() => {
      switch (cls) {
        case "sheep":
          return GiSheep;
        case "cow":
          return GiCow;
        case "camel":
          return GiCamel;
        default:
          return GiSheep;
      }
    })();

    return <Icon className="w-10 h-10 text-grey" />;
  }

  return (
    <section className="rounded-3xl bg-white/60 backdrop-blur border border-[var(--color-accent)] p-6">
      <div className="flex justify-between items-center mb-8 border-b border-[var(--color-accent)] pb-4">
        <div className="flex items-center gap-3">
          <SectionIcon className="text-3xl text-[var(--color-primary)]" />
          <h2 className="text-xl font-bold">{section.label}</h2>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-5">
        <div className="w-full md:w-1/3 shrink-0">
          <div className="rounded-2xl border border-[var(--color-accent)] bg-white p-6 shadow-[var(--shadow-soft)] flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="text-3xl font-bold text-[#111811]">
                {formatNumber.format(selectionTotal)}
              </span>
              <span className="text-sm text-black/60 font-medium">
                {t("section.costLabel")}
              </span>
            </div>

            <div className="text-3xl font-bold text-[var(--color-primary)] mb-6">
              {currencyMark}
            </div>

            <div className="space-y-3 mt-auto">
              <button
                type="button"
                onClick={() => onClearSection(section.id)}
                className="w-full py-2.5 rounded-xl border border-[var(--color-accent)] text-black/60 text-sm hover:bg-white hover:text-red-500 transition-colors"
              >
                {t("section.clear")}
              </button>
              <button
                type="button"
                onClick={() => onCommitSection(section)}
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
                <Fragment key={item.id}>
                  {index > 0 && (
                    <div className="border-t sm:border-t-0 sm:border-s border-accent dark:border-neutral-700 my-9"></div>
                  )}
                  <div className="flex flex-col items-center text-center">
                    <ItemIcon classification={item.classification} />

                    <span className="text-sm font-bold text-[#111811] mt-3">
                      {item.label}
                    </span>

                    <div className="mt-4 w-full flex items-center justify-center">
                      <div className="w-24 rounded-xl border border-[var(--color-accent)] overflow-hidden grid grid-cols-3">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(section.id, item.id, +1)}
                          className="py-1.5 text-sm font-bold hover:bg-[var(--color-background-light)]"
                          aria-label={t("items.increaseAria", {
                            item: item.label,
                          })}
                        >
                          +
                        </button>
                        <div className="py-1.5 text-sm font-bold bg-white">
                          {formatNumber.format(qty)}
                        </div>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(section.id, item.id, -1)}
                          className="py-1.5 text-sm font-bold hover:bg-[var(--color-background-light)]"
                          aria-label={t("items.decreaseAria", {
                            item: item.label,
                          })}
                        >
                          -
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-lg font-bold">
                        {formatNumber.format(item.price)}
                      </span>
                      <span className="text-sm text-black/60">
                        {currencyMark}
                      </span>
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
