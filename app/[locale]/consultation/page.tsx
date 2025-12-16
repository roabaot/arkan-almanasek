import { Metadata } from "next";
import ContactClinet from "../components/ui/contact/ConsultationClinet";

export const metadata: Metadata = {
  title: "Contact Us | Putech – Business & IT Solutions Next.js Template",
  description:
    "Get in touch with Putech – a modern Next.js template for IT companies, startups, and software agencies. Contact us today for business and IT solutions.",
};

const ContactPage = async () => {
  // const t = useTranslations("contact_page");
  // const tCommon = useTranslations("common");
  return (
    <div>
      {/* Breadcrumb */}
      {/* <Breadcrumb
        title={t("breadcrumb_title")}
        breadcrumb={[
          { name: tCommon("home"), href: "/" },
          { name: t("breadcrumb_title") },
        ]}
      /> */}
      {/* Contact Section */}
      {/* <Contact /> */}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

          <ContactClinet />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
