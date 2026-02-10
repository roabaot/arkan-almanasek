"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createContactUsSchema, type ContactUsValues } from "@/lib/validation";
import { useTranslations } from "next-intl";

import {
  RiArrowDownSLine,
  RiArrowRightLine,
  RiBookOpenLine,
  RiCustomerService2Line,
  RiMailLine,
  RiMapPinLine,
  RiPhoneLine,
  RiQuestionLine,
  RiSendPlane2Line,
  RiTimeLine,
} from "react-icons/ri";

export default function ContactUsPage() {
  const t = useTranslations("contact");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactUsValues>({
    resolver: zodResolver(createContactUsSchema(t)),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (_values: ContactUsValues) => {};

  return (
    <main className="flex-grow flex flex-col items-center w-full text-[#111811] antialiased">
      <section className="w-full max-w-[1280px] px-4 md:px-10 py-12 md:py-20 text-center fade-in-up">
        <h1 className="text-4xl md:text-5xl font-black text-[#171512] dark:text-white mb-6 tracking-tight">
          {t("hero.title")}
        </h1>
        <p className="text-lg md:text-xl text-[#857966] dark:text-[#a39a8c] max-w-2xl mx-auto leading-relaxed">
          {t("hero.description")}
        </p>
      </section>

      <section className="w-full max-w-[1280px] px-4 md:px-10 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 fade-in-up delay-100">
          <div className="bg-white dark:bg-[#2a241a] rounded-2xl shadow-lg border border-[#f0ebe5] dark:border-[#3a3225] p-6 md:p-10">
            <h3 className="text-2xl font-bold mb-8 text-secondary dark:text-primary">
              {t("form.title")}
            </h3>
            <form
              className="flex flex-col gap-6"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[#171512] dark:text-gray-200">
                    {t("form.fullName.label")}
                  </span>
                  <input
                    className="h-12 px-4 rounded-lg bg-[#f9fafb] dark:bg-[#1a160e] border border-[#e4e1dc] dark:border-[#3a3225] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400"
                    placeholder={t("form.fullName.placeholder")}
                    type="text"
                    aria-invalid={!!errors.fullName}
                    {...register("fullName")}
                  />
                  {errors.fullName?.message ? (
                    <span
                      className="text-sm text-red-600 dark:text-red-400"
                      role="alert"
                    >
                      {errors.fullName.message}
                    </span>
                  ) : null}
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[#171512] dark:text-gray-200">
                    {t("form.email.label")}
                  </span>
                  <input
                    className="h-12 px-4 rounded-lg bg-[#f9fafb] dark:bg-[#1a160e] border border-[#e4e1dc] dark:border-[#3a3225] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400"
                    placeholder={t("form.email.placeholder")}
                    type="email"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                  />
                  {errors.email?.message ? (
                    <span
                      className="text-sm text-red-600 dark:text-red-400"
                      role="alert"
                    >
                      {errors.email.message}
                    </span>
                  ) : null}
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[#171512] dark:text-gray-200">
                    {t("form.phone.label")}
                  </span>
                  <div className="relative">
                    <input
                      className="w-full h-12 px-4 rounded-lg bg-[#f9fafb] dark:bg-[#1a160e] border border-[#e4e1dc] dark:border-[#3a3225] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400 text-left"
                      dir="ltr"
                      placeholder={t("form.phone.placeholder")}
                      type="tel"
                      aria-invalid={!!errors.phone}
                      {...register("phone")}
                    />
                    <RiPhoneLine
                      className="absolute right-3 top-3 text-gray-400 pointer-events-none text-lg mt-1"
                      aria-hidden
                    />
                  </div>
                  {errors.phone?.message ? (
                    <span
                      className="text-sm text-red-600 dark:text-red-400"
                      role="alert"
                    >
                      {errors.phone.message}
                    </span>
                  ) : null}
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[#171512] dark:text-gray-200">
                    {t("form.subject.label")}
                  </span>
                  <div className="relative">
                    <select
                      className="w-full h-12 px-4 rounded-lg bg-[#f9fafb] dark:bg-[#1a160e] border border-[#e4e1dc] dark:border-[#3a3225] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer"
                      defaultValue=""
                      aria-invalid={!!errors.subject}
                      {...register("subject")}
                    >
                      <option disabled value="">
                        {t("form.subject.placeholder")}
                      </option>
                      <option value="haj">{t("form.subject.options.haj")}</option>
                      <option value="umrah">{t("form.subject.options.umrah")}</option>
                      <option value="support">{t("form.subject.options.support")}</option>
                      <option value="other">{t("form.subject.options.other")}</option>
                    </select>
                    <RiArrowDownSLine
                      className="absolute left-4 top-3.5 text-gray-500 pointer-events-none"
                      aria-hidden
                    />
                  </div>
                  {errors.subject?.message ? (
                    <span
                      className="text-sm text-red-600 dark:text-red-400"
                      role="alert"
                    >
                      {errors.subject.message}
                    </span>
                  ) : null}
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-[#171512] dark:text-gray-200">
                  {t("form.message.label")}
                </span>
                <textarea
                  className="w-full p-4 rounded-lg bg-[#f9fafb] dark:bg-[#1a160e] border border-[#e4e1dc] dark:border-[#3a3225] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none placeholder:text-gray-400"
                  placeholder={t("form.message.placeholder")}
                  rows={5}
                  aria-invalid={!!errors.message}
                  {...register("message")}
                />
                {errors.message?.message ? (
                  <span
                    className="text-sm text-red-600 dark:text-red-400"
                    role="alert"
                  >
                    {errors.message.message}
                  </span>
                ) : null}
              </label>

              <button
                className="mt-2 h-12 rounded-lg bg-primary hover:bg-primary-dark text-[#171512] font-bold text-base transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                type="submit"
                disabled={isSubmitting}
              >
                <span>{t("form.submit")}</span>
                <RiSendPlane2Line
                  className="group-hover:-translate-x-1 transition-transform rtl:rotate-180"
                  aria-hidden
                />
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6 fade-in-up delay-200">
          <div className="bg-white dark:bg-[#2a241a] rounded-xl p-6 border border-[#e4e1dc] dark:border-[#3a3225] flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#fdf6e9] dark:bg-primary/10 flex items-center justify-center text-secondary dark:text-primary flex-shrink-0">
              <RiPhoneLine aria-hidden className="text-xl" />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-1">{t("info.phone.title")}</h4>
              <p className="text-[#857966] dark:text-[#a39a8c] text-sm mb-1">
                {t("info.phone.description")}
              </p>
              <p className="font-bold text-[#171512] dark:text-white" dir="ltr">
                {t("info.phone.value")}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#2a241a] rounded-xl p-6 border border-[#e4e1dc] dark:border-[#3a3225] flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#fdf6e9] dark:bg-primary/10 flex items-center justify-center text-secondary dark:text-primary flex-shrink-0">
              <RiMailLine aria-hidden className="text-xl" />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-1">{t("info.email.title")}</h4>
              <p className="text-[#857966] dark:text-[#a39a8c] text-sm mb-1">
                {t("info.email.description")}
              </p>
              <p className="font-bold text-[#171512] dark:text-white">
                {t("info.email.value")}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#2a241a] rounded-xl p-6 border border-[#e4e1dc] dark:border-[#3a3225] flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#fdf6e9] dark:bg-primary/10 flex items-center justify-center text-secondary dark:text-primary flex-shrink-0">
              <RiTimeLine aria-hidden className="text-xl" />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-1">{t("info.hours.title")}</h4>
              <p className="text-[#857966] dark:text-[#a39a8c] text-sm mb-1">
                {t("info.hours.description")}
              </p>
              <p className="font-bold text-[#171512] dark:text-white">
                {t("info.hours.value")}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#2a241a] rounded-xl p-6 border border-[#e4e1dc] dark:border-[#3a3225] flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#fdf6e9] dark:bg-primary/10 flex items-center justify-center text-secondary dark:text-primary flex-shrink-0">
              <RiMapPinLine aria-hidden className="text-xl" />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-1">{t("info.location.title")}</h4>
              <p className="text-[#857966] dark:text-[#a39a8c] text-sm mb-1">
                {t("info.location.description")}
              </p>
              <p className="font-bold text-[#171512] dark:text-white">
                {t("info.location.value")}
              </p>
            </div>
          </div>

          <div className="mt-4 flex gap-4 justify-center lg:justify-start">
            <a
              className="w-10 h-10 rounded-full bg-white dark:bg-[#2a241a] border border-[#e4e1dc] dark:border-[#3a3225] flex items-center justify-center text-secondary hover:text-white hover:bg-secondary transition-all hover:-translate-y-1"
              href="#"
              aria-label={t("social.xAria")}
            >
              <span className="text-xl font-bold">{t("social.xSymbol")}</span>
            </a>
            <a
              className="w-10 h-10 rounded-full bg-white dark:bg-[#2a241a] border border-[#e4e1dc] dark:border-[#3a3225] flex items-center justify-center text-secondary hover:text-white hover:bg-green-600 transition-all hover:-translate-y-1"
              href="#"
              aria-label={t("social.whatsAppAria")}
            >
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.698c1.09.587 1.846.89 3.135.89 4.983 0 7.49-4.088 5.12-7.56-1.12-1.638-3.003-2.618-5.449-2.277zm0 13.978c-1.936 0-3.32-.578-4.52-1.353l-3.344.877.892-3.26c-.722-1.144-1.104-2.336-1.104-3.882 0-4.393 3.575-7.967 7.968-7.967 4.394 0 7.969 3.574 7.969 7.967 0 4.394-3.575 7.968-7.969 7.968z" />
              </svg>
            </a>
            <a
              className="w-10 h-10 rounded-full bg-white dark:bg-[#2a241a] border border-[#e4e1dc] dark:border-[#3a3225] flex items-center justify-center text-secondary hover:text-white hover:bg-pink-600 transition-all hover:-translate-y-1"
              href="#"
              aria-label={t("social.instagramAria")}
            >
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#fdfaf5] dark:bg-[#1f1a12] py-20 border-t border-[#f0ebe5] dark:border-[#332e26]">
        <div className="max-w-[1280px] px-4 md:px-10 mx-auto">
          <div className="text-center mb-12 fade-in-up delay-100">
            <h2 className="text-3xl font-bold mb-3 text-[#171512] dark:text-white">
              {t("helpCenter.title")}
            </h2>
            <p className="text-[#857966] dark:text-[#a39a8c]">
              {t("helpCenter.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in-up delay-200">
            <div className="bg-white dark:bg-[#2a241a] rounded-xl p-8 border border-transparent hover:border-accent transition-all hover:shadow-lg cursor-pointer group text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#fdf6e9] dark:bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <RiQuestionLine className="text-3xl" aria-hidden />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t("helpCenter.cards.faq.title")}
              </h3>
              <p className="text-[#857966] dark:text-[#a39a8c] text-sm mb-4">
                {t("helpCenter.cards.faq.description")}
              </p>
              <span className="text-secondary dark:text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                {t("helpCenter.cards.faq.action")}
                <RiArrowRightLine
                  className="text-sm rtl:rotate-180"
                  aria-hidden
                />
              </span>
            </div>

            <div className="bg-white dark:bg-[#2a241a] rounded-xl p-8 border border-transparent hover:border-accent transition-all hover:shadow-lg cursor-pointer group text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#fdf6e9] dark:bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <RiCustomerService2Line className="text-3xl" aria-hidden />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t("helpCenter.cards.consultations.title")}
              </h3>
              <p className="text-[#857966] dark:text-[#a39a8c] text-sm mb-4">
                {t("helpCenter.cards.consultations.description")}
              </p>
              <span className="text-secondary dark:text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                {t("helpCenter.cards.consultations.action")}
                <RiArrowRightLine
                  className="text-sm rtl:rotate-180"
                  aria-hidden
                />
              </span>
            </div>

            <div className="bg-white dark:bg-[#2a241a] rounded-xl p-8 border border-transparent hover:border-accent transition-all hover:shadow-lg cursor-pointer group text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#fdf6e9] dark:bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <RiBookOpenLine className="text-3xl" aria-hidden />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t("helpCenter.cards.services.title")}
              </h3>
              <p className="text-[#857966] dark:text-[#a39a8c] text-sm mb-4">
                {t("helpCenter.cards.services.description")}
              </p>
              <span className="text-secondary dark:text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                {t("helpCenter.cards.services.action")}
                <RiArrowRightLine
                  className="text-sm rtl:rotate-180"
                  aria-hidden
                />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full relative border-t-8 border-[#d4a86a]/20">
        <div className="relative w-full py-20 px-4 md:px-10 overflow-hidden bg-gradient-to-r from-[#8a582b] to-[#a66c37]">
          <div
            className="absolute inset-0 opacity-10 animate-subtle-pattern pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L100 50 L50 100 L0 50 Z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3Cpath d='M50 0 L100 50 L50 100 L0 50 Z' fill='none' stroke='%23ffffff' stroke-width='1' transform='rotate(45 50 50)'/%3E%3Ccircle cx='50' cy='50' r='20' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3Crect x='25' y='25' width='50' height='50' fill='none' stroke='%23ffffff' stroke-width='1' transform='rotate(45 50 50)'/%3E%3Cpath d='M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z' fill='%23ffffff' fill-opacity='0.2'/%3E%3C/svg%3E\")",
              backgroundSize: "80px 80px",
            }}
          />
          <div className="absolute top-0 left-0 w-full h-px bg-white/20" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-white/20" />

          <div className="relative max-w-[1280px] mx-auto flex flex-col items-center justify-center text-center gap-8 fade-in-up z-10">
            <div className="max-w-3xl">
              <div className="mx-auto w-12 h-12 mb-6 text-[#f2bc77] opacity-80">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight drop-shadow-sm">
                {t("finalCta.title")}
              </h2>
              <p className="text-[#fcecdb] text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                {t("finalCta.description")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
              <button
                className="shimmer-btn relative bg-[#daa342] hover:bg-[#c9953d] text-[#171512] font-bold py-4 px-10 rounded-lg shadow-[0_10px_20px_-5px_rgba(218,163,66,0.4)] hover:shadow-xl transition-all transform hover:-translate-y-1 backdrop-blur-sm border border-[#f0c97d]/30 text-lg"
                type="button"
              >
                {t("finalCta.primaryCta")}
              </button>
              <button
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-10 rounded-lg backdrop-blur-md border border-white/20 hover:border-white/40 shadow-lg transition-all transform hover:-translate-y-1 text-lg"
                type="button"
              >
                {t("finalCta.secondaryCta")}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
