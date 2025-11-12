"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import { MdLanguage } from "react-icons/md";
import Container from "../common/Container";
import { menuItems } from "./MobileNavMenus";
import { IoClose } from "react-icons/io5";
import { cn } from "@/app/lib/utils";
import Image from "next/image";

const MobileSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const isContactPage = pathname === "/home-two";

  const [menuOpen, setMenuOpen] = useState(false);
  const [animateOverlay, setAnimateOverlay] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const openSidebar = () => {
    setMenuOpen(true);
    setTimeout(() => {
      setAnimateOverlay(true);
    }, 20);
    setTimeout(() => {
      setShowSidebar(true);
    }, 350);
  };

  const closeSidebar = useCallback(() => {
    setShowSidebar(false);
    setTimeout(() => {
      setAnimateOverlay(false);
    }, 100);
    setTimeout(() => {
      setMenuOpen(false);
    }, 400);
  }, []);

  const selectLanguage = useCallback(
    (newLocale: string) => {
      router.replace(pathname, { locale: newLocale });
      closeSidebar();
    },
    [pathname, router, closeSidebar]
  );

  const languages = [
    { code: "ar", name: t("languages.ar"), displayCode: "AR" },
    { code: "en", name: t("languages.en"), displayCode: "EN" },
  ];

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeSidebar(); // <-- ESLint warns about this
      }
    },
    [closeSidebar]
  );

  useEffect(() => {
    if (!menuOpen) return;

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, handleClickOutside]);

  return (
    <div className="w-full relative">
      <Container
        className={cn(
          "h-[60px] md:h-[80px] flex items-center justify-between px-2 absolute top-5 left-0 right-0 w-[95%] mx-auto z-50 rounded-[60px] bg-white/[.11] border border-white",
          { "bg-transparent border-primaryBlue": !isContactPage }
        )}
      >
        {/* logo */}
        <Link href="/" className="site-branding">
          {isContactPage ? (
            <>
              <Image
                src={"/logo.svg"}
                alt="logo"
                width={100}
                height={50}
                priority
                className="object-contain"
              />
            </>
          ) : (
            <>
              <Image
                src={"/logo.svg"}
                alt="logo"
                width={100}
                height={50}
                priority
                className="object-contain"
              />
            </>
          )}
        </Link>

        {/* menu icon */}
        <div onClick={openSidebar} className="cursor-pointer">
          <HiOutlineMenuAlt2
            className={`${
              isContactPage ? "text-white " : "text-primaryBlue"
            } text-[32px]`}
          />
        </div>
      </Container>

      {/* Sliding overlay and sidebar */}
      {menuOpen && (
        <div
          className={`fixed inset-0 z-50 transition-all duration-500 ${
            animateOverlay ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Full-screen overlay that slides in */}
          <div className="absolute inset-0 bg-black/50 transition-opacity duration-500"></div>

          {/* Sidebar */}
          <div
            ref={menuRef}
            className={`fixed top-0 left-0 w-[85%] h-full bg-[#0D121E] shadow-lg z-50 transition-transform duration-500 transform ${
              showSidebar ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Header */}
            <div className="p-4 relative">
              <Link href="/" onClick={closeSidebar}>
                <Image
                  src={"/assets/logo/logo-white.svg"}
                  alt="logo"
                  width={100}
                  height={50}
                  priority
                  className="object-contain"
                />
              </Link>

              <button
                className="w-10 h-10 rounded-full bg-primaryBlue text-white flex justify-center items-center absolute top-5 -right-4"
                onClick={closeSidebar}
              >
                <IoClose size={24} />
              </button>
            </div>

            {/* Menu */}
            <div className="px-4 mt-[40px] overflow-y-auto h-[calc(100%-150px)]">
              <nav>
                <ul className="flex flex-col gap-5">
                  {menuItems.map((item, index) => (
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
                              <IoIosArrowForward
                                className={`text-[18px] transition-transform duration-300 ${
                                  activeIndex === index ? "rotate-90" : ""
                                }`}
                              />
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
                                    onClick={closeSidebar}
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
                          onClick={closeSidebar}
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
                        <IoIosArrowForward
                          className={`text-[18px] transition-transform duration-300 ${
                            activeIndex === 999 ? "rotate-90" : ""
                          }`}
                        />
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
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileSidebar;
