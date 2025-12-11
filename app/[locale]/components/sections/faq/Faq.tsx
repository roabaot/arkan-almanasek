"use client";

import { faqs } from "../../data/accordionData";
import Container from "../../common/Container";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  FiArrowRight,
  FiHelpCircle,
  FiMessageCircle,
  FiPhone,
  FiSearch,
} from "react-icons/fi";
import { Input } from "../../ui/fields/Input";
import { GoChevronDown } from "react-icons/go";
import { CiMail } from "react-icons/ci";
import { useIsLocaleRtl } from "@/app/lib/utils";
import Link from "next/link";
import { WHATSAPP_URL } from "../../common/WhatsAppButton";

const Faq = () => {
  const t = useTranslations();

  const isRtl = useIsLocaleRtl();
  const [openId, setOpenId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleQuestion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          t(q.question).toLowerCase().includes(searchQuery.toLowerCase()) ||
          (q.answer &&
            t(q.answer).toLowerCase().includes(searchQuery.toLowerCase())) ||
          (q.list &&
            t
              .raw(q.list)
              ?.map((item: string) => item.toLowerCase())
              .some((item: string) =>
                item.includes(searchQuery.toLowerCase())
              )) ||
          false
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 section-gap relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      <Container>
        {/* section title start here */}
        {/* <SectionTitle
          label={t("title")}
          title={t("description")}
          align="center"
          delay={0.8}
        /> */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.9 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mb-6 shadow-lg shadow-blue-500/30"
          >
            <FiHelpCircle className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-5xl sm:text-6xl font-bold leading-[1] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-4">
            {t("faq.title")}
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t("faq.description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-12"
        >
          <div className="relative max-w-2xl mx-auto">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              type="text"
              placeholder={t("faq.search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg border-2 border-slate-200 focus:border-blue-500 rounded-2xl shadow-sm transition-all duration-300"
            />
          </div>
        </motion.div>

        {/* Accordion part old versoin */}
        {/* <div className="lg:flex flex-row-reverse items-center justify-between md:mt-[60px] mt-10">
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
        </div> */}

        {/* Accordion part new version */}
        <div className="space-y-12">
          {filteredFaqs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + categoryIndex * 0.1, duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <span className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full me-3" />
                {t(category.category)}
              </h2>

              <div className="space-y-4">
                {category.questions.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleQuestion(faq.id)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 group"
                    >
                      <span className="text-lg font-semibold text-slate-900 group-hover:text-primaryBlue transition-colors duration-300">
                        {t(faq.question)}
                      </span>
                      <motion.div
                        animate={{ rotate: openId === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex-shrink-0"
                      >
                        <GoChevronDown
                          className={`w-5 h-5 transition-colors duration-300 ${
                            openId === faq.id
                              ? "text-primaryBlue"
                              : "text-slate-400 group-hover:text-primaryBlue/85"
                          }`}
                        />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {openId === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4 whitespace-pre-line">
                            {faq.answer && t(faq.answer)}

                            {faq.answer && faq.list && (
                              <>
                                <br />
                                <br />
                              </>
                            )}

                            <ul className="space-y-3">
                              {faq.list &&
                                t
                                  .raw(faq.list)
                                  .map((item: string, index: number) => (
                                    <motion.li
                                      key={index}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.05 }}
                                      className="flex items-start gap-3 text-slate-600"
                                    >
                                      {isRtl ? (
                                        <FiArrowRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5 rotate-180" />
                                      ) : (
                                        <FiArrowRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                      )}
                                      <span className="leading-relaxed">
                                        {item}
                                      </span>
                                    </motion.li>
                                  ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {searchQuery && filteredFaqs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <FiSearch className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No results found
            </h3>
            <p className="text-slate-600">
              Try searching with different keywords
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-blue-500/30"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-3">
              {t("faq.more_faqs.title")}
            </h2>
            <p className="text-blue-100 text-lg whitespace-pre-line">
              {t("faq.more_faqs.description")}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                  <FiMessageCircle className="w-6 h-6 text-white" />
                </div>
                <span className="font-semibold text-white mb-1">
                  {t("faq.more_faqs.options.live_chat")}
                </span>
                <span className="text-blue-100 text-sm">
                  {t("faq.more_faqs.options.start_conversation")}
                </span>
              </Link>
            </motion.div>

            <motion.a
              href="mailto:info@macs.com.sa"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                <CiMail className="w-6 h-6 text-white" />
              </div>
              <span className="font-semibold text-white mb-1">
                {t("faq.more_faqs.options.email_us")}
              </span>
              <span className="text-blue-100 text-sm">info@macs.com.sa</span>
            </motion.a>

            <motion.a
              href="tel:+966556332242"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                <FiPhone className="w-6 h-6 text-white" />
              </div>
              <span className="font-semibold text-white mb-1">
                {t("faq.more_faqs.options.phone_us")}
              </span>
              <span className="text-blue-100 text-sm [unicode-bidi:plaintext]">
                +966556332242
              </span>
            </motion.a>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Faq;
