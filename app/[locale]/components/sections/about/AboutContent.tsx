"use client";
import React, { useRef } from "react";
import Container from "../../common/Container";
import { motion, useInView } from "framer-motion";
import { FaRegLightbulb } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { LuMessageSquare } from "react-icons/lu";

const AboutContent = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const t = useTranslations("about.story");

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
      },
    },
  };
  return (
    <Container className="pt-16">
      <div ref={sectionRef} className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <motion.div
          variants={itemVariants}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, amount: 0.75 }}
          className="group relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#21529f]/10 to-[#884194]/5 rounded-3xl transform group-hover:scale-105 transition-transform duration-500" />

          <div className="relative h-full bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-shadow duration-500">
            <motion.div
              variants={iconVariants}
              className="w-16 h-16 bg-gradient-to-br from-[#21529f] to-[#884194] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#21529f]/30"
            >
              <FaRegLightbulb className="w-8 h-8 text-white" />
            </motion.div>

            <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
              {t("our_vision_title")}
            </h3>

            <motion.div
              className="w-16 h-1 bg-gradient-to-r from-[#21529f] to-[#884194] rounded-full mb-6"
              initial={{ width: 0 }}
              animate={isInView ? { width: 64 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />

            <p className="text-slate-600 text-lg leading-relaxed">
              {t("our_vision_paragraph")}
            </p>

            <motion.div
              className="absolute top-6 right-6 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, amount: 0.75 }}
          className="group relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#e54f44]/10 to-[#ea8125]/5 rounded-3xl transform group-hover:scale-105 transition-transform duration-500" />

          <div className="relative h-full bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-shadow duration-500">
            <motion.div
              variants={iconVariants}
              className="w-16 h-16 bg-gradient-to-br from-[#e54f44] to-[#ea8125] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#e54f44]/30"
            >
              <LuMessageSquare className="w-8 h-8 text-white" />
            </motion.div>

            <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
              {t("our_mission_title")}
            </h3>

            <motion.div
              className="w-16 h-1 bg-gradient-to-r from-[#e54f44] to-[#ea8125] rounded-full mb-6"
              initial={{ width: 0 }}
              animate={isInView ? { width: 64 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />

            <p className="text-slate-600 text-lg leading-relaxed">
              {t("our_mission_paragraph")}
            </p>

            <motion.div
              className="absolute top-6 right-6 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
          </div>
        </motion.div>
      </div>
    </Container>
  );
};

export default AboutContent;
