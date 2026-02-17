import { getHadi } from "@/app/api";
import HadiAndUdhiyahClient from "./HadiAndUdhiyahClient";

export default async function HadiAndUdhiyahPage() {
  const initialHadi = await getHadi();
  return <HadiAndUdhiyahClient initialHadi={initialHadi} />;
}
