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
