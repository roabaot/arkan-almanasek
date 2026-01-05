"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CiMail, CiUser } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import {
  ConsultationFormDataT,
  createConsultationSchema,
} from "@/app/[locale]/lib/schemas/consultationSchema";
import { postConsultation } from "@/app/[locale]/actions/consultation";
import { useIsLocaleRtl } from "@/app/lib/utils";
import { useRouter } from "next/navigation";

const NewConsultationForm = () => {
  const router = useRouter();
  const t = useTranslations("consultation.form");
  const isRtl = useIsLocaleRtl();
  // const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [detailsLength, setDetailsLength] = useState(0);
  const consultationSchema = createConsultationSchema((key) => t(key));

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
    watch,
  } = useForm<ConsultationFormDataT>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      consultationType: "",
      message: "",
    },
  });

  const messageValue = watch("message");

  const onSubmit = async (data: ConsultationFormDataT) => {
    setIsLoading(true);
    try {
      await postConsultation(data);

      // setSubmitted(true);
      // reset();
      // setDetailsLength(0);
      // setTimeout(() => setSubmitted(false), 5000);

      router.push("/success");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {/* {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="mb-8 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 flex items-start gap-4"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
            <CiCalendar className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-green-900 mb-1">
              {t("success.title")}
            </h3>
            <p className="text-green-700">{t("success.message")}</p>
          </div>
        </motion.div>
      )} */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8 sm:p-10"
      >
        <form
          onSubmit={handleSubmit(onSubmit, (errors) => {
            console.log("Validation errors:", errors);
          })}
          className="space-y-6"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="flex flex-col"
            >
              <label className="text-slate-700 font-semibold mb-3 block">
                {t("fields.first_name.label")}
              </label>
              <div className="relative">
                <CiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t("fields.first_name.placeholder")}
                  className="w-full pl-10 pr-4 py-3 h-12 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 bg-white"
                  {...register("firstName")}
                />
              </div>
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.firstName.message}
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="flex flex-col"
            >
              <label className="text-slate-700 font-semibold mb-3 block">
                {t("fields.last_name.label")}
              </label>
              <div className="relative">
                <CiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t("fields.last_name.placeholder")}
                  className="w-full pl-10 pr-4 py-3 h-12 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 bg-white"
                  {...register("lastName")}
                />
              </div>
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.lastName.message}
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="flex flex-col"
            >
              <label className="text-slate-700 font-semibold mb-3 block">
                {t("fields.email.label")}
              </label>
              <div className="relative">
                <CiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder={t("fields.email.placeholder")}
                  className="w-full pl-10 pr-4 py-3 h-12 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 bg-white"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="flex flex-col"
            >
              <label className="text-slate-700 font-semibold mb-3 block">
                {t("fields.phone.label")}
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="tel"
                  placeholder={t("fields.phone.placeholder")}
                  className={`w-full pl-10 pr-4 py-3 h-12 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 bg-white ${
                    isRtl ? "text-end" : "text-start"
                  }`}
                  {...register("phone")}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.phone.message}
                </p>
              )}
            </motion.div>

            {/* <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="flex flex-col"
            >
              <label className="text-slate-700 font-semibold mb-3 block">
                {t("fields.type.label")}
              </label>
              <select
                className="w-full px-4 py-3 h-12 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 bg-white text-slate-600 appearance-none cursor-pointer"
                {...register("consultationType")}
              >
                <option value="">{t("fields.type.placeholder")}</option>
                <option value="strategy">
                  {t("fields.type.options.strategy")}
                </option>
                <option value="implementation">
                  {t("fields.type.options.implementation")}
                </option>
                <option value="optimization">
                  {t("fields.type.options.optimization")}
                </option>
                <option value="integration">
                  {t("fields.type.options.integration")}
                </option>
                <option value="training">
                  {t("fields.type.options.training")}
                </option>
                <option value="other">{t("fields.type.options.other")}</option>
              </select>
              {errors.consultationType && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.consultationType.message}
                </p>
              )}
            </motion.div> */}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="flex flex-col"
          >
            <label className="text-slate-700 font-semibold mb-3 block">
              {t("fields.details.label")}
            </label>
            <div className="relative">
              <textarea
                placeholder={t("fields.details.placeholder")}
                className="w-full px-4 py-4 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 bg-white min-h-32 resize-none"
                {...register("message")}
                onChange={(e) => {
                  register("message").onChange(e);
                  // setDetailsLength(e.target.value.length);
                }}
              />
              <div className="absolute bottom-3 right-3 text-xs text-slate-400">
                {messageValue?.length || 0}/1000
              </div>
            </div>
            {errors.message && (
              <p className="text-red-500 text-sm mt-2">
                {errors.message.message}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.4 }}
            className="pt-2"
          >
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {t("submit.loading")}
                </>
              ) : (
                t("submit.label")
              )}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </>
  );
};

export default NewConsultationForm;
