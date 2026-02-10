"use client";

import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { RiSendPlane2Line } from "react-icons/ri";
import LogoHorizontal from "../ui/LogoHorizontal";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white pb-8 pt-16 dark:border-gray-800 dark:bg-[#1a2e1a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid 2xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-12">
          <div className="md:col-span-1">
            <div className="mb-6 flex items-center gap-2">
              <LogoHorizontal />
            </div>

            <p className="mb-6 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {t("description")}
            </p>

            <div className="flex gap-4">
              <a
                className="text-gray-400 transition-colors hover:text-secondary"
                href="#"
                aria-label={t("social.x")}
              >
                <FaXTwitter className="text-xl" />
              </a>
              <a
                className="text-gray-400 transition-colors hover:text-secondary"
                href="#"
                aria-label={t("social.linkedin")}
              >
                <FaLinkedinIn className="text-xl" />
              </a>
              <a
                className="text-gray-400 transition-colors hover:text-secondary"
                href="#"
                aria-label={t("social.facebook")}
              >
                <FaFacebookF className="text-xl" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold text-[#111811] dark:text-white">
              {t("quickLinks.title")}
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-sm text-gray-500 transition-colors hover:text-secondary dark:text-gray-400"
                  href="/about-us"
                >
                  {t("quickLinks.about")}
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-gray-500 transition-colors hover:text-secondary dark:text-gray-400"
                  href="/store"
                >
                  {t("quickLinks.products")}
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-gray-500 transition-colors hover:text-secondary dark:text-gray-400"
                  href="#"
                >
                  {t("quickLinks.blog")}
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-gray-500 transition-colors hover:text-secondary dark:text-gray-400"
                  href="#"
                >
                  {t("quickLinks.privacyPolicy")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold text-[#111811] dark:text-white">
              {t("support.title")}
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-sm text-gray-500 transition-colors hover:text-secondary dark:text-gray-400"
                  href="#"
                >
                  {t("support.helpCenter")}
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-gray-500 transition-colors hover:text-secondary dark:text-gray-400"
                  href="/FAQ"
                >
                  {t("support.faq")}
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-gray-500 transition-colors hover:text-secondary dark:text-gray-400"
                  href="#"
                >
                  {t("support.trackOrder")}
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-gray-500 transition-colors hover:text-secondary dark:text-gray-400"
                  href="/contact-us"
                >
                  {t("support.contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold text-[#111811] dark:text-white">
              {t("newsletter.title")}
            </h4>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              {t("newsletter.description")}
            </p>

            <form
              className="flex gap-2"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:border-secondary focus:outline-none dark:border-gray-700 dark:bg-[#233523]"
                placeholder={t("newsletter.emailPlaceholder")}
                type="email"
                inputMode="email"
                autoComplete="email"
              />
              <button
                type="submit"
                className="rounded-lg bg-secondary px-4 py-2 text-white cursor-pointer transition-colors hover:bg-secondary/90"
                aria-label={t("newsletter.submitAria")}
              >
                <RiSendPlane2Line className="text-lg" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 text-center dark:border-gray-800">
          <p className="text-sm text-gray-400">
            {t("copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
