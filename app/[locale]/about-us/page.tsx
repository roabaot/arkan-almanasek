import CtaSection from "./sections/CtaSection";
import HeroSection from "./sections/HeroSection";
import ValuesSection from "./sections/ValuesSection";

export default async function AboutUsPage() {
  return (
    <main className="flex-grow w-full overflow-x-hidden bg-[#f6f8f6] text-[#111811] antialiased">
      <HeroSection />
      <ValuesSection />
      <CtaSection />
    </main>
  );
}
