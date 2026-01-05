"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "../../common/Container";
import Button from "../../common/Button";
import { motion } from "framer-motion";
import React from "react";
import { useTranslations } from "next-intl";
import { useIsLocaleRtl } from "@/app/lib/utils";

type Props = {
  title: string;
  description: string;
  locale: string;
};

const imagesVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.8,
      staggerChildren: 0.3,
    },
  },
};

export default function HeroClient({ title, description, locale }: Props) {
  const isRtl = useIsLocaleRtl();
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.98, x: isRtl ? 20 : -20 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.6, delay: 0.8 },
    },
  };
  const t = useTranslations();
  return (
    <div className="lg:mb-[200px] md:mb-[140px] mb-[60px] min-h-screen">
      <div className="relative">
        <Container className="md:pt-[120px] pt-5 2xl:pt-[160px] md:pb-[160px] pb-16">
          <div className="md:flex items-center gap-5 z-10 relative pt-[112px]">
            <motion.div
              className="md:min-w-[300px] w-[300px] relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={imageVariants}
            >
              <Image
                className="w-full h-auto transform rotate-[-5deg] rounded-[20px]"
                src={"/assets/hero/main.webp"}
                alt="Putech image"
                width={300}
                height={440}
                priority
              />
              <Image
                className="absolute left-[-10px] top-1/2 -translate-y-1/2 min-w-[318px]"
                src={"assets/hero/border-shape.svg"}
                alt="shape"
                width={370}
                height={133}
                priority
              />
            </motion.div>

            <div className="md:mt-2 mt-10 ms-6 lg:max-w-[720px] md:max-w-[500px]">
              {
                <motion.h1
                  initial={{ filter: "blur(20px)", opacity: 0 }}
                  animate={{ filter: "blur(0px)", opacity: 1 }}
                  transition={{ duration: 1.2 }}
                  className="xl:text-[48px] lg:text-[36px] md:text-[32px] text-[28px] font-bold !leading-[1.2] text-[#304b83] tracking-[-1.92px]"
                >
                  {title}
                </motion.h1>
              }

              <motion.p
                className="mt-7 lg:text-[20px] text-[18px] font-normal leading-7"
                initial={{ filter: "blur(20px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: 1.2 }}
              >
                {description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-12"
              >
                <Link href={`/${locale}/consultation?type=contact`}>
                  <Button
                    hoverBgColorClass="bg-primaryBlue"
                    className="bg-transparent border border-primaryBlue text-primaryBlue duration-300 ease-in-out"
                  >
                    {t("common.contact")}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </Container>

        {/* shape bg */}
        <div>
          <div className="glow bg-[#5078ff] absolute ltr:left-0 rtl:right-0 bottom-0" />
          <div className="glow bg-[#5078ff] animate-pulse absolute ltr:right-0 rtl:left-0 top-0" />

          <div className="glow bg-[#5078ff] animate-pulse absolute ltr:left-[10%] rtl:right-[10%] top-1/5" />
          <div className="glow bg-[#ed8324] opacity-50 absolute ltr:right-[15%] rtl:left-[15%] bottom-1/5" />
        </div>
      </div>

      <div className="relative">
        {/* Positioned image group */}
        <motion.div
          className="absolute inset-x-0 z-10 md:block hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={imageVariants}
        >
          <Container className="relative">
            <div className="absolute -top-40 ltr:right-0 rtl:left-0 flex gap-4 justify-end">
              <motion.div variants={imagesVariants}>
                <Image
                  className="lg:w-[290px] w-[200px] lg:h-[380px] h-[310px] object-cover rounded-[20px]"
                  src={"/assets/hero/sub-hero-1.webp"}
                  alt="macs image"
                  width={290}
                  height={380}
                />
              </motion.div>
              <motion.div className="" variants={imageVariants}>
                <Image
                  className="lg:w-[250px] w-[160px] h-[365px] mt-[-30px] object-cover rounded-[20px]"
                  src={"/assets/hero/sub-hero-2.webp"}
                  alt="macs image"
                  width={250}
                  height={365}
                  priority
                />
              </motion.div>
            </div>
          </Container>
        </motion.div>
      </div>
    </div>
  );
}
