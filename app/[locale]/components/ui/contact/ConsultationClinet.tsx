"use client";
import { motion } from "framer-motion";
import { CiCalendar } from "react-icons/ci";
import NewContactForm from "../form/ConsultationForm";
import Link from "next/link";
import Container from "../../common/Container";
import { useTranslations } from "next-intl";

const ConsultationClinet = () => {
  const t = useTranslations("consultation.contactSection");
  return (
    <Container className="mt-32 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mb-6 shadow-lg shadow-blue-500/30"
        >
          <CiCalendar className="w-10 h-10 text-white" />
        </motion.div>

        <h1 className="text-5xl sm:text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-4">
          {t("title")}
        </h1>
        <p className="text-xl text-slate-600 max-w-xl mx-auto">
          {t("description")}
        </p>
      </motion.div>

      <NewContactForm />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mt-8 text-center"
      >
        <p className="text-slate-600">
          {t("haveQuestions")}{" "}
          <Link
            href="/#faq"
            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            {t("visitFaq")}
          </Link>
        </p>
      </motion.div>
    </Container>
  );
};

export default ConsultationClinet;
