const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export class ApiError extends Error {
  status: number;
  url: string;
  body: unknown;

  constructor(
    message: string,
    args: { status: number; url: string; body: unknown },
  ) {
    super(message);
    this.name = "ApiError";
    this.status = args.status;
    this.url = args.url;
    this.body = args.body;
  }
}

export type PaginationT = {
  current_page: number;
  total_pages: number;
  total_count: number;
  per_page: number;
};

function buildApiUrl(endpoint: string): string {
  // Allow callers to pass a full URL when needed
  if (/^https?:\/\//i.test(endpoint)) return endpoint;

  if (!API_BASE_URL) {
    throw new Error(
      "Missing NEXT_PUBLIC_API_BASE_URL. Define it in your environment (e.g. https://api.example.com)",
    );
  }

  const base = API_BASE_URL.replace(/\/+$/, "");
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
}

function getClientToken(): string | null {
  try {
    if (typeof window === "undefined") return null;
    const token = window.localStorage?.getItem("token");
    return typeof token === "string" && token.length >= 10 ? token : null;
  } catch {
    return null;
  }
}

async function doFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const defaultLocale =
    typeof document !== "undefined"
      ? document.documentElement.lang || "ar"
      : "ar";

  const { headers, ...fetchOptions } = options ?? {};
  const providedHeaders = new Headers(headers ?? undefined);
  const isFormDataBody =
    typeof FormData !== "undefined" && fetchOptions.body instanceof FormData;

  const reqHeaders = new Headers();
  if (!isFormDataBody) {
    reqHeaders.set("Content-Type", "application/json");
  }
  reqHeaders.set("Accept", "application/json");
  reqHeaders.set("Accept-Language", defaultLocale);
  reqHeaders.set("locale", defaultLocale);

  // Let caller override/extend.
  providedHeaders.forEach((value, key) => {
    reqHeaders.set(key, value);
  });

  const res = await fetch(url, {
    ...fetchOptions,
    headers: reqHeaders,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    let body: unknown = text;
    try {
      body = text ? JSON.parse(text) : text;
    } catch {
      // keep as text
    }

    throw new ApiError(`API Error: ${res.status} ${res.statusText}`, {
      status: res.status,
      url,
      body,
    });
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const url = buildApiUrl(endpoint);
  return doFetch<T>(url, options);
}

// apiFetchViaProxy: same endpoint as apiFetch, but attaches token automatically.
// Client uses localStorage token; server uses HttpOnly cookie (when available).
export async function apiFetchViaProxy<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  // Client: call the upstream API directly so the request URL is
  // `${NEXT_PUBLIC_API_BASE_URL}/...` (not localhost). Token is read from localStorage.
  if (typeof window !== "undefined") {
    const url = buildApiUrl(endpoint);
    const nextHeaders = new Headers(options?.headers ?? undefined);
    const token = getClientToken();
    if (token) {
      if (!nextHeaders.has("Authorization")) {
        nextHeaders.set("Authorization", `Bearer ${token}`);
      }
      nextHeaders.set("token", token);
    }
    return doFetch<T>(url, { ...(options ?? {}), headers: nextHeaders });
  }

  // Server: best-effort direct upstream call with token from HttpOnly cookie.
  const url = buildApiUrl(endpoint);
  const nextHeaders = new Headers(options?.headers ?? undefined);

  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (token) {
      if (!nextHeaders.has("Authorization")) {
        nextHeaders.set("Authorization", `Bearer ${token}`);
      }
      nextHeaders.set("token", token);
    }
  } catch {
    // ignore
  }

  return doFetch<T>(url, { ...(options ?? {}), headers: nextHeaders });
}
