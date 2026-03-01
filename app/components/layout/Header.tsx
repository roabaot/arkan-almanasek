"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  RiArrowDownSLine,
  RiMenuLine,
  RiShoppingBag3Line,
} from "react-icons/ri";
import LanguageSwitcher from "./LanguageSwitcher";
import LogoHorizontal from "../ui/LogoHorizontal";
import { Link, usePathname } from "@/i18n/navigation";
import MobileNavDrawer from "./MobileNavDrawer";

export default function Header() {
  const t = useTranslations("header");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const servicesMenuRef = useRef<HTMLDivElement | null>(null);

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

  const isRouteActive = (href: string, options?: { exact?: boolean }) => {
    const exact = options?.exact ?? false;
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const isServicesActive = Boolean(
    pathname && pathname.startsWith("/services"),
  );

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
        // {
        //   key: "consultations",
        //   href: "/services/consultations",
        //   disabled: true,
        // },
        // { key: "manasik", href: "/services/manasik", disabled: true },
      ] as const,
    [],
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
                  className={
                    "text-sm transition-colors " +
                    (isRouteActive("/")
                      ? "font-medium text-secondary"
                      : "font-medium text-gray-700 hover:text-secondary dark:text-gray-200")
                  }
                  href="/"
                  aria-current={isRouteActive("/") ? "page" : undefined}
                >
                  {t("nav.home")}
                </Link>

                <div ref={servicesMenuRef} className="relative">
                  <button
                    type="button"
                    className={
                      "flex items-center gap-1 text-sm font-medium transition-colors " +
                      (isServicesActive
                        ? "text-secondary"
                        : "text-gray-600 hover:text-secondary dark:text-gray-300") +
                      " " +
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
                            className={
                              "block rounded-lg px-3 py-2 text-sm font-medium transition-colors " +
                              (isRouteActive(item.href)
                                ? "bg-gray-100 text-secondary dark:bg-[#132813]"
                                : "text-gray-700 hover:bg-gray-100 hover:text-secondary dark:text-gray-200 dark:hover:bg-[#132813]")
                            }
                            href={item.href}
                            onClick={() => setIsServicesMenuOpen(false)}
                            aria-current={
                              isRouteActive(item.href) ? "page" : undefined
                            }
                          >
                            {t(`services.items.${item.key}`)}
                          </Link>
                        ),
                      )}
                    </div>
                  ) : null}
                </div>

                <Link
                  className={
                    "text-sm font-medium transition-colors " +
                    (isRouteActive("/store")
                      ? "text-secondary"
                      : "text-gray-600 hover:text-secondary dark:text-gray-300")
                  }
                  href="/store"
                  aria-current={isRouteActive("/store") ? "page" : undefined}
                >
                  {t("nav.products")}
                </Link>
                <Link
                  className={
                    "text-sm font-medium transition-colors " +
                    (isRouteActive("/about-us", { exact: true })
                      ? "text-secondary"
                      : "text-gray-600 hover:text-secondary dark:text-gray-300")
                  }
                  href="/about-us"
                  aria-current={
                    isRouteActive("/about-us", { exact: true })
                      ? "page"
                      : undefined
                  }
                >
                  {t("nav.about")}
                </Link>
              </nav>

              <div className="rtl:mr-2 ltr:ml-2 flex items-center gap-3 rtl:border-r ltr:border-l border-gray-200 rtl:pr-6 ltr:pl-6 dark:border-gray-700">
                <LanguageSwitcher />
                {/* <button
                  type="button"
                  className="flex items-center justify-center rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-background"
                  aria-label={t("actions.account")}
                >
                  <RiUser3Line />
                </button> */}

                <Link
                  href="/cart"
                  className="relative flex items-center justify-center rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-background"
                  aria-label={t("actions.cart")}
                  aria-current={isRouteActive("/cart") ? "page" : undefined}
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
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        servicesItems={servicesItems}
      />
    </>
  );
}
