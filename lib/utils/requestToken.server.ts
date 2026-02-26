import { cookies } from "next/headers";

const COOKIE_NAME = "token";

export async function hasRequestTokenCookieServer(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return typeof token === "string" && token.length > 0;
}
