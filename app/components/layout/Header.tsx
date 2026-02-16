"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import {
  RiArrowDownSLine,
  RiCloseLine,
  RiMenuLine,
  RiShoppingBag3Line,
  RiUser3Line,
} from "react-icons/ri";
import LanguageSwitcher from "./LanguageSwitcher";
import LogoHorizontal from "../ui/LogoHorizontal";
import { Link } from "@/i18n/navigation";

export default function Header() {
  const t = useTranslations("header");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isMobileServicesMenuOpen, setIsMobileServicesMenuOpen] =
    useState(false);
  const locale = useLocale();
  const servicesMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isServicesMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsServicesMenuOpen(false);
    };

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (servicesMenuRef.current?.contains(target)) return;
      setIsServicesMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [isServicesMenuOpen]);

  const isRtl = locale === "ar";
  const drawerSideClass = isRtl ? "right-0" : "left-0";
  const drawerClosedTransformClass = isRtl
    ? "translate-x-full"
    : "-translate-x-full";

  const servicesItems = useMemo(
    () =>
      [
        {
          key: "hadiAndUdhiyah",
          href: "/services/hadi-and-udhiyah",
          disabled: false,
        },
        { key: "badal", href: "/services/badal", disabled: false },
        { key: "permits", href: "/services/permits", disabled: false },
        {
          key: "consultations",
          href: "/services/consultations",
          disabled: true,
        },
        { key: "manasik", href: "/services/manasik", disabled: true },
      ] as const,
    [],
  );

  const mobileMenu =
    isMounted &&
    createPortal(
      <div
        className={
          "fixed inset-0 z-[100] md:hidden " +
          (isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none")
        }
        aria-hidden={!isMobileMenuOpen}
      >
        <button
          type="button"
          className={
            "absolute inset-0 bg-black/40 transition-opacity duration-200 " +
            (isMobileMenuOpen ? "opacity-100" : "opacity-0")
          }
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label={t("mobile.closeMenu")}
        />

        <aside
          id="mobile-nav"
          className={
            `absolute top-0 ${drawerSideClass} h-full w-80 max-w-[85vw] bg-white shadow-xl transition-transform duration-200 dark:bg-[#0f1f0f] ` +
            (isMobileMenuOpen ? "translate-x-0" : drawerClosedTransformClass)
          }
          role="dialog"
          aria-modal="true"
          aria-label={t("mobile.navigation")}
        >
          <div className="flex h-20 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800 flex-row">
            <Link href="/">
              <LogoHorizontal />
            </Link>
            <button
              type="button"
              className="flex items-center justify-center rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-background"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label={t("mobile.close")}
            >
              <RiCloseLine className="text-xl" />
            </button>
          </div>

          <div className="space-y-6 p-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-background">
              <div
                className={
                  "flex items-center justify-between gap-3 " +
                  (isRtl ? "flex-row-reverse" : "flex-row")
                }
              >
                <div className="shrink-0">
                  <LanguageSwitcher />
                </div>

                <div
                  className={
                    "flex items-center gap-2 " +
                    (isRtl ? "flex-row-reverse" : "flex-row")
                  }
                >
                  <button
                    type="button"
                    className="flex items-center justify-center rounded-xl border border-gray-200 bg-white p-2.5 text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-800 dark:bg-[#0f1f0f] dark:text-gray-200 dark:hover:bg-[#132813]"
                    aria-label={t("actions.account")}
                  >
                    <RiUser3Line className="text-lg" />
                  </button>
                  <Link
                    href="/cart"
                    className="relative flex items-center justify-center rounded-xl border border-gray-200 bg-white p-2.5 text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-800 dark:bg-[#0f1f0f] dark:text-gray-200 dark:hover:bg-[#132813]"
                    aria-label={t("actions.cart")}
                  >
                    <RiShoppingBag3Line className="text-lg" />
                    <span className="absolute right-2 top-2 size-2 rounded-full bg-[#d4af37]" />
                  </Link>
                </div>
              </div>
            </div>

            <nav
              className={
                "flex flex-col gap-2 " + (isRtl ? "text-right" : "text-left")
              }
            >
              <Link
                className="rounded-lg px-3 py-2 text-sm font-bold text-gray-800 transition-colors hover:bg-gray-100 hover:text-secondary dark:text-gray-100 dark:hover:bg-background"
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.home")}
              </Link>
              <div>
                <button
                  type="button"
                  className={
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-secondary dark:text-gray-200 dark:hover:bg-background "
                  }
                  onClick={() => setIsMobileServicesMenuOpen((open) => !open)}
                  aria-expanded={isMobileServicesMenuOpen}
                  aria-controls="mobile-services-submenu"
                >
                  <span>{t("nav.services")}</span>
                  <RiArrowDownSLine
                    className={
                      "text-lg transition-transform " +
                      (isMobileServicesMenuOpen ? "rotate-180" : "rotate-0")
                    }
                  />
                </button>

                <div
                  id="mobile-services-submenu"
                  className={
                    "mt-1 flex flex-col gap-1 " +
                    (isRtl ? "pr-3" : "pl-3") +
                    (isMobileServicesMenuOpen ? "" : " hidden")
                  }
                >
                  {servicesItems.map((item) =>
                    item.disabled ? (
                      <div
                        key={item.href}
                        className={
                          "rounded-lg px-3 py-2 text-sm text-gray-400 dark:text-gray-500 " +
                          (isRtl ? "text-right" : "text-left")
                        }
                        aria-disabled="true"
                      >
                        {t(`services.items.${item.key}`)}{" "}
                        <span className="text-xs">({t("soon")})</span>
                      </div>
                    ) : (
                      <Link
                        key={item.href}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-secondary dark:text-gray-200 dark:hover:bg-background"
                        href={item.href}
                        onClick={() => {
                          setIsMobileServicesMenuOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {t(`services.items.${item.key}`)}
                      </Link>
                    ),
                  )}
                </div>
              </div>
              <Link
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-secondary dark:text-gray-200 dark:hover:bg-background"
                href="/store"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.products")}
              </Link>
              <Link
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-secondary dark:text-gray-200 dark:hover:bg-background"
                href="/about-us"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.about")}
              </Link>
            </nav>
          </div>
        </aside>
      </div>,
      document.body,
    );

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[#f0f4f0] bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300 dark:border-[#2a3e2a] dark:bg-[#1a2e1a]/90">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-4">
            <div className="flex shrink-0 items-center gap-3">
              <Link href="/">
                <LogoHorizontal />
              </Link>
            </div>

            <div className="flex items-center gap-6">
              <nav className="hidden gap-8 md:flex">
                <Link
                  className="text-sm font-bold text-gray-700 transition-colors hover:text-secondary dark:text-gray-200"
                  href="/"
                >
                  {t("nav.home")}
                </Link>

                <div ref={servicesMenuRef} className="relative">
                  <button
                    type="button"
                    className={
                      "flex items-center gap-1 text-sm font-medium text-gray-600 transition-colors hover:text-secondary dark:text-gray-300 " +
                      (isRtl ? "flex-row-reverse" : "flex-row")
                    }
                    aria-haspopup="menu"
                    aria-expanded={isServicesMenuOpen}
                    onClick={() => setIsServicesMenuOpen((open) => !open)}
                  >
                    {t("nav.services")}
                    <RiArrowDownSLine className="text-lg" />
                  </button>

                  {isServicesMenuOpen ? (
                    <div
                      role="menu"
                      aria-label={t("services.menuAria")}
                      className={
                        "absolute z-50 mt-2 w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-[#0f1f0f] " +
                        (isRtl ? "right-0" : "left-0")
                      }
                    >
                      {servicesItems.map((item) =>
                        item.disabled ? (
                          <div
                            key={item.href}
                            role="menuitem"
                            aria-disabled="true"
                            className={
                              "flex cursor-not-allowed items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-400 dark:text-gray-500 " +
                              (isRtl ? "flex-row-reverse" : "flex-row")
                            }
                          >
                            <span>{t(`services.items.${item.key}`)}</span>
                            <span className="text-xs">{t("soon")}</span>
                          </div>
                        ) : (
                          <Link
                            key={item.href}
                            role="menuitem"
                            className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-secondary dark:text-gray-200 dark:hover:bg-[#132813]"
                            href={item.href}
                            onClick={() => setIsServicesMenuOpen(false)}
                          >
                            {t(`services.items.${item.key}`)}
                          </Link>
                        ),
                      )}
                    </div>
                  ) : null}
                </div>

                <Link
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-secondary dark:text-gray-300"
                  href="/store"
                >
                  {t("nav.products")}
                </Link>
                <Link
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-secondary dark:text-gray-300"
                  href="/about-us"
                >
                  {t("nav.about")}
                </Link>
              </nav>

              <div className="rtl:mr-2 ltr:ml-2 flex items-center gap-3 rtl:border-r ltr:border-l border-gray-200 rtl:pr-6 ltr:pl-6 dark:border-gray-700">
                <LanguageSwitcher />
                <button
                  type="button"
                  className="flex items-center justify-center rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-background"
                  aria-label={t("actions.account")}
                >
                  <RiUser3Line />
                </button>

                <Link
                  href="/cart"
                  className="relative flex items-center justify-center rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-background"
                  aria-label={t("actions.cart")}
                >
                  <RiShoppingBag3Line />
                  <span className="absolute right-1 top-1 size-2 rounded-full bg-[#d4af37]" />
                </Link>

                <button
                  type="button"
                  className="flex items-center justify-center rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-background md:hidden"
                  aria-label={t("mobile.menu")}
                  aria-controls="mobile-nav"
                  aria-expanded={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen((open) => !open)}
                >
                  <RiMenuLine />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      {mobileMenu}
    </>
  );
}
