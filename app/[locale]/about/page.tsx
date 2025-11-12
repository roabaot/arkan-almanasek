import { Metadata } from "next";
import Breadcrumb from "@/app/[locale]/components/common/Breadcrumb";
import AboutStyle3 from "@/app/[locale]/components/sections/about/AboutStyle3";
import FunFacts from "@/app/[locale]/components/sections/funfacts/FunFacts";
import Faq from "@/app/[locale]/components/sections/faq/Faq";
import ContactStyle2 from "@/app/[locale]/components/sections/contact/ContactStyle2";
import Business from "@/app/[locale]/components/sections/business/Business";
import Pricing from "@/app/[locale]/components/sections/pricing/Pricing";
import ClientTestimonial from "@/app/[locale]/components/sections/testimonial/ClientTestimonial";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "About Us | Putech – Business & IT Solutions Next.js Template",
  description:
    "Learn more about Putech, a modern Next.js template crafted for IT companies, startups, and business service providers.",
};

const AboutPage = () => {
  const tCommon = useTranslations("common");
  return (
    <div>
      {/* <Navbar/> */}
      {/************* Breadcrumb section start here **************/}
      <Breadcrumb
        title={tCommon("about")}
        breadcrumb={[
          { name: tCommon("home"), href: "/" },
          { name: tCommon("about") },
        ]}
      />

      {/************* about us section start here **************/}
      <AboutStyle3 />

      {/************* Stats section start here **************/}
      <FunFacts />

      {/************* faq section start here **************/}
      <Faq />

      {/************* contact section start here **************/}
      <ContactStyle2 />

      {/************* business section start here **************/}
      <Business />

      {/************* pricing section start here **************/}
      <Pricing />

      {/************* client testimonial section start here **************/}
      <ClientTestimonial />
    </div>
  );
};

export default AboutPage;
