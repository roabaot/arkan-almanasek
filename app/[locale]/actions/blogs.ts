"use server";
import "server-only";
import { revalidateTag } from "next/cache";

interface GetBlogsOptions {
  page?: number;
  per_page?: number;
  category?: string | number; // category id or slug depending on BE
  noStore?: boolean;
  debug?: boolean;
  search?: string; // free-text search term
}

export interface BlogT {
  id: number;
  published_at: string;
  author: string;
  comments: number;
  title: string;
  image_url: string;
  category: string;
  content: string;
  tags?: string;
  [key: string]: unknown;
}

export interface BlogsResponseT {
  items: BlogT[];
  meta?: {
    total?: number;
    per_page?: number;
    page?: number;
    total_pages?: number;
  };
}

// Fetch blogs with pagination and optional category filter
export async function getBlogs(
  opts: GetBlogsOptions = {}
): Promise<BlogsResponseT> {
  const {
    page = 1,
    per_page = 10,
    category,
    noStore = false,
    debug = false,
    search,
  } = opts;

  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL;
    if (!base) {
      if (debug)
        console.warn("[blogs] Missing NEXT_PUBLIC_BASE_URL env variable");
      return { items: [], meta: { total: 0, per_page, page, total_pages: 0 } };
    }

    let url = `${base}/blogs`;
    const params: string[] = [];
    if (page) params.push(`page=${encodeURIComponent(String(page))}`);
    if (per_page)
      params.push(`per_page=${encodeURIComponent(String(per_page))}`);
    if (
      category !== undefined &&
      category !== null &&
      String(category) !== ""
    ) {
      // backend may accept filter_by[category_ids][]=<id> or category=<slug>
      // use a simple category param — adjust if BE expects different shape
      params.push(`category=${encodeURIComponent(String(category))}`);
    }
    if (search && String(search).trim() !== "") {
      params.push(`search=${encodeURIComponent(String(search).trim())}`);
    }
    if (params.length) url += `?${params.join("&")}`;

    const fetchOptions: RequestInit & {
      next?: { tags?: string[]; revalidate?: number };
    } = noStore
      ? { cache: "no-store", next: { tags: ["blogs"] } }
      : { next: { tags: ["blogs"], revalidate: 3600 } };

    if (debug) {
      console.log("[blogs] Fetching:", url);
      const curl = `curl --location --globoff '${url}'`;
      console.log(`[blogs] Equivalent curl (GET):\n${curl}`);
      if (noStore) console.log("[blogs] (cache bypass: no-store)");
    }

    const res = await fetch(url, fetchOptions);
    if (!res.ok) {
      if (debug)
        console.error("[blogs] Failed fetch", res.status, res.statusText);
      return { items: [], meta: { total: 0, per_page, page, total_pages: 0 } };
    }

    const json = await res.json();
    if (debug) {
      console.log(
        "[blogs] Raw JSON preview:",
        JSON.stringify(json).slice(0, 400)
      );
      if (json && typeof json === "object")
        console.log(
          "[blogs] Keys:",
          Object.keys(json as Record<string, unknown>)
        );
    }

    // Common BE shape in this project: { status: number, body: [...] , meta: { ... } }
    const items: BlogT[] = Array.isArray(json?.body)
      ? json.body
      : Array.isArray(json)
      ? json
      : [];
    const meta = (json && json.meta) ||
      (json && json.pagination) || {
        total: items.length,
        per_page,
        page,
        total_pages: 1,
      };

    return { items, meta };
  } catch (e) {
    if (opts.debug) console.error("[blogs] getBlogs error", e);
    return {
      items: [],
      meta: {
        total: 0,
        per_page: opts.per_page ?? 10,
        page: opts.page ?? 1,
        total_pages: 0,
      },
    };
  }
}

export async function revalidateBlogs() {
  revalidateTag("blogs");
}

export const getBlogById = async (
  id: number | string
): Promise<BlogT | null> => {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL;
    if (!base) return null;
    const res = await fetch(`${base}/blogs/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    // expect { status: number, body: { ... } }
    return json?.body ?? null;
  } catch (error) {
    console.error("[blogs] getBlogBySlug error", error);
    return null;
  }
};
