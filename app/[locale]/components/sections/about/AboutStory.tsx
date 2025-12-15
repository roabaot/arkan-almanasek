"use client";
import Container from "../../common/Container";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const AboutStory = () => {
  const t = useTranslations("about.story");
  return (
    <motion.div
      className="section-gap"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
    >
      <Container className="flex flex-col md:flex-row items-center gap-6">
        <motion.div
          className="md:w-[30%] w-full relative"
          variants={itemVariants}
        >
          <Image
            className="w-full rounded-[16px]"
            src={"/assets/about/about-1.png"}
            alt="about putech"
            width={350}
            height={440}
            priority
          />
          <div className="bg-white rounded-full flex items-center justify-between p-2 absolute bottom-5 left-1/2 -translate-x-1/2 w-[90%]">
            <span className="text-sm text-secondaryColor font-secondary font-normal max-w-[230px] ps-3">
              {t("tagline")}
            </span>
            <Image
              className="w-12 h-12 rounded-full md:hidden block lg:block"
              src={"/logo.svg"}
              alt="icon"
              width={48}
              height={48}
              priority
            />
          </div>
        </motion.div>

        <motion.div
          className="md:w-[40%] w-full flex flex-col gap-6"
          variants={itemVariants}
        >
          <Image
            className="w-full rounded-[16px]"
            src={"/assets/about/about-2.png"}
            alt="about putech"
            width={400}
            height={272}
            priority
          />
          <Image
            className="w-full rounded-[16px]"
            src={"/assets/about/about-3.png"}
            alt="about putech"
            width={400}
            height={272}
            priority
          />
        </motion.div>

        <motion.div className="md:w-[30%] w-full" variants={itemVariants}>
          <Image
            className="w-full rounded-[16px]"
            src={"/assets/about/about-4.png"}
            alt="about putech"
            width={350}
            height={440}
            priority
          />
        </motion.div>
      </Container>

      {/* <Container> */}
      {/* story here */}
      {/* <motion.div
          className="mt-12 md:mt-20 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          <h3 className="text-[36px]">{t("our_story_title")}</h3>
          <p className="mt-4 text-secondaryColor">{t("our_story_paragraph")}</p>
        </motion.div> */}

      {/* Vision here */}
      {/* <motion.div
          className="mt-12 md:mt-20 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          <h3 className="text-[36px]">{t("our_vision_title")}</h3>
          <p className="mt-4 text-secondaryColor">
            {t("our_vision_paragraph")}
          </p>
        </motion.div> */}

      {/* Our Mission here */}
      {/* <motion.div
          className="mt-12 md:mt-20 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          <h3 className="text-[36px]">{t("our_mission_title")}</h3>
          <p className="mt-4 text-secondaryColor">
            {t("our_mission_paragraph")}
          </p>
        </motion.div> */}
      {/* </Container> */}
    </motion.div>
  );
};

export default AboutStory;
