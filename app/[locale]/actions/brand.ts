"use server";
import "server-only";
import { getLocale } from "next-intl/server";

export type CompanyLogoT = {
  id: number;
  code: string;
  name_i18n: string;
  name: string;
  name_en: string;
  icon_url: string;
  status: string;
};

export const getBrandLogos: () => Promise<CompanyLogoT[] | null> = async () => {
  try {
    const locale = (await getLocale()) || "ar";
    const base = process.env.NEXT_PUBLIC_BASE_URL;

    if (!base) {
      console.warn("[brand] Missing NEXT_PUBLIC_BASE_URL env variable");
      return null;
    }

    const url = `${base}/logos?locale=${locale}`;

    const res = await fetch(url, {
      next: { tags: ["brand-logos"], revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(
        "[brand] Failed to fetch logos",
        res.status,
        res.statusText
      );
      return null;
    }

    const json = await res.json();

    // Common API shape in this project seems to be { status, body: [...] }
    const items: CompanyLogoT[] = Array.isArray(json?.body)
      ? json.body
      : Array.isArray(json)
      ? json
      : [];

    return items;
  } catch (error) {
    console.error("[brand] getBrandLogos error", error);
    return null;
  }
};
