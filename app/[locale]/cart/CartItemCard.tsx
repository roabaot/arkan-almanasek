import Image from "next/image";
import type { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { CartItem as StoredCartItem } from "@/lib/utils/cart";
import {
  RiAddLine,
  RiDeleteBin6Line,
  RiFlightTakeoffLine,
  RiPriceTag3Line,
  RiSubtractLine,
} from "react-icons/ri";
import { useCart } from "@/hooks/useCart";

export type CartItemCardItem = StoredCartItem & {
  badge?: {
    icon: string;
    label: string;
  };
};

function getBadgeIcon(iconName: string): ReactNode {
  switch (iconName) {
    case "flight":
      return <RiFlightTakeoffLine className="text-sm" aria-hidden />;
    default:
      return <RiPriceTag3Line className="text-sm" aria-hidden />;
  }
}

export default function CartItemCard({
  item,
  variant,
}: {
  item: CartItemCardItem;
  variant: "first" | "stacked";
}) {
  const t = useTranslations("cart");
  const tItemCard = useTranslations("cart.itemCard");
  const locale = useLocale();
  const { removeProduct } = useCart();

  const displayName = item.name ?? String(item.id);
  const description = item.description ?? "";
  const imageSrc = item.image;
  const unitPrice = item.price ?? 0;

  const priceLabel = `${new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
  }).format(unitPrice * item.quantity)} ${t("currency.sar")}`;

  const containerClassName =
    variant === "first"
      ? "flex flex-col sm:flex-row gap-4 mb-6"
      : "flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100 dark:border-[#332e25]";

  return (
    <div className={containerClassName}>
      <div className="relative w-full sm:w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
        {imageSrc ? (
          <Image
            alt={displayName}
            src={imageSrc}
            fill
            sizes="(max-width: 640px) 100vw, 128px"
            className="object-cover"
            unoptimized
          />
        ) : null}
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              {displayName}
            </h4>
            <button
              type="button"
              className="text-red-400 hover:text-red-600 transition-colors"
              aria-label={tItemCard("removeItemAria", { item: displayName })}
              onClick={() => removeProduct(item.id)}
            >
              <RiDeleteBin6Line className="text-xl" aria-hidden />
            </button>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {description}
          </p>

          {item.badge ? (
            <div className="flex items-center gap-2 text-sm text-secondary bg-primary/10 w-fit px-2 py-1 rounded-md">
              {getBadgeIcon(item.badge.icon)}
              <span>{item.badge.label}</span>
            </div>
          ) : null}
        </div>

        <div className="flex justify-between items-end mt-4">
          <div className="flex items-center border border-gray-200 dark:border-[#332e25] rounded-lg bg-background-light dark:bg-background-dark">
            <button
              type="button"
              className="flex p-2 text-gray-500 hover:text-primary transition-colors"
              aria-label={tItemCard("decreaseQtyAria", { item: displayName })}
            >
              <RiSubtractLine className="text-sm" aria-hidden />
            </button>
            <span className="px-2 font-medium w-8 text-center text-gray-900 dark:text-white">
              {item.quantity}
            </span>
            <button
              type="button"
              className="flex p-2 text-gray-500 hover:text-primary transition-colors"
              aria-label={tItemCard("increaseQtyAria", { item: displayName })}
            >
              <RiAddLine className="text-sm" aria-hidden />
            </button>
          </div>
          <p className="text-xl font-bold text-primary">{priceLabel}</p>
        </div>
      </div>
    </div>
  );
}
