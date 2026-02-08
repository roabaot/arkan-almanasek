import HomeHero from "../components/Home/Hero";
import VideoSection from "../components/Home/VideoSection";
import HomeCta from "../components/Home/Cta";
import HomeProducts from "../components/Home/Products";
import HomeServices from "../components/Home/Services";

export default function HomePage() {
  return (
    <main className="bg-[#f6f8f6] text-[#111811] antialiased">
      <HomeHero />
      <VideoSection
        video={{
          kind: "iframe",
          // YouTube embed (privacy-enhanced) with muted autoplay + controls.
          src: "https://www.youtube-nocookie.com/embed/2DYa4aHfdWk?autoplay=1&mute=0&controls=1&playsinline=1&rel=0",
          title: "فيديو تعريفي",
        }}
      />
      <HomeProducts />
      <HomeServices />
      <HomeCta />
    </main>
  );
}
