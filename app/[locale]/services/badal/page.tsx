import HeroSection from "./HeroSection";
import AboutConditionsSection from "./AboutConditionsSection";
import TrustTransparencyBanner from "./TrustTransparencyBanner";
import ProcessTimelineSection from "./ProcessTimelineSection";
import PricingSection from "./PricingSection";
import FaqSection from "./FaqSection";
import {
  type BadelRequestT,
  getBadels,
  getBadelsWithToken,
} from "@/app/api/badel";
import { hasRequestTokenCookieServer } from "@/lib/utils/requestToken.server";

export default async function BadalServicePage() {
  const initialBadels = await getBadels();
  const hasToken = await hasRequestTokenCookieServer();
  let requestedBadels: BadelRequestT | null = null;
  if (hasToken) {
    try {
      requestedBadels = await getBadelsWithToken();
    } catch {
      requestedBadels = null;
    }
  }

  return (
    <main className="flex-grow w-full overflow-x-hidden">
      <HeroSection />

      <AboutConditionsSection />
      <TrustTransparencyBanner />
      <ProcessTimelineSection />
      <PricingSection
        initialBadels={initialBadels}
        requestedCustomer={requestedBadels?.customer}
      />
      <FaqSection />
    </main>
  );
}
