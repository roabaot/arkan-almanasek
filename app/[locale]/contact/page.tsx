import Breadcrumb from "@/app/[locale]/components/common/Breadcrumb";
import Contact from "@/app/[locale]/components/sections/contact/Contact";
import ContactMap from "@/app/[locale]/components/ui/contact/ContactMap";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Putech – Business & IT Solutions Next.js Template",
  description:
    "Get in touch with Putech – a modern Next.js template for IT companies, startups, and software agencies. Contact us today for business and IT solutions.",
};
const ContactPage = () => {
  return (
    <div>
      {/************* Breadcrumb section start here **************/}
      <Breadcrumb
        title="Contact us"
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Contact us" }]}
      />

      {/************* contact from start here **************/}
      <Contact />

      {/************* Map start here **************/}
      <ContactMap />
    </div>
  );
};

export default ContactPage;
