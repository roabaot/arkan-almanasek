import AboutStyle2 from "../components/sections/about/AboutStyle2";
import BlogStyle2 from "../components/sections/blog/BlogStyle2";
import Business from "../components/sections/business/Business";
import ContactStyle2 from "../components/sections/contact/ContactStyle2";
import OurFeatuers from "../components/sections/featuers/OurFeatuers";
import FunFacts from "../components/sections/funfacts/FunFacts";
import HeroStyle2 from "../components/sections/hero/HeroStyle2";
import ProjectStyle2 from "../components/sections/project/ProjectStyle2";
import ServiceStyle2 from "../components/sections/service/ServiceStyle2";
import TeamStyle2 from "../components/sections/team/TeamStyle2";
import ClientTestimonial from "../components/sections/testimonial/ClientTestimonial";

const HomePageTwo = () => {
  return (
    <div>
      <HeroStyle2 />
      <ServiceStyle2 />
      <FunFacts />
      <AboutStyle2 />
      <TeamStyle2 />
      <OurFeatuers />
      <ProjectStyle2 />
      <ContactStyle2 />
      <Business />
      <ClientTestimonial />
      <BlogStyle2 />
    </div>
  );
};

export default HomePageTwo;
