"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Container from "../../common/Container";
import Image from "next/image";
import SectionTitle from "../../common/SectionTitle";

// const features = [
//   {
//     number: "01",
//     title: "title_1",
//     desc: "description_1",
//   },
//   {
//     number: "02",
//     title: "title_2",
//     desc: "description_2",
//   },
//   {
//     number: "03",
//     title: "title_3",
//     desc: "description_3",
//   },
//   {
//     number: "04",
//     title: "title_4",
//     desc: "description_4",
//   },
// ];

const ConsultingSection: React.FC = () => {
  const t = useTranslations("features");

  // Motion variants

  const item = {
    hidden: { opacity: 0, y: 60, scale: 0.995 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 28,
        duration: 0.8,
      },
    },
  } as const;

  // const numberVariant = {
  //   hidden: { opacity: 0, x: -20, rotate: -6 },
  //   visible: {
  //     opacity: 0.2,
  //     x: 0,
  //     rotate: 0,
  //     transition: { type: "spring", stiffness: 220, damping: 22 },
  //   },
  // } as const;

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.98, y: 18 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 160, damping: 20 },
    },
    hover: { scale: 1.02, rotate: -0.5, transition: { duration: 0.4 } },
  } as const;
  return (
    <motion.section
      className="bg-white section-gap overflow-hidden pb-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      // small fade-up for whole section
      transition={{ duration: 0.6 }}
    >
      <Container>
        <SectionTitle
          label={t("title")}
          title={t("description")}
          align="center"
        />

        <motion.div className="flex flex-col lg:flex-row items-center justify-between gap-12 md:mt-15 mt-12">
          {/* Left Content */}
          <div className="lg:w-[50%] w-full">
            {/* Make the grid the visible container so staggerChildren will affect direct children */}
            {/* <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 md:mt-15 mt-12">
              {features.map((step) => (
                <motion.div
                  key={step.number}
                  className="flex flex-col"
                  variants={item}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                >
                  <motion.h2
                    className="text-[66px] font-secondary font-semibold text-number z-30 relative"
                    variants={numberVariant}
                  >
                    {step.number}
                  </motion.h2>

                  <h3 className="xl:text-[28px] text-[24px] font-bold font-primary text-primary mb-2 mt-[-27px] ml-5 z-0 relative">
                    {t(`list.${step.title}`)}
                  </h3>
                  <p className="ml-5">{t(`list.${step.desc}`)}</p>
                </motion.div>
              ))}
            </motion.div> */}
            <motion.div
              className="flex flex-col whitespace-pre-line text-xl"
              variants={item}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            >
              {t("paragraph")}
            </motion.div>
          </div>
          {/* Right Image */}
          <div className="lg:w-[43%] w-full">
            <motion.div
              className="w-full rounded-[10px] overflow-hidden"
              variants={imageVariant}
              whileHover="hover"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <Image
                src={"/assets/digital-service/banner.png"}
                alt="Consulting"
                className="w-full rounded-[10px] xl:aspect-[11/9] lg:aspect-square object-cover transform-gpu will-change-transform"
                width={540}
                height={600}
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </motion.section>
  );
};

export default ConsultingSection;
