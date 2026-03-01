"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import {
  RiArrowDownSLine,
  RiCloseLine,
  RiShoppingBag3Line,
} from "react-icons/ri";
import LanguageSwitcher from "./LanguageSwitcher";
import LogoHorizontal from "../ui/LogoHorizontal";
import { Link, usePathname } from "@/i18n/navigation";

type ServicesItem = {
  key: string;
  href: string;
  disabled: boolean;
};

export default function MobileNavDrawer({
  isOpen,
  onClose,
  servicesItems,
}: {
  isOpen: boolean;
  onClose: () => void;
  servicesItems: readonly ServicesItem[];
}) {
  const t = useTranslations("header");
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileServicesMenuOpen, setIsMobileServicesMenuOpen] =
    useState(false);

  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) setIsMobileServicesMenuOpen(false);
  }, [isOpen]);

  const isRtl = locale === "ar";
  const drawerSideClass = isRtl ? "right-0" : "left-0";
  const drawerClosedTransformClass = isRtl
    ? "translate-x-full"
    : "-translate-x-full";

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

  if (!isMounted) return null;

  return createPortal(
    <div
      className={
        "fixed inset-0 z-[100] md:hidden " +
        (isOpen ? "pointer-events-auto" : "pointer-events-none")
      }
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className={
          "absolute inset-0 bg-black/40 transition-opacity duration-200 " +
          (isOpen ? "opacity-100" : "opacity-0")
        }
        onClick={onClose}
        aria-label={t("mobile.closeMenu")}
      />

      <aside
        id="mobile-nav"
        className={
          `absolute top-0 ${drawerSideClass} h-full w-80 max-w-[85vw] bg-white shadow-xl transition-transform duration-200 dark:bg-[#0f1f0f] ` +
          (isOpen ? "translate-x-0" : drawerClosedTransformClass)
        }
        role="dialog"
        aria-modal="true"
        aria-label={t("mobile.navigation")}
      >
        <div className="flex h-20 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800 flex-row">
          <Link href="/" onClick={onClose}>
            <LogoHorizontal />
          </Link>
          <button
            type="button"
            className="flex items-center justify-center rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-background"
            onClick={onClose}
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
                <Link
                  href="/cart"
                  className="relative flex items-center justify-center rounded-xl border border-gray-200 bg-white p-2.5 text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-800 dark:bg-[#0f1f0f] dark:text-gray-200 dark:hover:bg-[#132813]"
                  aria-label={t("actions.cart")}
                  onClick={onClose}
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
              className={
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors dark:hover:bg-background " +
                (isRouteActive("/")
                  ? "bg-gray-100 text-secondary dark:bg-background"
                  : "text-gray-800 hover:bg-gray-100 hover:text-secondary dark:text-gray-100")
              }
              href="/"
              onClick={onClose}
              aria-current={isRouteActive("/") ? "page" : undefined}
            >
              {t("nav.home")}
            </Link>

            <div>
              <button
                type="button"
                className={
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors dark:hover:bg-background " +
                  (isServicesActive
                    ? "bg-gray-100 text-secondary dark:bg-background"
                    : "text-gray-700 hover:bg-gray-100 hover:text-secondary dark:text-gray-200")
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
                      className={
                        "rounded-lg px-3 py-2 text-sm font-medium transition-colors dark:hover:bg-background " +
                        (isRouteActive(item.href)
                          ? "bg-gray-100 text-secondary dark:bg-background"
                          : "text-gray-700 hover:bg-gray-100 hover:text-secondary dark:text-gray-200")
                      }
                      href={item.href}
                      onClick={onClose}
                      aria-current={
                        isRouteActive(item.href) ? "page" : undefined
                      }
                    >
                      {t(`services.items.${item.key}`)}
                    </Link>
                  ),
                )}
              </div>
            </div>

            <Link
              className={
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors dark:hover:bg-background " +
                (isRouteActive("/store")
                  ? "bg-gray-100 text-secondary dark:bg-background"
                  : "text-gray-700 hover:bg-gray-100 hover:text-secondary dark:text-gray-200")
              }
              href="/store"
              onClick={onClose}
              aria-current={isRouteActive("/store") ? "page" : undefined}
            >
              {t("nav.products")}
            </Link>

            <Link
              className={
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors dark:hover:bg-background " +
                (isRouteActive("/about-us", { exact: true })
                  ? "bg-gray-100 text-secondary dark:bg-background"
                  : "text-gray-700 hover:bg-gray-100 hover:text-secondary dark:text-gray-200")
              }
              href="/about-us"
              onClick={onClose}
              aria-current={
                isRouteActive("/about-us", { exact: true }) ? "page" : undefined
              }
            >
              {t("nav.about")}
            </Link>
          </nav>
        </div>
      </aside>
    </div>,
    document.body,
  );
}
