"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import DOMPurify from "dompurify";
import { FaShirt, FaSoap } from "react-icons/fa6";
import {
  RiShieldCheckLine,
  RiStarFill,
  RiStarHalfFill,
  RiStarLine,
  RiTruckLine,
} from "react-icons/ri";

import type { TabKey } from "./types";
import { ProductT } from "@/app/api/products";

type ProductFeatureItem = {
  logo: string;
  name: string;
  description: string;
};

function decodeSvgDataUri(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("<svg")) return trimmed;

  if (!trimmed.startsWith("data:image/svg+xml")) return null;

  const commaIndex = trimmed.indexOf(",");
  if (commaIndex === -1) return null;

  const meta = trimmed.slice(0, commaIndex).toLowerCase();
  const data = trimmed.slice(commaIndex + 1);

  try {
    if (meta.includes(";base64")) {
      return atob(data);
    }
    return decodeURIComponent(data);
  } catch {
    return null;
  }
}

function renderFeatureIcon(icon: string): ReactNode {
  const svgMarkup = decodeSvgDataUri(icon);

  if (svgMarkup) {
    const sanitized = DOMPurify.sanitize(svgMarkup, {
      USE_PROFILES: { svg: true, svgFilters: true },
    });

    return (
      <span
        aria-hidden="true"
        className="inline-flex text-secondary [&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-current"
        // DOMPurify sanitizes the SVG before injecting.
        dangerouslySetInnerHTML={{ __html: sanitized }}
      />
    );
  }

  switch (icon.trim().toLowerCase()) {
    case "shirt":
    case "fa-shirt":
      return <FaShirt className="text-xl" aria-hidden="true" />;
    case "soap":
    case "fa-soap":
      return <FaSoap className="text-xl" aria-hidden="true" />;
    case "quality":
    case "shield":
    case "ri-shield-check-line":
      return <RiShieldCheckLine className="text-xl" aria-hidden="true" />;
    case "shipping":
    case "truck":
    case "ri-truck-line":
      return <RiTruckLine className="text-xl" aria-hidden="true" />;
    default:
      return <RiStarLine className="text-xl" aria-hidden="true" />;
  }
}

