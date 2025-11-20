import Breadcrumb from "@/app/[locale]/components/common/Breadcrumb";
import Contact from "@/app/[locale]/components/sections/contact/Contact";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Contact Us | Putech – Business & IT Solutions Next.js Template",
  description:
    "Get in touch with Putech – a modern Next.js template for IT companies, startups, and software agencies. Contact us today for business and IT solutions.",
};
const ContactPage = async () => {
  const t = await getTranslations("contact_page");
  const tCommon = await getTranslations("common");
  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb
        title={t("breadcrumb_title")}
        breadcrumb={[
          { name: tCommon("home"), href: "/" },
          { name: t("breadcrumb_title") },
        ]}
      />
      {/* Contact Section */}
      <Contact />
    </div>
  );
};

export default ContactPage;
