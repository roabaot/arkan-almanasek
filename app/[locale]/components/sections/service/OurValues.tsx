"use client";
import Image from "next/image";
import Container from "../../common/Container";
import { useTranslations } from "next-intl";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const OurValues = () => {
  // Updated namespace to about.service as per request
  const t = useTranslations("about.values");
  return (
    <motion.div
      className="section-gap"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
    >
      <Container>
        <motion.div
          className="flex flex-col lg:flex-row md:gap-[70px] gap-12 items-center"
          variants={itemVariants}
        >
          <motion.div className="lg:w-[45%] w-full" variants={itemVariants}>
            <Image
              className="w-full md:max-h-[700px] lg:max-h-[625px] rounded-[16px]"
              src={"/assets/about/corporate-woman-reading-medium-shot.webp"}
              alt="women reading"
              width={580}
              height={700}
            />
          </motion.div>

          <motion.div className="lg:w-[40%] w-full" variants={itemVariants}>
            <p className="text-[18px] text-primaryBlue uppercase font-bold text-sm">
              {t("subtitle")}
            </p>
            <h3 className="md:text-[32px] text-[24px] text-secondaryColor font-medium mt-3">
              {t("heading")}
            </h3>
            <div className="flex flex-col xl:gap-10 gap-6 xl:mt-20 mt-12">
              {/* part 1 */}
              <motion.div variants={itemVariants}>
                <h4 className="md:text-[24px] text-[20px]">
                  1. {t("parts.1.title")}
                </h4>
                <p>{t("parts.1.description")}</p>
              </motion.div>
              {/* part 2 */}
              <motion.div variants={itemVariants}>
                <h4 className="md:text-[24px] text-[20px]">
                  2. {t("parts.2.title")}
                </h4>
                <p>{t("parts.2.description")}</p>
              </motion.div>
              {/* part 3 */}
              <motion.div variants={itemVariants}>
                <h4 className="md:text-[24px] text-[20px]">
                  3. {t("parts.3.title")}
                </h4>
                <p>{t("parts.3.description")}</p>
              </motion.div>
              {/* part 4 */}
              <motion.div variants={itemVariants}>
                <h4 className="md:text-[24px] text-[20px]">
                  4. {t("parts.4.title")}
                </h4>
                <p>{t("parts.4.description")}</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* counter part */}
        <div className="section-gap ">
          <div className="flex flex-col gap-10 lg:flex-row justify-between">
            <motion.div
              className="xl:w-[42%] lg:w-[45%] md:w-[70%] w-full"
              variants={itemVariants}
            >
              <h3 className="text-[28px] md:text-[36px] font-medium text-secondaryColor mb-4">
                {t("impact.heading")}
              </h3>
              <p className="">{t("impact.description")}</p>
            </motion.div>

            <motion.div
              className="xl:w-[42%] lg:w-[45%] w-full"
              variants={itemVariants}
            >
              <div className="flex flex-col md:flex-row justify-center items-center gap-10 xl:gap-20">
                <motion.div className="flex flex-col" variants={itemVariants}>
                  <span className="text-[48px] md:text-[64px] font-medium font-primary text-secondaryColor">
                    290+
                  </span>
                  <span className="text-[16px] font-secondary text-textColor mt-2">
                    {t("impact.clients_label")}
                  </span>
                </motion.div>
                <hr className="hidden xl:block h-32 border-[.5px] border-[#4B4757]"></hr>
                <motion.div className="flex flex-col" variants={itemVariants}>
                  <span className="text-[48px] md:text-[64px] font-primary font-medium text-secondaryColor">
                    1,200+
                  </span>
                  <span className="text-[16px] font-secondary text-textColor mt-2">
                    {t("impact.strategies_label")}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default OurValues;
