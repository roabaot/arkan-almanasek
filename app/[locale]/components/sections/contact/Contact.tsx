"use client";
import { IoLocationSharp } from "react-icons/io5";
import Container from "../../common/Container";
import SectionTitle from "../../common/SectionTitle";
import { MdEmail } from "react-icons/md";
import ContactForm from "../../ui/form/ContactForm";
import { useTranslations } from "next-intl";

const Contact = () => {
  const t = useTranslations("contact_page");
  return (
    <div className="section-gap">
      <Container className="flex flex-col md:flex-row gap-[30px]">
        <div className="w-full">
          {/* section title start */}
          <SectionTitle
            label={t("section_label")}
            title={t("section_title")}
            description={t("section_description")}
            align="left"
          />

          <div className="flex flex-col xl:flex-row gap-[30px] mt-[30px]">
            {/* Address Box */}
            <div className="bg-[#F2F4F8] p-7 rounded-[10px]">
              <div className="flex items-center gap-2 mb-3">
                <IoLocationSharp size={20} className="text-primaryBlue" />
                <span className="text-[16px] text-textColor font-normal font-secondary leading-7">
                  {t("address_label")}
                </span>
              </div>
              <h5 className="[unicode-bidi:plaintext]">{t("address_value")}</h5>
            </div>

            {/* Email Box */}
            <div className="bg-[#F2F4F8] p-7 rounded-[10px]">
              <div className="flex items-center gap-2 mb-3">
                <MdEmail size={20} className="text-primaryBlue" />
                <span className="text-[16px] text-textColor font-normal font-secondary leading-7">
                  {t("email_label")}
                </span>
              </div>
              <h5 className="[unicode-bidi:plaintext]">{t("email_value")}</h5>
            </div>
          </div>
        </div>

        {/* contact form */}
        <div className="w-full bg-white shadow-contact rounded-[20px] md:px-10 px-6 md:py-15 py-10">
          <h3 className="text-[30px]">{t("form_title")}</h3>
          {/* form */}
          <ContactForm />
        </div>
      </Container>
    </div>
  );
};

export default Contact;
