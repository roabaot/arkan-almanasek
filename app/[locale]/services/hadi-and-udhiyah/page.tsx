import { getHadi, getHadiWithToken } from "@/app/api";
import HadiAndUdhiyahClient from "./HadiAndUdhiyahClient";
import type { HadiRequestT } from "@/app/api";
import { hasRequestTokenCookieServer } from "@/lib/utils/requestToken.server";

export default async function HadiAndUdhiyahPage() {
  const initialHadi = await getHadi();
  const hasToken = await hasRequestTokenCookieServer();
  let requestedHadi: HadiRequestT | null = null;
  if (hasToken) {
    try {
      requestedHadi = await getHadiWithToken();
    } catch {
      requestedHadi = null;
    }
  }

  console.log("hasToken: ", hasToken);
  console.log("requestedHadi: ", requestedHadi);

  return (
    <HadiAndUdhiyahClient
      initialHadi={initialHadi}
      requestedHadi={requestedHadi}
    />
  );
}
