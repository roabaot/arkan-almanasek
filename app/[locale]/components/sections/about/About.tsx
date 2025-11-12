"use client";
import SectionTitle from "../../common/SectionTitle";
import { FiChevronsRight } from "react-icons/fi";
import { motion } from "framer-motion";
import Container from "../../common/Container";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useIsLocaleRtl } from "@/app/lib/utils";

// texts will be provided via i18n messages (about.section.list)

const About = () => {
  const t = useTranslations("about.section");
  const tCommen = useTranslations("common");
  const isRtl = useIsLocaleRtl();
  const itemVariants = {
    initial: { x: 0 },
    hover: { x: isRtl ? -16 : 16 }, // small shift in px
  };
  // load the list items from translations (use individual keys because next-intl doesn't support arrays)
  const localTexts: string[] = [];
  for (let i = 0; i < 5; i++) {
    const key = `list.${i}`;
    const value = t(key);
    if (typeof value === "string" && value.length > 0) localTexts.push(value);
  }

  return (
    <div className="section-gap py-16">
      <Container className="lg:flex justify-between">
        {/* left part */}
        <div className="lg:w-[47%] md:w-[80%] md:mx-auto lg:mx-0 w-full space-y-5">
          <div className="flex gap-5">
            <div className="flex flex-col gap-7">
              <Image
                className="rounded-[10px]"
                src={"/assets/about/about-8.webp"}
                alt="about image"
                width={285}
                height={422}
                priority
              />
              <Image
                className="rounded-[10px]"
                src={"/assets/about/about-10.webp"}
                alt="about image"
                width={275}
                height={180}
                priority
              />
            </div>

            <div className="flex flex-col gap-7">
              <Image
                className="rounded-[10px]"
                src={"/assets/about/about-11.webp"}
                alt="about image"
                width={275}
                height={180}
                priority
              />
              <Image
                className="rounded-[10px]"
                src={"/assets/about/about-9.webp"}
                alt="about image"
                width={285}
                height={422}
                priority
              />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="bg-[#E5E8F2] rounded-[10px] md:p-7 p-3 shadow-about flex items-center gap-5 flex-1">
              <div>
                <Image
                  src="/icons/about/happy-client.svg"
                  alt="serach icon"
                  width={65}
                  height={65}
                  priority
                />
              </div>

              <div>
                <h3>6k+</h3>
                <p>{t("stats.clients")}</p>
              </div>
            </div>
            <div className="bg-[#E5E8F2] rounded-[10px] md:p-7 p-3 shadow-about flex items-center gap-5 flex-1">
              <div>
                <Image
                  className="w-full h-auto mix-blend-multiply"
                  src={"/assets/testimonial/star.jpg"}
                  alt="serach icon"
                  width={54}
                  height={65}
                  priority
                />
              </div>

              <div>
                <h3>2k+</h3>
                <p>{t("stats.services")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* right part */}
        <div className="lg:w-[47%] md:w-[80%] md:mx-auto lg:mx-0 w-full mt-10 lg:mt-0">
          <SectionTitle
            label={tCommen("about")}
            title={t("title")}
            description={t("description")}
            align="start"
          />

          <div className="flex flex-col gap-7 mt-[30px]">
            {/* Box with texts */}
            <div className="bg-sectionBg rounded-[10px] p-7">
              <div className="flex flex-col gap-4">
                {localTexts.map((line, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-2"
                    initial="initial"
                    whileHover="hover"
                    animate="initial"
                    transition={{ type: "tween", duration: 0.28 }}
                  >
                    <FiChevronsRight className="text-textColor w-5 h-5 mt-1 flex-shrink-0 rtl:rotate-180" />

                    <motion.span
                      className="text-textColor text-[16px] font-normal leading-7 font-secondary tracking-[-0.36px]"
                      variants={itemVariants}
                    >
                      {line}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Help section */}
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="55"
                height="55"
                viewBox="0 0 55 55"
                fill="none"
              >
                <g clipPath="url(#clip0_8487_7)">
                  <path
                    d="M31.8438 30.2441H42.8564"
                    stroke="#4F70E6"
                    strokeWidth="2.57908"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M31.8438 35.3555H42.8564"
                    stroke="#4F70E6"
                    strokeWidth="2.57908"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M31.8438 40.4648H42.8564"
                    stroke="#4F70E6"
                    strokeWidth="2.57908"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.0391 12.0547H23.0517"
                    stroke="#4F70E6"
                    strokeWidth="2.57908"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.0391 17.166H23.0517"
                    stroke="#4F70E6"
                    strokeWidth="2.57908"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.0391 22.2754H17.5454"
                    stroke="#4F70E6"
                    strokeWidth="2.57908"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <mask
                    id="mask0_8487_7"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="55"
                    height="55"
                  >
                    <path
                      d="M0 7.62939e-06H54.9784V55H0V7.62939e-06Z"
                      fill="white"
                    />
                  </mask>
                  <g mask="url(#mask0_8487_7)">
                    <path
                      d="M37.3429 47.2486H42.2496H44.6299C44.8826 47.2486 44.8552 47.2394 45.0805 47.3581L49.847 49.8037C50.1057 49.898 50.2275 49.8281 50.2154 49.5694L49.9384 44.4805C49.9323 44.441 49.9232 44.435 49.9506 44.4106C52.5257 42.2205 54.1693 38.9628 54.1693 35.34V34.8229C54.1693 28.2708 48.8061 22.9112 42.2496 22.9112H32.1775C25.6211 22.9112 20.2578 28.2708 20.2578 34.8229V35.34C20.2578 41.889 25.6211 47.2486 32.1775 47.2486H33.6234"
                      stroke="#4F70E6"
                      strokeWidth="2.57908"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.389 5.15539H22.7935C29.3499 5.15539 34.7131 10.5151 34.7131 17.0671V17.5811C34.7131 19.4944 34.2566 21.3043 33.4468 22.9104M21.5303 29.4928H12.7244H10.3441C10.0884 29.4928 10.1158 29.4837 9.89051 29.5992L5.12393 32.0479C4.86826 32.1422 4.74348 32.0722 4.75862 31.8106L5.03266 26.7247C5.03867 26.6822 5.0478 26.6761 5.02041 26.6548C2.44534 24.4647 0.804688 21.2069 0.804688 17.5811V17.0671C0.804688 10.5151 6.16798 5.15539 12.7244 5.15539H14.6694"
                      stroke="#4F70E6"
                      strokeWidth="2.57908"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_8487_7">
                    <rect width="54.9784" height="55" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <div className="flex flex-col">
                <p className="text-textColor text-[16px] font-normal leading-7 font-secondary tracking-[-0.36px]">
                  {t("help_text")}
                </p>
                <h5 className="[unicode-bidi:plaintext] hover:text-primaryBlue transition-colors duration-300 ease-in-out">
                  <a href="tel:+966556332242">+966556332242</a>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
