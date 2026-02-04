"use client";

import { useState } from "react";

import type { GalleryImage, PageParams } from "./types";

export default function ProductMainSection({
  params,
  gallery,
}: {
  params: PageParams;
  gallery: readonly GalleryImage[];
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const mainImage = gallery[Math.min(activeImageIndex, gallery.length - 1)];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
      {/* Right Column: Gallery */}
      <div className="flex flex-col gap-4">
        {/* Main Image */}
        <div className="relative w-full aspect-square bg-white dark:bg-[#1a160e] rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-[#332d22] group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={mainImage.alt}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            data-alt={mainImage.dataAlt ?? mainImage.alt}
            src={mainImage.src}
          />
          <div className="absolute top-4 left-4">
            <button
              type="button"
              className="size-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
              aria-label={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
              onClick={() => setIsFavorite((v) => !v)}
            >
              <span className="material-symbols-outlined">favorite</span>
            </button>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {gallery.map((img, idx) => {
            const selected = idx === activeImageIndex;
            return (
              <button
                key={img.src}
                type="button"
                className={
                  "relative size-20 sm:size-24 flex-shrink-0 rounded-xl overflow-hidden border-2 shadow-sm transition-all bg-white " +
                  (selected
                    ? "border-primary"
                    : "border-transparent hover:border-secondary/50")
                }
                aria-label={`صورة مصغرة ${idx + 1}`}
                onClick={() => setActiveImageIndex(idx)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  data-alt={img.dataAlt ?? img.alt}
                  src={img.src}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Left Column: Product Info */}
      <div className="flex flex-col justify-start pt-2">
        {/* Title & Tags */}
        <div className="mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600 ml-1.5" />
            متوفر في المخزون
          </span>

          <h1 className="text-3xl sm:text-4xl font-black text-text-main dark:text-white leading-tight mb-2">
            مجموعة مستلزمات الحج الفاخرة
          </h1>
          <div className="flex items-center gap-2">
            <div className="flex text-primary" aria-label="التقييم">
              <span className="material-symbols-outlined filled text-lg">
                star
              </span>
              <span className="material-symbols-outlined filled text-lg">
                star
              </span>
              <span className="material-symbols-outlined filled text-lg">
                star
              </span>
              <span className="material-symbols-outlined filled text-lg">
                star
              </span>
              <span className="material-symbols-outlined text-lg">
                star_half
              </span>
            </div>
            <span className="text-sm text-text-sub">(125 تقييم)</span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-8 p-4 bg-white dark:bg-[#1a160e] rounded-xl border border-dashed border-[#dcdcdc] dark:border-[#332d22] inline-block w-full">
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-bold text-primary">450.00</p>
            <p className="text-lg text-text-main dark:text-gray-300 font-medium">
              ريال سعودي
            </p>
          </div>
          <p className="text-sm text-text-sub mt-1">
            شامل ضريبة القيمة المضافة
          </p>
        </div>

        {/* Short Description */}
        <p className="text-text-sub text-base leading-relaxed mb-8 dark:text-gray-400">
          مجموعة متكاملة تضم كل ما يحتاجه الحاج لأداء المناسك بيسر وسهولة. تتكون
          من إحرام قطني فاخر عالي الجودة، حقيبة خصر آمنة، أدوات عناية شخصية
          خالية من العطور، وسجادة صلاة خفيفة الوزن. مصممة بعناية لتوفير أقصى
          درجات الراحة.
        </p>

        {/* Selectors */}
        <div className="space-y-6 mb-8 border-t border-b border-gray-100 dark:border-[#332d22] py-6">
          {/* Quantity */}
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-text-main dark:text-white">
              الكمية المطلوبة
            </span>
            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#2a241a]">
              <button
                type="button"
                className="size-10 flex items-center justify-center text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-[#362f22] rounded-r-lg transition-colors"
                aria-label="زيادة الكمية"
                onClick={() => setQuantity((q) => Math.min(99, q + 1))}
              >
                <span className="material-symbols-outlined">add</span>
              </button>
              <input
                className="w-12 text-center border-none focus:ring-0 bg-transparent text-text-main dark:text-white font-bold h-10 p-0"
                readOnly
                type="number"
                value={quantity}
                aria-label="الكمية"
              />
              <button
                type="button"
                className="size-10 flex items-center justify-center text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-[#362f22] rounded-l-lg transition-colors"
                aria-label="تقليل الكمية"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <span className="material-symbols-outlined">remove</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row gap-4 mt-auto">
          <button
            type="button"
            className="flex-1 min-h-14 bg-primary text-[#171512] text-lg font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-[#c9953a] hover:shadow-xl transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-3"
            aria-label="إضافة إلى السلة"
            onClick={() => {
              // Placeholder: wire this to your cart store/action
              console.log("add-to-cart", {
                locale: params.locale,
                productId: params.productId,
                quantity,
              });
            }}
          >
            <span className="material-symbols-outlined filled">
              shopping_bag
            </span>
            إضافة إلى السلة
          </button>

          <button
            type="button"
            className="flex-none w-14 h-14 border-2 border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center text-text-main dark:text-white hover:border-primary hover:text-primary transition-colors"
            aria-label="مشاركة المنتج"
            onClick={async () => {
              try {
                const share = (
                  navigator as Navigator & {
                    share?: (data: ShareData) => Promise<void>;
                  }
                ).share;

                if (typeof share === "function") {
                  await share({
                    title: "مجموعة مستلزمات الحج الفاخرة",
                    text: "شاهد تفاصيل المنتج",
                    url: window.location.href,
                  });
                }
              } catch {
                // ignore
              }
            }}
          >
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
