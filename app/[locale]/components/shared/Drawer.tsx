"use client";
import Image from "next/image";
import { useCallback, useRef, useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { menuItems, type MenuItem } from "./MobileNavMenus";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { MdLanguage } from "react-icons/md";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { AnimatePresence, motion, Variants } from "framer-motion";

type DrawerProps = {
  isOpen: boolean; // Controlled open state from parent
  onClose: () => void; // Callback to request close (parent should set isOpen to false)
};

const Drawer = ({ isOpen, onClose }: DrawerProps) => {
  // Accordion index
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const firstFocusableRef = useRef<HTMLButtonElement | null>(null);

  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const isRTL = locale === "ar";

  const languages = [
    { code: "ar", name: t("languages.ar"), displayCode: "AR" },
    { code: "en", name: t("languages.en"), displayCode: "EN" },
  ];

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Reset accordion when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setActiveIndex(null);
    }
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Focus first interactive element when opening
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        firstFocusableRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Local close handler (invokes parent onClose to flip isOpen)
  const requestClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const selectLanguage = useCallback(
    (newLocale: string) => {
      router.replace(pathname, { locale: newLocale });
      requestClose();
    },
    [pathname, router, requestClose]
  );

  // Framer Motion variants
  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5, transition: { duration: 0.35 } },
    exit: { opacity: 0, transition: { duration: 0.25 } },
  };

  const sidebarVariants: Variants = {
    hidden: { x: isRTL ? "100%" : "-100%" },
    visible: {
      x: 0,
      transition: { duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      x: isRTL ? "100%" : "-100%",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          aria-modal="true"
          role="dialog"
        >
          {/* Overlay */}
          <motion.button
            aria-label="Close menu"
            onClick={requestClose}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            className="absolute inset-0 bg-black cursor-pointer"
            style={{ outline: "none" }}
          />

          {/* Sidebar */}
          <motion.div
            ref={sidebarRef}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
            className={`fixed top-0 w-[85%] h-full bg-[#0D121E] shadow-lg z-50 flex flex-col ${
              isRTL ? "right-0" : "left-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 relative">
              <Link href="/" onClick={requestClose}>
                <Image
                  src={"/logo.svg"}
                  alt="logo"
                  width={100}
                  height={50}
                  priority
                  className="object-contain"
                />
              </Link>

              <button
                ref={firstFocusableRef}
                className={`w-10 h-10 rounded-full bg-primaryBlue text-white flex justify-center items-center absolute top-5 ${
                  isRTL ? "left-4" : "right-4"
                } focus:outline-none focus:ring-2 focus:ring-primaryBlue/70 `}
                onClick={requestClose}
              >
                <IoClose size={24} />
              </button>
            </div>

            {/* Menu */}
            <div className="px-4 mt-[40px] overflow-y-auto h-[calc(100%-150px)]">
              <nav>
                <ul className="flex flex-col gap-5">
                  {menuItems.map((item: MenuItem, index) => (
                    <li key={item.key}>
                      {"links" in item ? (
                        <>
                          <button
                            onClick={() => toggleIndex(index)}
                            className="w-full flex justify-between items-center text-white font-primary text-[18px] font-medium border-b-[.7px] border-primaryBorder/30 pb-5"
                          >
                            <span className="flex items-center gap-1">
                              {t(`common.${item.key}`)}
                            </span>
                            <span className="bg-primaryBlue w-8 h-8 rounded-sm flex justify-center items-center">
                              {isRTL ? (
                                <IoIosArrowBack
                                  className={`text-[18px] transition-transform duration-300 ${
                                    activeIndex === 999 ? "-rotate-90" : ""
                                  }`}
                                />
                              ) : (
                                <IoIosArrowForward
                                  className={`text-[18px] transition-transform duration-300 ${
                                    activeIndex === index ? "rotate-90" : ""
                                  }`}
                                />
                              )}
                            </span>
                          </button>

                          <div
                            className={`overflow-hidden transition-all duration-300 ${
                              activeIndex === index
                                ? "max-h-[500px]"
                                : "max-h-0"
                            }`}
                          >
                            <ul className="pl-4 py-2 flex flex-col gap-3 mt-2 font-primary text-white text-[16px]">
                              {item.links.map((link, i) => (
                                <li key={i}>
                                  <Link
                                    href={link.href}
                                    className="text-[16px]"
                                    onClick={requestClose}
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className="block text-white font-primary text-[18px] font-medium border-b-[.7px] border-primaryBorder/30 pb-5"
                          onClick={requestClose}
                        >
                          {t(`common.${item.key}`)}
                        </Link>
                      )}
                    </li>
                  ))}

                  {/* Language Switcher */}
                  <li>
                    <button
                      onClick={() => toggleIndex(999)}
                      className="w-full flex justify-between items-center text-white font-primary text-[18px] font-medium border-b-[.7px] border-primaryBorder/30 pb-5"
                    >
                      <span className="flex items-center gap-2">
                        <MdLanguage size={20} />
                        {t("common.language")}
                      </span>
                      <span className="bg-primaryBlue w-8 h-8 rounded-sm flex justify-center items-center">
                        {isRTL ? (
                          <IoIosArrowBack
                            className={`text-[18px] transition-transform duration-300 ${
                              activeIndex === 999 ? "-rotate-90" : ""
                            }`}
                          />
                        ) : (
                          <IoIosArrowForward
                            className={`text-[18px] transition-transform duration-300 ${
                              activeIndex === 999 ? "rotate-90" : ""
                            }`}
                          />
                        )}
                      </span>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        activeIndex === 999 ? "max-h-[500px]" : "max-h-0"
                      }`}
                    >
                      <ul className="pl-4 py-2 flex flex-col gap-3 mt-2 font-primary text-white text-[16px]">
                        {languages.map((lang) => (
                          <li key={lang.code}>
                            <button
                              onClick={() => selectLanguage(lang.code)}
                              className={`text-[16px] w-full text-left flex items-center justify-between ${
                                locale === lang.code ? "text-primaryBlue" : ""
                              }`}
                            >
                              <span>{lang.name}</span>
                              <span className="text-sm opacity-70">
                                {lang.displayCode}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
