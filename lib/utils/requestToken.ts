import { cookies } from "next/headers";

const COOKIE_NAME = "token";

/**
 * Server-side check for the HttpOnly request token cookie.
 */
export async function hasRequestTokenCookieServer(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return typeof token === "string" && token.length > 0;
}

/**
 * Client-side check via API route (because HttpOnly cookies aren't readable in JS).
 */
export async function hasRequestTokenCookieClient(): Promise<boolean> {
  try {
    const res = await fetch("/api/session/request-token", {
      method: "GET",
      cache: "no-store",
    });
    if (!res.ok) return false;
    const json = (await res.json()) as { hasToken?: boolean };
    return Boolean(json?.hasToken);
  } catch {
    return false;
  }
}

/**
 * Universal helper: server uses cookies(), client uses /api/session/request-token.
 */
export async function hasRequestTokenCookie(): Promise<boolean> {
  return typeof window === "undefined"
    ? hasRequestTokenCookieServer()
    : hasRequestTokenCookieClient();
}
