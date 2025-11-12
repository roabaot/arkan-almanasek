"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../common/Button";
import MobileSidebar from "./MobileSidebar";
import Link from "next/link";
import Image from "next/image";
import NavMenuThree from "./NavMenuThree";

const NavbarThree = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // closeSidebar wrapped in useCallback
  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  // Sticky navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Outside click to close sidebar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen, closeSidebar]);

  return (
    <div>
      {/* Desktop Navbar */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 lg:block hidden  ${
          isSticky ? "bg-white animate-slideDown shadow-navbar-shadow" : ""
        }`}
      >
        <div
          className={`w-[95%] mx-auto relative rounded-[20px] ${
            isSticky ? "" : "absolute top-0 bg-transparent"
          }`}
        >
          <header className="w-full">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link href="/" className="site-branding">
                <Image
                  src={'/assets/logo/logo.svg'}
                  alt="logo"
                  className="w-full h-auto object-cover"
                    width={150}
                    height={50}
                  priority
                />
              </Link>

              {/* Navigation Menu */}
             

              {/* Actions */}
              <div className="flex items-center gap-7">
                 <div
              >
                <NavMenuThree />

              </div>
             <Button hoverBgColorClass="bg-primaryBlue" className="bg-white border border-primary text-secondaryColor hover:border-primaryBlue">Start a project</Button>
              </div>
            </div>
          </header>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden block">
        <MobileSidebar />
      </div>

    </div>
  );
};

export default NavbarThree;


