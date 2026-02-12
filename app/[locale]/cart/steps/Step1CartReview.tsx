"use client";

import { useTranslations } from "next-intl";
import CartItemCard from "../CartItemCard";
import { useCart } from "@/hooks/useCart";

export default function Step1CartReview() {
  const t = useTranslations("cart.step1");
  const { cart } = useCart();

  return (
    <section className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft p-6 border border-gray-100 dark:border-[#332e25]">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-[#332e25]">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          1. {t("title")}
        </h3>
      </div>

      {cart.map((item, index) => (
        <CartItemCard
          key={item.id}
          item={item}
          variant={index === 0 ? "first" : "stacked"}
        />
      ))}
    </section>
  );
}
