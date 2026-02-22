import { MdShield, MdShoppingBasket, MdSupportAgent } from "react-icons/md";
import SarAmount from "@/app/components/ui/SarAmount";

type TranslateFn = (
  key: string,
  values?: Record<string, string | number | Date>,
) => string;

type CartLine = {
  key: string;
  sectionLabel: string;
  itemLabel: string;
  qty: number;
  lineTotal: number;
};

type Props = {
  cartLines: CartLine[];
  formatNumber: Intl.NumberFormat;
  subtotal: number;
  tax: number;
  total: number;
  checkoutAttempted: boolean;
  hasOutOfSyncSections: boolean;
  outOfSyncSectionLabels: string[];
  checkoutLabel?: string;
  checkoutDisabled?: boolean;
  showCheckoutButton?: boolean;
  t: TranslateFn;
  onClearCart: () => void;
  onCheckout: () => void;
};

export default function CartSummary({
  cartLines,
  formatNumber,
  subtotal,
  tax,
  total,
  checkoutAttempted,
  hasOutOfSyncSections,
  outOfSyncSectionLabels,
  checkoutLabel,
  checkoutDisabled,
  showCheckoutButton = true,
  t,
  onClearCart,
  onCheckout,
}: Props) {
  return (
    <aside className="lg:col-span-4">
      <div className="sticky top-28 space-y-6">
        <div className="rounded-2xl border border-[var(--color-accent)] bg-white/80 backdrop-blur shadow-[var(--shadow-soft)] p-8">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--color-accent)]">
            <h3 className="font-bold text-lg">{t("cart.title")}</h3>
            <MdShoppingBasket className="text-[var(--color-primary)] text-xl" />
          </div>

          {cartLines.length === 0 ? (
            <div className="text-sm text-black/60 font-light">
              {t("cart.empty")}
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
                      {t("cart.quantityLabel")} {formatNumber.format(line.qty)}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-[var(--color-primary)]">
                    <SarAmount value={line.lineTotal} />
                  </span>
                </div>
              ))}

              <div className="pt-6 border-t border-dashed border-[var(--color-accent)] space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-black/60 font-light">
                    {t("summary.subtotal")}
                  </span>
                  <span className="font-medium">
                    <SarAmount value={subtotal} />
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black/60 font-light">
                    {t("summary.tax", { rate: 15 })}
                  </span>
                  <span className="font-medium">
                    <SarAmount value={tax} />
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold text-lg">
                    {t("summary.total")}
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

              <div
                className={
                  showCheckoutButton
                    ? "grid grid-cols-2 gap-3"
                    : "grid grid-cols-1 gap-3"
                }
              >
                <button
                  type="button"
                  onClick={onClearCart}
                  className="py-2.5 rounded-xl border border-[var(--color-accent)] text-sm text-black/60 hover:text-red-500 hover:bg-white transition-colors"
                >
                  {t("cart.clear")}
                </button>

                {showCheckoutButton ? (
                  <button
                    type="button"
                    onClick={onCheckout}
                    disabled={Boolean(checkoutDisabled)}
                    className={
                      "py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold transition-colors " +
                      (checkoutDisabled
                        ? "opacity-60 cursor-not-allowed"
                        : "hover:bg-[var(--color-primary-dark)]")
                    }
                  >
                    {checkoutLabel ?? t("cart.checkout")}
                  </button>
                ) : null}

                {checkoutAttempted && hasOutOfSyncSections && (
                  <div className="col-span-2 text-xs text-red-600 font-medium">
                    {t("cart.outOfSync", {
                      sections: outOfSyncSectionLabels.join(t("listSeparator")),
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--color-accent)] bg-white/80 backdrop-blur shadow-[var(--shadow-soft)]">
            <MdShield className="text-lg text-green-600" />
            <span className="text-[10px] font-bold text-black/50 uppercase tracking-tighter">
              {t("badges.securePayment")}
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--color-accent)] bg-white/80 backdrop-blur shadow-[var(--shadow-soft)]">
            <MdSupportAgent className="text-lg text-blue-600" />
            <span className="text-[10px] font-bold text-black/50 uppercase tracking-tighter">
              {t("badges.support247")}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
