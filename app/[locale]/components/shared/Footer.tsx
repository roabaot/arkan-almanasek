"use client";
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
import { motion } from "framer-motion";

const Footer = () => {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const year = new Date().getFullYear();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const innerStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };

  const innerNoStagger = {
    hidden: {},
    visible: {},
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45 },
    },
  };

  return (
    <div className="bg-secondaryColor section-gap">
      <Container className="pt-20">
        {/* map here  */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <FooterMap />
        </motion.div>

        {/* main footer start here */}
        <div className="mt-15 flex flex-wrap justify-between space-y-10 md:space-y-0 mb-20">
          {/* item 1 start */}
          <motion.div
            className="max-w-[300px]"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
          >
            {/* logo */}
            <Link href="/">
              <Image
                className="w-[150px] h-auto object-contain"
                src="/logo-with-name.svg"
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
          </motion.div>

          {/* item 2 here */}
          <div className="max-w-[300px]">
            <motion.h4
              className="text-white"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.18 }}
            >
              {t("contact_title")}
            </motion.h4>

            <div className="mt-7 flex flex-col gap-4">
              {/* Phone */}
              <motion.div
                className="flex items-center gap-4"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.18 }}
              >
                <div className="bg-white/10 min-w-10 w-10 h-10 flex justify-center items-center rounded-full">
                  <FaPhoneAlt className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-white mb-2">{t("phone_label")}</p>
                  <motion.h5
                    className="text-white [unicode-bidi:plaintext]"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.18 }}
                  >
                    <a
                      href="tel:+966556332242"
                      className="hover:text-primaryBlue transition-colors duration-300 ease-in-out"
                    >
                      +966556332242
                    </a>
                  </motion.h5>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                className="flex items-center gap-4"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.18 }}
              >
                <div className="bg-white/10 min-w-10 w-10 h-10 flex justify-center items-center rounded-full">
                  <FaEnvelope className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-white mb-2">{t("email_label")}</p>
                  <motion.h5
                    className="text-white"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.18 }}
                  >
                    <a
                      href="mailto:info@macs.com.sa"
                      className="hover:text-primaryBlue transition-colors duration-300 ease-in-out"
                    >
                      info@macs.com.sa
                    </a>
                  </motion.h5>
                </div>
              </motion.div>

              {/* Work / Hours */}
              <motion.div
                className="flex items-center gap-4"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.18 }}
              >
                <div className="bg-white/10 min-w-10 w-10 h-10 flex justify-center items-center rounded-full">
                  <FaClock className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-white mb-2">{t("work_label")}</p>
                  <motion.h5
                    className="text-white"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.18 }}
                  >
                    {t("work_hours")}
                  </motion.h5>
                </div>
              </motion.div>
            </div>
          </div>

          {/* item 3 here */}
          <motion.div
            className="max-w-[300px]"
            variants={innerNoStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.h4 className="text-white" variants={itemVariants}>
              {t("address_label")}
            </motion.h4>
            <motion.p className="text-white mt-7" variants={itemVariants}>
              {t("address_value")}
            </motion.p>
          </motion.div>

          {/* item 4 here */}
          <motion.div
            className="max-w-[300px]"
            variants={innerStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <motion.h4 className="text-white" variants={itemVariants}>
              {t("newsletter_title")}
            </motion.h4>
            <motion.p className="text-white mt-7" variants={itemVariants}>
              {t("newsletter_description")}
            </motion.p>
            <motion.div className="group mt-7 relative">
              <motion.input
                type="text"
                className="w-full border border-white ps-5 rounded-full h-[54px] pe-[54px] text-white text-[16px] font-secondary font-normal outline-0 placeholder:text-white focus:border-primaryBlue group-hover:border-primaryBlue/50 duration-300 ease-in-out"
                placeholder={t("newsletter_placeholder")}
                variants={itemVariants}
              />
              <motion.button
                className="bg-primaryBlue w-10 h-10 rounded-full flex items-center justify-center text-secondaryColor absolute top-1.5 ltr:right-2 rtl:left-2 rtl:rotate-[225deg] ltr:rotate-[45deg]"
                variants={itemVariants}
              >
                <BsSendFill size={20} color="#fff" />
              </motion.button>
            </motion.div>
            <motion.span
              className="text-white text-[12px] font-normal font-secondary mt-2 ms-3"
              variants={itemVariants}
            >
              {t("newsletter_hint")}
            </motion.span>
          </motion.div>
        </div>

        <motion.hr
          className="text-white/20"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        />

        {/* footer bottom */}
        <motion.div
          className="py-[30px] md:flex justify-between items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div
            variants={itemVariants}
            className="md:text-start text-center"
          >
            <p className="text-white">{t.rich("copyright", { year })}</p>
          </motion.div>
          <motion.div className="mt-2 md:mt-0" variants={itemVariants}>
            <ul className="flex flex-wrap items-center space-x-7 md:justify-start justify-center">
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
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Footer;
