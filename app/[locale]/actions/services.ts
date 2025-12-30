"use server";
import "server-only";
import { revalidateTag } from "next/cache";
import { getLocale } from "next-intl/server";
import { ServiceFormInputsT } from "../lib/schemas/serviceFormSchema";

export interface BreadcrumbsT {
  id: number;
  name_i18n: string;
  model: "service_category" | "service";
}

// Service categories type
export interface ServiceCategoryT {
  id: number;
  code: string;
  description_i18n?: string;
  name_i18n: string;
  position: number;
  icon_url: string | null;
  status: "active" | "inactive";
  breadcrumbs?: BreadcrumbsT[];
}

export interface ServiceCategoryHomeT {
  default_services: ServiceCategoryT[] & { service_category_ids?: string[] };
  service_categories: ServiceCategoryT[];
}

export type AudienceType = "individual" | "institution" | "companies";

export interface ServiceT {
  id: number;
  code: string;
  description_i18n?: string;
  icon_url?: string | null;
  name_i18n: string;
  service_category_ids: Array<number | string>;
  status: "active" | "inactive";
  breadcrumbs?: BreadcrumbsT[];
  conditions?: string;
  cost?: string;
  duration?: string;
  government_fees?: string;
  required_documents?: string[];
  benefits?: string[];
  service_categories?: ServiceCategoryT[];
  target_audience?: AudienceType[];
}

// Server action to fetch services (POST when invoked from client, regular call on server components)
interface GetServicesOptions {
  noStore?: boolean; // force uncached fetch for debugging
  debug?: boolean; // enable verbose logging
  service_category_ids?: Array<string | number>; // filter by category IDs
}

export async function getServices(
  opts: GetServicesOptions = {}
): Promise<ServiceT[]> {
  const locale = (await getLocale()) || "ar";
  const { noStore = false, debug = false, service_category_ids } = opts;
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL;
    if (!base) {
      if (debug)
        console.warn("[services] Missing NEXT_PUBLIC_BASE_URL env variable");
      return [];
    }

    // Build URL with optional query parameters like:
    // /services?filter_by[service_category_ids][]=4&filter_by[service_category_ids][]=7
    let url = `${base}/services`;
    if (service_category_ids && service_category_ids.length) {
      const qs = service_category_ids
        .map(
          (id) => `filter_by[service_category_ids][]=${encodeURIComponent(id)}`
        )
        .join("&");
      url += `?${qs}&locale=${locale}`;
    } else {
      url += `?locale=${locale}`;
    }

    const fetchOptions: RequestInit & {
      next?: { tags?: string[]; revalidate?: number };
      locale?: string;
    } = noStore
      ? {
          cache: "no-store",
          next: { tags: ["services"] },
          locale,
        }
      : {
          next: { tags: ["services"], revalidate: 3600 },
          locale,
        };

    if (debug) {
      console.log("[services] Fetching:", url);
      const curl = `curl --location --globoff '${url}'`;
      console.log(`[services] Equivalent curl (GET):\n${curl}`);
      if (noStore) console.log("[services] (cache bypass: no-store)");
    }

    const res = await fetch(url, fetchOptions);
    if (!res.ok) {
      if (debug)
        console.error("[services] Failed fetch", res.status, res.statusText);
      return [];
    }
    const data = await res.json();
    console.log("data: ", data);

    if (debug) {
      console.log(
        "[services] Raw data preview:",
        JSON.stringify(data).slice(0, 400)
      );
      if (data && typeof data === "object") {
        console.log(
          "[services] Keys:",
          Object.keys(data as Record<string, unknown>)
        );
      }
    }
    return data.body;
  } catch (e) {
    if (debug) console.error("[services] getServices error", e);
    return [];
  }
}

// Optional server action to force cache invalidation after mutations
export async function revalidateServices() {
  revalidateTag("services");
}

