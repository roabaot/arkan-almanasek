import About from "./components/sections/about/About";
import ConsultingSection from "./components/sections/consulting/ConsultingSection";
import Faq from "./components/sections/faq/Faq";
import Hero from "./components/sections/hero/Hero";
import Service from "./components/sections/service/Service";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <About />
      <Service />
      <Faq />
      <ConsultingSection />
    </div>
  );
};

export default HomePage;
