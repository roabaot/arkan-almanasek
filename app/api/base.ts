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

function buildProxyUrl(endpoint: string): string {
  if (/^https?:\/\//i.test(endpoint)) return endpoint;
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `/api/proxy${path}`;
}

async function doFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const defaultLocale =
    typeof document !== "undefined"
      ? document.documentElement.lang || "ar"
      : "ar";

  const { headers, ...fetchOptions } = options ?? {};
  const res = await fetch(url, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": defaultLocale,
      locale: defaultLocale,
      ...(headers || {}),
    },
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

// Opt-in: use same-origin proxy (e.g. when relying on HttpOnly cookies)
export async function apiFetchViaProxy<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const url = buildProxyUrl(endpoint);
  return doFetch<T>(url, options);
}