export const getServiceById = async (
  id: number | string
): Promise<ServiceT | null> => {
  try {
    const locale = (await getLocale()) || "ar";
    const fetchOptions: RequestInit & { locale?: string } = {
      cache: "no-store",
      locale,
    };
    const serviceRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/services/${id}?locale=${locale}`,
      fetchOptions
    ).then((res) => res.json());

    if (serviceRes.status === 200) {
      return serviceRes.body;
    }
    return null;
  } catch (error) {
    console.error("[services] getServiceById error", error);
    return null;
  }
};

// Fetch service categories (simplified: expects { body: [...] })
export async function getServiceCategories(
  opts: GetServicesOptions = {}
): Promise<ServiceCategoryT[]> {
  const { noStore = false, debug = false } = opts;
  const locale = (await getLocale()) || "ar";
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL;
    if (!base) {
      if (debug)
        console.warn(
          "[services-category] Missing NEXT_PUBLIC_BASE_URL env variable"
        );
      return [];
    }
    const url = `${base}/service_categories?locale=${locale}`;
    const fetchOptions: RequestInit & {
      next?: { tags?: string[]; revalidate?: number };
      locale?: string;
    } = noStore
      ? { cache: "no-store", next: { tags: ["services-category"] }, locale }
      : { next: { tags: ["services-category"], revalidate: 3600 }, locale };
    if (debug) console.log("[services-category] Fetching:", url);
    const res = await fetch(url, fetchOptions);
    console.log("res: ", res);

    if (!res.ok) {
      if (debug)
        console.error(
          "[services-category] Failed fetch",
          res.status,
          res.statusText
        );
      return [];
    }
    const json = await res.json();
    console.log();

    if (debug) {
      console.log(
        "[services-category] Raw JSON preview:",
        JSON.stringify(json).slice(0, 400)
      );
      if (json && typeof json === "object") {
        console.log(
          "[services-category] Keys:",
          Object.keys(json as Record<string, unknown>)
        );
      }
    }
    type BodyShape = { body: unknown };
    const hasBodyArray = (
      val: unknown
    ): val is { body: Record<string, unknown>[] } => {
      if (!val || typeof val !== "object" || !("body" in val)) return false;
      const b = (val as BodyShape).body;
      if (!Array.isArray(b)) return false;
      return b.every(
        (entry: unknown) => typeof entry === "object" && entry !== null
      );
    };
    let bodyArr: Record<string, unknown>[] = [];
    if (hasBodyArray(json)) {
      bodyArr = (json as { body: Record<string, unknown>[] }).body;
    }
    if (bodyArr.length === 0) {
      if (debug)
        console.warn("[services-category] body array missing or empty");
      return [];
    }
    const normalized: ServiceCategoryT[] = bodyArr.map((item, idx) => {
      return {
        id: (item.id as number) ?? idx,
        code: (item.code as string) ?? `code_${idx}`,
        description_i18n: item.description_i18n as string | undefined,
        name_i18n:
          (item.name_i18n as string) || (item.name as string) || "Unnamed",
        position: (item.position as number) ?? idx,
        icon_url: (item.icon_url as string | null) ?? null,
        status: (item.status as "active" | "inactive") || "inactive",
      };
    });
    if (debug)
      console.log(`[services-category] Normalized count: ${normalized.length}`);
    return normalized;
  } catch (e) {
    if (debug)
      console.error("[services-category] getServiceCategories error", e);
    return [];
  }
}

export async function getServiceCategoriesHome(
  opts: GetServicesOptions = {}
): Promise<ServiceCategoryHomeT> {
  const { noStore = false, debug = false } = opts;
  const locale = (await getLocale()) || "ar";
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL;
    if (!base) {
      if (debug)
        console.warn(
          "[services-category] Missing NEXT_PUBLIC_BASE_URL env variable"
        );
      return { default_services: [], service_categories: [] };
    }
    const url = `${base}/service_categories/home?locale=${locale}`;
    const fetchOptions: RequestInit & {
      next?: { tags?: string[]; revalidate?: number };
      locale?: string;
    } = noStore
      ? {
          cache: "no-store",
          next: { tags: ["services-category-home"] },
          locale,
        }
      : {
          next: { tags: ["services-category-home"], revalidate: 3600 },
          locale,
        };
    if (debug) console.log("[services-category] Fetching:", url);
    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
      if (debug)
        console.error(
          "[services-category] Failed fetch",
          res.status,
          res.statusText
        );
      return { default_services: [], service_categories: [] };
    }
    const json = await res.json();
    console.log("data from service categories home: ", json);

    if (debug) {
      console.log(
        "[services-category] Raw JSON preview:",
        JSON.stringify(json).slice(0, 400)
      );
      if (json && typeof json === "object") {
        console.log(
          "[services-category] Keys:",
          Object.keys(json as Record<string, unknown>)
        );
      }
    }
    return json.body;
  } catch (e) {
    if (debug)
      console.error("[services-category] getServiceCategories error", e);
    return { default_services: [], service_categories: [] };
  }
}

export async function revalidateServiceCategories() {
  revalidateTag("services-category");
}

export const getServiceCategoryById = async (
  id: number | string
): Promise<ServiceCategoryT | null> => {
  try {
    const locale = (await getLocale()) || "ar";
    const fetchOptions: RequestInit & { locale?: string } = {
      cache: "no-store",
      locale,
    };

    const base = process.env.NEXT_PUBLIC_BASE_URL;
    if (!base) {
      console.warn(
        "[services-category] Missing NEXT_PUBLIC_BASE_URL env variable"
      );
      return null;
    }

    const res = await fetch(
      `${base}/service_categories/${id}?locale=${locale}`,
      fetchOptions
    );

    if (!res.ok) {
      const text = await res.text().catch(() => "<unable to read body>");
      console.error(
        `[services-category] Failed fetch ${res.status} ${
          res.statusText
        }: ${text.slice(0, 400)}`
      );
      return null;
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const bodyText = await res.text().catch(() => "<unable to read body>");
      console.error(
        "[services-category] Expected JSON but received different content-type:",
        contentType,
        "body preview:",
        bodyText.slice(0, 800)
      );
      return null;
    }

    const categoryRes = await res.json();

    if (categoryRes && categoryRes.status === 200) {
      return categoryRes.body;
    }
    return null;
  } catch (error) {
    console.error("[services] getServiceById error", error);
    return null;
  }
};

export const postService = async (
  body: ServiceFormInputsT
): Promise<ServiceFormInputsT | null> => {
  try {
    const { role, ...other } = body;
    const serviceRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/request_services/${role}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(other),
        cache: "no-store",
      }
    ).then((res) => res.json());

    if (serviceRes.status === 200) {
      return serviceRes.body;
    }
    return null;
  } catch (error) {
    console.error("[services] postService error", error);
    return null;
  }
};
