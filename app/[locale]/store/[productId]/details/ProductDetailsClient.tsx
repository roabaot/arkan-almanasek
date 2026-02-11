"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import ProductDetailsTabs from "./ProductDetailsTabs";
import ProductMainSection from "./ProductMainSection";

import type { GalleryImage, PageParams } from "./types";
import { ProductT } from "@/app/api/products";

export default function ProductDetailsClient({
  params,
  product,
}: {
  params: PageParams;
  product: ProductT;
}) {
  const t = useTranslations("store");
  const tCommon = useTranslations("common");

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#171511] dark:text-white mb-2">
            {t("brand.title")}
          </h2>
          <p className="text-secondary dark:text-[#d4a86a] text-lg">
            {t("brand.subtitle")}
          </p>
        </div>

        <div className="hidden md:block">
          <nav aria-label={t("breadcrumb.ariaLabel")} className="flex">
            <ol className="inline-flex items-center gap-2">
              <li>
                <Link className="text-gray-500 hover:text-primary" href="/">
                  {tCommon("home")}
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li aria-current="page" className="text-primary font-medium">
                {t("breadcrumb.store")}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Main Section */}
      {product && <ProductMainSection params={params} product={product} />}

      {/* Details Section Tabs */}
      {product && <ProductDetailsTabs product={product} />}
    </main>
  );
}
