import Container from "../common/Container";
import {
  FaEnvelope,
  FaFacebookF,
  FaSnapchatGhost,
  FaInstagram,
  FaTiktok,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsSendFill } from "react-icons/bs";
import FooterMap from "../ui/contact/FooterMap";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const year = new Date().getFullYear();
  return (
    <div className="bg-secondaryColor section-gap">
      <Container className="pt-20">
        {/* map here  */}
        <FooterMap />

        {/* main footer start here */}
        <div className="mt-15 flex flex-wrap justify-between space-y-10 md:space-y-0 mb-20">
          {/* item 1 start */}
          <div className="max-w-[300px]">
            {/* logo */}
            <Link href={"/"}>
              <Image
                className="w-[150px] h-auto object-contain"
                src={"/logo-with-name.svg"}
                width={150}
                height={50}
                alt="putech logo"
              />
            </Link>
            <p className="text-white mt-[30px]">{t("description")}</p>
            {/* social media icon here */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://x.com/mawardsal"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#36180A] w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-primaryBlue duration-300 ease-in-out"
              >
                <FaXTwitter size={18} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100095473516234"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#36180A] w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-primaryBlue duration-300 ease-in-out"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fmawardsal%2F&is_from_rle"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#36180A] w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-primaryBlue duration-300 ease-in-out"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@mawaridksa"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#36180A] w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-primaryBlue duration-300 ease-in-out"
              >
                <FaTiktok size={18} />
              </a>
              <a
                href="https://www.snapchat.com/@mawardsal"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#36180A] w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-primaryBlue duration-300 ease-in-out"
              >
                <FaSnapchatGhost size={18} />
              </a>
            </div>
          </div>

          {/* item 2 here */}
          <div className="max-w-[300px]">
            <h4 className="text-white">{t("contact_title")}</h4>
            <div className="mt-7 flex flex-col gap-4">
              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="bg-white/10 min-w-10 w-10 h-10 flex justify-center items-center rounded-full">
                  <FaPhoneAlt className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-white mb-2">{t("phone_label")}</p>
                  <h5 className="text-white [unicode-bidi:plaintext]">
                    <a href="tel:+966556332242">+966556332242</a>
                  </h5>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="bg-white/10 min-w-10 w-10 h-10 flex justify-center items-center rounded-full">
                  <FaEnvelope className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-white mb-2">{t("email_label")}</p>
                  <h5 className="text-white">
                    <a href="mailto:info@macs.com.sa">info@macs.com.sa</a>
                  </h5>
                </div>
              </div>

              {/* Work / Hours */}
              <div className="flex items-center gap-4">
                <div className="bg-white/10 min-w-10 w-10 h-10 flex justify-center items-center rounded-full">
                  <FaClock className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-white mb-2">{t("work_label")}</p>
                  <h5 className="text-white">{t("work_hours")}</h5>
                </div>
              </div>
            </div>
          </div>

          {/* item 3 here */}
          <div className="max-w-[300px]">
            <h4 className="text-white">{t("address_label")}</h4>
            <p className="text-white mt-7">{t("address_value")}</p>
          </div>

          {/* item 4 here */}
          <div className="max-w-[300px]">
            <h4 className="text-white">{t("newsletter_title")}</h4>
            <p className="text-white mt-7">{t("newsletter_description")}</p>
            <div className="mt-7 relative">
              <input
                type="text"
                className="w-full border border-white ps-5 rounded-full h-[54px] pe-[54px] text-white text-[16px] font-secondary font-normal outline-0 placeholder:text-white focus:border-primaryBlue duration-300 ease-in-out"
                placeholder={t("newsletter_placeholder")}
              />
              <button className="bg-primaryBlue w-10 h-10 rounded-full flex items-center justify-center text-secondaryColor absolute top-1.5 ltr:right-2 rtl:left-2 rtl:rotate-[225deg] ltr:rotate-[45deg]">
                <BsSendFill size={20} color="#fff" />
              </button>
              <span className="text-white text-[12px] font-normal font-secondary mt-2 ml-3">
                {t("newsletter_hint")}
              </span>
            </div>
          </div>
        </div>

        <hr className="text-white/20" />
        {/* footer bottom */}
        <div className="py-[30px] md:flex justify-between items-center">
          <div>
            <p className="text-white">{t.rich("copyright", { year })}</p>
          </div>
          <div className="mt-2 md:mt-0">
            <ul className="flex flex-wrap items-center space-x-7">
              <li>
                <Link
                  href={"/terms-condition"}
                  className="text-white text-[16px] font-normal font-secondary hover:text-primaryBlue duration-300 ease-in-out"
                >
                  {tCommon("terms_conditions")}
                </Link>
              </li>
              <li>
                <Link
                  href={"/privacy-policy"}
                  className="text-white text-[16px] font-normal font-secondary hover:text-primaryBlue duration-300 ease-in-out"
                >
                  {tCommon("privacy_policy")}
                </Link>
              </li>
              <li>
                <Link
                  href={"/contact"}
                  className="text-white text-[16px] font-normal font-secondary hover:text-primaryBlue duration-300 ease-in-out"
                >
                  {tCommon("contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
