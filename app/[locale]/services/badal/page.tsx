import HeroSection from "./HeroSection";
import AboutConditionsSection from "./AboutConditionsSection";
import TrustTransparencyBanner from "./TrustTransparencyBanner";
import ProcessTimelineSection from "./ProcessTimelineSection";
import PricingSection from "./PricingSection";
import FaqSection from "./FaqSection";
import { getBadels } from "@/app/api/badel";

export default async function BadalServicePage() {
  const initialBadels = await getBadels();
  return (
    <main className="flex-grow w-full overflow-x-hidden">
      <HeroSection />

      <AboutConditionsSection />
      <TrustTransparencyBanner />
      <ProcessTimelineSection />
      <PricingSection initialBadels={initialBadels} />
      <FaqSection />
    </main>
  );
}
