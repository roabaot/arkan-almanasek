import BreadcrumbStyle2 from "@/app/[locale]/components/common/BreadcrumbStyle2";
import AboutStory from "@/app/[locale]/components/sections/about/AboutStory";
import { useTranslations } from "next-intl";
import OurValues from "../components/sections/service/OurValues";

const AboutPageTwo = () => {
  const t = useTranslations("about");
  return (
    <div>
      <BreadcrumbStyle2
        title={t("breadcrumb_title")}
        para={t("breadcrumb_para")}
      />
      <AboutStory />
      <OurValues />
      {/* <ServiceStyle4 /> */}
      {/* <TeamStyle3 />
      <ExperiencedBusiness />
      <TestimonialStyle2 /> */}
    </div>
  );
};

export default AboutPageTwo;
