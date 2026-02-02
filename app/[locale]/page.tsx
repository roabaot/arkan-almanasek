import HomeHero from "../components/Home/Hero";
import HomeCta from "../components/Home/Cta";
import HomeProducts from "../components/Home/Products";
import HomeServices from "../components/Home/Services";

export default function HomePage() {
  return (
    <main className="bg-[#f6f8f6] text-[#111811] antialiased">
      <HomeHero />
      <HomeServices />
      <HomeProducts />
      <HomeCta />
    </main>
  );
}
