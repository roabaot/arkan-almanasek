import { getHadi, getHadiWithToken } from "@/app/api";
import HadiAndUdhiyahClient from "./HadiAndUdhiyahClient";
import type { HadiRequestT } from "@/app/api";

export default async function HadiAndUdhiyahPage() {
  const initialHadi = await getHadi();
  let requestedHadi: HadiRequestT | null = null;

  try {
    requestedHadi = await getHadiWithToken();
  } catch {
    requestedHadi = null;
  }

  return (
    <HadiAndUdhiyahClient
      initialHadi={initialHadi}
      requestedHadi={requestedHadi}
    />
  );
}
