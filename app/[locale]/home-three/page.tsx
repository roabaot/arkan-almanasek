import AboutStyle4 from "../components/sections/about/AboutStyle4"
import Blog from "../components/sections/blog/Blog"
import ExperiencedBusiness from "../components/sections/business/ExperiencedBusiness"
import ConsultingSection from "../components/sections/consulting/ConsultingSection"
import WorkWithUs from "../components/sections/cta/WorkWithUs"
import DigitalJourney from "../components/sections/DigitalJourney/DigitalJourney"
import HeroStyleThree from "../components/sections/hero/HeroStyleThree"
import ServiceStyle3 from "../components/sections/service/ServiceStyle3"
import Testimonial from "../components/sections/testimonial/Testimonial"

const HomeThree = () => {
  return (
    <div>
        <HeroStyleThree/>
        <AboutStyle4/>
        <ServiceStyle3/>
        <DigitalJourney/>
        <ConsultingSection/>
        <ExperiencedBusiness/>
          <Testimonial />
      <Blog />
      <WorkWithUs />
    </div>
  )
}

export default HomeThree