"use client";

import Image from "next/image";
import { accordionData } from "../../data/accordionData";
import Container from "../../common/Container";
import SectionTitle from "../../common/SectionTitle";
import Accordion from "../../common/AccordionItem";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import AnimatedNumber from "../../ui/animation/AnimatedNumber";

const Faq = () => {
  const t = useTranslations("faq");

  const titleRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.6 });
  const isInView = useInView(titleRef, {
    once: true,
    amount: 1,
  });

  useEffect(() => {
    console.log("isInView", isInView);
  }, [isInView]);

  return (
    <div className="bg-sectionBg section-gap relative py-16 overflow-hidden">
      <Container>
        {/* section title start here */}
        <div ref={titleRef}>
          <SectionTitle
            label={t("title")}
            title={t("description")}
            align="center"
            delay={0.8}
          />
        </div>

        {/* Accordion part start    */}
        <div className="lg:flex flex-row-reverse items-center justify-between md:mt-[60px] mt-10">
          {/* image part */}
          <motion.div
            ref={statsRef}
            className="lg:w-[43%] w-full mb-10 lg:mb-0 relative"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute lg:-bottom-[25%] lg:top-auto -top-[25%] ltr:-right-[25%] rtl:-left-[25%] z-0">
              <Image
                className="w-full h-[250px] object-contain rtl:scale-x-[-1]"
                src={"/assets/hero/effect-home-2.svg"}
                width={350}
                height={250}
                priority
                alt="dot"
              />
            </div>
            <Image
              className="w-full h-auto rounded-[10px] z-10 relative"
              src={"/assets/faq/thumb.jpeg"}
              width={600}
              height={346}
              priority
              alt="faq-thumb1"
            />
            <div className="bg-[#E1F0FD] rounded-[20px] shadow-faq p-5 flex items-center gap-5 absolute bottom-5 right-5 z-10">
              <div>
                <Image
                  src="/assets/about/icon.svg"
                  width={45}
                  height={45}
                  priority
                  alt="serach icon"
                />
              </div>

              <div>
                <h3>
                  <AnimatedNumber value={2000} suffix="+" play={statsInView} />
                </h3>
                <p>{t("project_completed")}</p>
              </div>
            </div>
          </motion.div>

          <div className="lg:w-[50%] w-full">
            {/* Accordion container: only animate / reveal when scrolled into view */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.7 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    when: "afterChildren",
                    staggerChildren: 0.06,
                    delayChildren: 0.2,
                    delay: 0.4,
                    duration: 0.6,
                  },
                },
              }}
            >
              <Accordion items={accordionData} />
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Faq;
