import { clsx, type ClassValue } from "clsx";
import { useLocale } from "next-intl";
import { twMerge } from "tailwind-merge";
import { BreadcrumbsT } from "../[locale]/actions/services";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  date: Date,
  locale: string,
  options?: Intl.DateTimeFormatOptions
) {
  return new Intl.DateTimeFormat(locale, options).format(date);
}

export const useIsLocaleRtl = () => {
  const locale = useLocale();
  const rtlLocales = ["ar"];
  return rtlLocales.includes(locale);
};

export const handleServiceBreadcrumbs = (breadcrumbs: BreadcrumbsT[]) => {
  return breadcrumbs?.map((breadcrumb, index) => ({
    name: breadcrumb.name_i18n,
    href:
      index === (breadcrumbs ?? []).length - 1
        ? undefined
        : breadcrumb.model === "service"
        ? `/service/${breadcrumb.id}`
        : `/category/${breadcrumb.id}`,
  }));
};
