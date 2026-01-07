import { Suspense } from "react";
import About from "./components/sections/about/About";
import ConsultingSection from "./components/sections/consulting/ConsultingSection";
import Faq from "./components/sections/faq/Faq";
import Hero from "./components/sections/hero/Hero";
import Service from "./components/sections/service/Service";
import Loading from "./loading";
import Brand from "./components/sections/brand/Brand";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <section className="relative">
        <Suspense fallback={<Loading className="absolute inset-0" />}>
          <Service />
        </Suspense>
      </section>
      <About />
      <Brand />
      <ConsultingSection />
      <Faq />
    </div>
  );
};

export default HomePage;
