"use client";

import { useTranslations } from "next-intl";
import CartItemCard from "../CartItemCard";
import { CartItem } from "@/lib/utils/cart";

export default function Step1CartReview({ items }: { items?: CartItem[] }) {
  const t = useTranslations("cart.step1");

  return (
    <section className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft p-6 border border-gray-100 dark:border-[#332e25]">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-[#332e25]">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          1. {t("title")}
        </h3>
      </div>

      {items?.map((item, index) => (
        <CartItemCard
          key={item.id}
          item={item}
          variant={index === 0 ? "first" : "stacked"}
        />
      ))}
    </section>
  );
}
