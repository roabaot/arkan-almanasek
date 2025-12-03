"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  ConsultationFormDataT,
  createConsultationSchema,
} from "@/app/[locale]/actions/contact";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CiCalendar, CiMail, CiUser } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";

const consultationTypes = [
  { value: "strategy", label: "Strategy & Planning" },
  { value: "implementation", label: "Implementation" },
  { value: "optimization", label: "Optimization & Performance" },
  { value: "integration", label: "Integration Support" },
  { value: "training", label: "Training & Onboarding" },
  { value: "other", label: "Other" },
];

const NewContactForm = () => {
  const t = useTranslations();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [detailsLength, setDetailsLength] = useState(0);
  const consultationSchema = createConsultationSchema((key) => t(key));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<ConsultationFormDataT>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      consultationType: "",
      details: "",
    },
  });

  const detailsValue = watch("details");

  const onSubmit = async (data: ConsultationFormDataT) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form data:", data);
      setSubmitted(true);
      reset();
      setDetailsLength(0);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {submitted && (
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
              Request Submitted!
            </h3>
            <p className="text-green-700">
              Thank you for your interest. Our team will contact you within 24
              hours to schedule your consultation.
            </p>
          </div>
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8 sm:p-10"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="flex flex-col"
            >
              <label className="text-slate-700 font-semibold mb-3 block">
                Full Name
              </label>
              <div className="relative">
                <CiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 h-12 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 bg-white"
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.name.message}
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
                Email Address
              </label>
              <div className="relative">
                <CiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="john@example.com"
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
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex flex-col"
            >
              <label className="text-slate-700 font-semibold mb-3 block">
                Phone Number
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="w-full pl-10 pr-4 py-3 h-12 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 bg-white"
                  {...register("phone")}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.phone.message}
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="flex flex-col"
            >
              <label className="text-slate-700 font-semibold mb-3 block">
                Consultation Type
              </label>
              <select
                className="w-full px-4 py-3 h-12 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 bg-white text-slate-600 appearance-none cursor-pointer"
                {...register("consultationType")}
              >
                <option value="">Select a type</option>
                {consultationTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.consultationType && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.consultationType.message}
                </p>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="flex flex-col"
          >
            <label className="text-slate-700 font-semibold mb-3 block">
              Project Details
            </label>
            <div className="relative">
              <textarea
                placeholder="Tell us about your project and what you're looking to achieve..."
                className="w-full px-4 py-4 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 bg-white min-h-32 resize-none"
                {...register("details")}
                onChange={(e) => {
                  register("details").onChange(e);
                  setDetailsLength(e.target.value.length);
                }}
              />
              <div className="absolute bottom-3 right-3 text-xs text-slate-400">
                {detailsValue?.length || 0}/1000
              </div>
            </div>
            {errors.details && (
              <p className="text-red-500 text-sm mt-2">
                {errors.details.message}
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
                  Submitting...
                </>
              ) : (
                "Request Consultation"
              )}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </>
  );
};

export default NewContactForm;
