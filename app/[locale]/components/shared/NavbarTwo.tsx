"use client"
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../common/Button";
import { RxDashboard } from "react-icons/rx";
import NavMenuTwo from "./NavMenuTwo";
import { IoSearchOutline } from "react-icons/io5";
import MobileSidebar from "./MobileSidebar";
import Sidebar from "../common/Sidebar";
import Link from "next/link";
import Image from "next/image";

const NavbarTwo = () => {
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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 lg:block hidden ${
          isSticky ? "bg-secondaryColor animate-slideDown shadow" : ""
        }`}
      >
        <div
          className={`w-[95%] mx-auto relative rounded-[20px] ${
            isSticky ? "" : "absolute top-5 bg-transparent"
          }`}
        >
          <header className="w-full">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link href="/" className="site-branding">
                <Image
                  src={'/assets/logo/logo-white.svg'}
                  alt="logo"
                  width={150}
                  height={50}
                  priority
                  className="w-full h-auto object-cover"
                />
              </Link>

              {/* Navigation Menu */}
              <div
                className={`${
                  isSticky ? "" : "bg-white/[.11] px-[40px] rounded-[80px]"
                }`}
              >
                <NavMenuTwo />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-7">
                <IoSearchOutline
                  size={24}
                  className="text-white xl:block hidden"
                />
                <Button className="ml-5">Start Today</Button>
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="w-15 h-15 rounded-full bg-white flex justify-center items-center hover:bg-primaryBlue hover:text-white duration-300 ease-in-out cursor-pointer"
                >
                  <RxDashboard size={24} />
                </button>
              </div>
            </div>
          </header>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden block">
        <MobileSidebar />
      </div>

      {/* Sidebar Drawer */}
      <div ref={menuRef}>
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      </div>
    </div>
  );
};

export default NavbarTwo;
