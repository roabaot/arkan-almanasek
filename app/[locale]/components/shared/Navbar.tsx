"use client";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import Container from "../common/Container";
import Sidebar from "../common/Sidebar";
import Image from "next/image";
import NavMenu from "./NavMenu";
import { RxDashboard } from "react-icons/rx";
import { MdLanguage } from "react-icons/md";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import Drawer from "./Drawer";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();

  const [isSticky, setIsSticky] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  const selectLanguage = useCallback(
    (newLocale: string) => {
      router.replace(pathname, { locale: newLocale });
    },
    [pathname, router]
  );

  const languages = [
    { code: "ar", name: t("languages.ar"), displayCode: "AR" },
    { code: "en", name: t("languages.en"), displayCode: "EN" },
  ];

  return (
    <div>
      <motion.div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isSticky ? "bg-white animate-slideDown shadow-navbar-shadow" : ""
        }`}
        initial={{ y: -100, opacity: 0, filter: "blur(10px)" }}
        // animate values must be plain numbers/strings — transitions are specified
        // in the separate `transition` prop. To target a single property's
        // transition (opacity), provide a per-property transition object.
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{
          opacity: { duration: 1, delay: 1 },
          y: { duration: 1 },
          filter: { duration: 0.5, delay: 1 },
          type: "spring",
        }}
      >
        <Container
          className={`max-w-[calc(100%-16px)] mx-auto relative w-full lg:py-0 py-3 rounded-full  ${
            isSticky
              ? ""
              : "absolute top-5 bg-white shadow-navbar-shadow left-1/2 -translate-x-1/2 px-4 md:px-6 xl:px-7 2xl:px-7"
          }`}
        >
          <header className="w-full">
            <div className="flex justify-between items-center">
              {/* Branding */}
              <Link href="/" className="site-branding">
                <Image
                  src={"/logo.svg"}
                  alt="TailorFit Logo"
                  width={100}
                  height={40}
                  priority
                  className="w-full h-10 object-cover"
                />
              </Link>

              {/* Menu */}
              <div className="lg:block hidden">
                <NavMenu />
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-x-1.5">
                {/* Language Dropdown */}
                <div className="relative group cursor-pointer language-dropdown lg:block hidden">
                  <button className="w-15 h-15 rounded-full bg-white flex justify-center items-center hover:bg-primaryBlue hover:text-white duration-300 ease-in-out cursor-pointer">
                    <MdLanguage size={24} />
                  </button>

                  {/* Dropdown Menu - NavMenu Style */}
                  <ul className="absolute right-0 transform top-[140px] opacity-0 invisible transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:top-[75px] bg-white text-secondaryColor pb-5 shadow-lg rounded-md z-30 min-w-[220px]">
                    {languages.map((lang) => (
                      <li key={lang.code}>
                        <button
                          onClick={() => selectLanguage(lang.code)}
                          className={`nav-sub-menu w-full flex items-center justify-between ${
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

                <button
                  onClick={openSidebar}
                  className="w-15 h-15 rounded-full bg-white flex justify-center items-center hover:bg-primaryBlue hover:text-white duration-300 ease-in-out cursor-pointer"
                >
                  <RxDashboard size={24} />
                </button>

                <div className="lg:hidden block">
                  <button
                    onClick={() => setDrawerOpen(true)}
                    className="w-15 h-15 rounded-full bg-white flex justify-center items-center hover:bg-primaryBlue hover:text-white duration-300 ease-in-out cursor-pointer"
                  >
                    <HiOutlineMenuAlt2 size={28} />
                  </button>
                </div>
              </div>
            </div>
          </header>
        </Container>
      </motion.div>

      {/* Drawer Component */}
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
    </div>
  );
};

export default Navbar;