export default function ProductDetailsTabs({ product }: { product: ProductT }) {
  const t = useTranslations("store");
  const [activeTab, setActiveTab] = useState<TabKey>("description");

  const tabButtonBase =
    "px-8 py-5 text-sm font-bold transition-colors border-b-2";

  const features: ProductFeatureItem[] =
    Array.isArray(product.specifications) && product.specifications.length > 0
      ? product.specifications
      : [];

  return (
    <div className="mt-16 bg-white dark:bg-[#1a160e] rounded-2xl shadow-sm border border-gray-100 dark:border-[#332d22] overflow-hidden">
      {/* Tab Headers */}
      <div className="flex flex-wrap border-b border-gray-100 dark:border-[#332d22]">
        <button
          type="button"
          className={
            tabButtonBase +
            (activeTab === "description"
              ? " text-primary border-primary bg-primary/5"
              : " text-text-sub border-transparent hover:text-primary")
          }
          onClick={() => setActiveTab("description")}
        >
          {t("product.tabs.description")}
        </button>
        <button
          type="button"
          className={
            tabButtonBase +
            (activeTab === "specs"
              ? " text-primary border-primary bg-primary/5"
              : " text-text-sub border-transparent hover:text-primary")
          }
          onClick={() => setActiveTab("specs")}
        >
          {t("product.tabs.specs")}
        </button>
        {/* <button
          type="button"
          className={
            tabButtonBase +
            (activeTab === "reviews"
              ? " text-primary border-primary bg-primary/5"
              : " text-text-sub border-transparent hover:text-primary")
          }
          onClick={() => setActiveTab("reviews")}
        >
          {t("product.tabs.reviews", { count: 125 })}
        </button> */}
      </div>

      {/* Tab Content */}
      <div className="p-8 lg:p-10">
        {activeTab === "description" ? (
          <div className="max-w-4xl">
            <h3 className="text-2xl font-bold text-text-main dark:text-white mb-6">
              {t("product.description.title")}
            </h3>
            <p className="text-text-sub dark:text-gray-400 leading-relaxed mb-6">
              {t("product.description.paragraph1")}
            </p>
            <p className="text-text-sub dark:text-gray-400 leading-relaxed mb-8">
              {t("product.description.paragraph2")}
            </p>

            {/* Features Grid */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              {features.map((feature, idx) => (
                <div className="flex gap-4" key={`${feature.logo}-${idx}`}>
                  <div className="size-12 rounded-full bg-background-light dark:bg-[#2a241a] flex items-center justify-center text-secondary shrink-0">
                    {renderFeatureIcon(feature.logo)}
                  </div>
                  <div>
                    <h4 className="font-bold text-text-main dark:text-white mb-1">
                      {feature.name}
                    </h4>
                    <p className="text-sm text-text-sub">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div> */}

            {/* Rating Section */}
            {/* <div className="mt-16 pt-10 border-t border-gray-100 dark:border-[#332d22]">
              <h3 className="text-2xl font-bold text-text-main dark:text-white mb-8">
                {t("product.reviews.title")}
              </h3>
              <div className="flex flex-col lg:flex-row gap-12"> */}
            {/* Rating Summary */}
            {/* <div className="w-full lg:w-1/3 bg-background-light dark:bg-[#2a241a] p-6 rounded-xl">
                  <div className="flex flex-col gap-2 mb-6">
                    <p className="text-text-main dark:text-white text-5xl font-black leading-tight tracking-[-0.033em]">
                      4.8
                    </p>
                    <div className="flex gap-1 text-primary">
                      <RiStarFill className="text-xl" aria-hidden="true" />
                      <RiStarFill className="text-xl" aria-hidden="true" />
                      <RiStarFill className="text-xl" aria-hidden="true" />
                      <RiStarFill className="text-xl" aria-hidden="true" />
                      <RiStarHalfFill className="text-xl" aria-hidden="true" />
                    </div>
                    <p className="text-text-sub text-base font-normal leading-normal">
                      {t("product.reviews.basedOn", { count: 125 })}
                    </p>
                  </div>

                  <div className="grid grid-cols-[20px_1fr_40px] items-center gap-y-3 gap-x-3">
                    <p className="text-text-main dark:text-white text-sm font-medium">
                      5
                    </p>
                    <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-[#e4e1dc] dark:bg-[#4a4a4a]">
                      <div
                        className="rounded-full bg-secondary"
                        style={{ width: "75%" }}
                      />
                    </div>
                    <p className="text-text-sub text-sm font-normal text-left dir-ltr">
                      75%
                    </p>

                    <p className="text-text-main dark:text-white text-sm font-medium">
                      4
                    </p>
                    <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-[#e4e1dc] dark:bg-[#4a4a4a]">
                      <div
                        className="rounded-full bg-secondary"
                        style={{ width: "15%" }}
                      />
                    </div>
                    <p className="text-text-sub text-sm font-normal text-left dir-ltr">
                      15%
                    </p>

                    <p className="text-text-main dark:text-white text-sm font-medium">
                      3
                    </p>
                    <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-[#e4e1dc] dark:bg-[#4a4a4a]">
                      <div
                        className="rounded-full bg-secondary"
                        style={{ width: "5%" }}
                      />
                    </div>
                    <p className="text-text-sub text-sm font-normal text-left dir-ltr">
                      5%
                    </p>

                    <p className="text-text-main dark:text-white text-sm font-medium">
                      2
                    </p>
                    <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-[#e4e1dc] dark:bg-[#4a4a4a]">
                      <div
                        className="rounded-full bg-secondary"
                        style={{ width: "3%" }}
                      />
                    </div>
                    <p className="text-text-sub text-sm font-normal text-left dir-ltr">
                      3%
                    </p>

                    <p className="text-text-main dark:text-white text-sm font-medium">
                      1
                    </p>
                    <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-[#e4e1dc] dark:bg-[#4a4a4a]">
                      <div
                        className="rounded-full bg-secondary"
                        style={{ width: "2%" }}
                      />
                    </div>
                    <p className="text-text-sub text-sm font-normal text-left dir-ltr">
                      2%
                    </p>
                  </div>
                </div> */}

            {/* Individual Reviews */}
            {/* <div className="flex-1 space-y-6">
                  <div className="border-b border-gray-100 dark:border-[#332d22] pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 font-bold">
                          {t("product.reviews.items.0.initial")}
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-text-main dark:text-white">
                            {t("product.reviews.items.0.name")}
                          </h5>
                          <div className="flex text-primary text-xs">
                            <RiStarFill
                              className="text-sm"
                              aria-hidden="true"
                            />
                            <RiStarFill
                              className="text-sm"
                              aria-hidden="true"
                            />
                            <RiStarFill
                              className="text-sm"
                              aria-hidden="true"
                            />
                            <RiStarFill
                              className="text-sm"
                              aria-hidden="true"
                            />
                            <RiStarFill
                              className="text-sm"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-text-sub">
                        {t("product.reviews.items.0.timeAgo")}
                      </span>
                    </div>
                    <p className="text-text-main dark:text-gray-300 text-sm leading-relaxed">
                      {t("product.reviews.items.0.text")}
                    </p>
                  </div>

                  <div className="border-b border-gray-100 dark:border-[#332d22] pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 font-bold">
                          {t("product.reviews.items.1.initial")}
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-text-main dark:text-white">
                            {t("product.reviews.items.1.name")}
                          </h5>
                          <div className="flex text-primary text-xs">
                            <RiStarFill
                              className="text-sm"
                              aria-hidden="true"
                            />
                            <RiStarFill
                              className="text-sm"
                              aria-hidden="true"
                            />
                            <RiStarFill
                              className="text-sm"
                              aria-hidden="true"
                            />
                            <RiStarFill
                              className="text-sm"
                              aria-hidden="true"
                            />
                            <RiStarLine
                              className="text-sm"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-text-sub">
                        {t("product.reviews.items.1.timeAgo")}
                      </span>
                    </div>
                    <p className="text-text-main dark:text-gray-300 text-sm leading-relaxed">
                      {t("product.reviews.items.1.text")}
                    </p>
                  </div>
                </div> */}
            {/* </div>
            </div>} */}
          </div>
        ) : activeTab === "specs" ? (
          <div className="max-w-4xl">
            <h3 className="text-2xl font-bold text-text-main dark:text-white mb-6">
              {t("product.specs.title")}
            </h3>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-background-light dark:bg-[#2a241a]">
                <p className="text-sm text-text-sub">
                  {t("product.specs.material.label")}
                </p>
                <p className="font-bold text-text-main dark:text-white">
                  {t("product.specs.material.value")}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background-light dark:bg-[#2a241a]">
                <p className="text-sm text-text-sub">
                  {t("product.specs.accessories.label")}
                </p>
                <p className="font-bold text-text-main dark:text-white">
                  {t("product.specs.accessories.value")}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background-light dark:bg-[#2a241a]">
                <p className="text-sm text-text-sub">
                  {t("product.specs.suitableFor.label")}
                </p>
                <p className="font-bold text-text-main dark:text-white">
                  {t("product.specs.suitableFor.value")}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background-light dark:bg-[#2a241a]">
                <p className="text-sm text-text-sub">
                  {t("product.specs.warranty.label")}
                </p>
                <p className="font-bold text-text-main dark:text-white">
                  {t("product.specs.warranty.value")}
                </p>
              </div>
            </div> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              {features.map((feature, idx) => (
                <div className="flex gap-4" key={`${feature.logo}-${idx}`}>
                  <div className="size-12 rounded-full bg-background/85 dark:bg-[#2a241a] flex items-center justify-center text-secondary shrink-0">
                    {renderFeatureIcon(feature.logo)}
                  </div>
                  <div>
                    <h4 className="font-bold text-text-main dark:text-white mb-1">
                      {feature.name}
                    </h4>
                    <p className="text-sm text-text-sub">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl">
            <h3 className="text-2xl font-bold text-text-main dark:text-white mb-6">
              {t("product.reviews.title")}
            </h3>
            <p className="text-text-sub dark:text-gray-400">
              {t("product.reviews.placeholder")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
