"use client";
import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/app/lib/utils";
import { useTranslations } from "next-intl";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const t = useTranslations();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Memoized event handler to avoid re-creation on each render
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup on unmount or when isOpen changes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={cn(
          "fixed top-0 right-0 h-full w-[85%] max-w-[400px] bg-white shadow-lg z-50 transform transition-transform duration-500 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-10">
          <Image
            src={"/logo.svg"}
            className="w-[150px] h-auto"
            alt="putech logo"
            width={100}
            height={50}
            priority
          />
          <p className="mt-10">{t("sidebar.tagline")}</p>

          <h3 className="mt-6 text-xl font-semibold">
            {t("sidebar.contact_title")}
          </h3>
          <div className="space-y-6 mt-6">
            {/* Email */}
            <div>
              <h4 className="text-base font-semibold mb-1">
                {t("sidebar.email_label")}
              </h4>
              <a href="mailto:info@macs.com.sa">info@macs.com.sa</a>
            </div>

            {/* Phone */}
            <div>
              <h4 className="text-base font-semibold mb-1 [unicode-bidi:plaintext]">
                {t("sidebar.phone_label")}
              </h4>
              <a href="tel:+966556332242">+966556332242</a>
            </div>
          </div>

          <h3 className="mt-6 text-lg font-semibold">
            {t("sidebar.location_title")}
          </h3>
          {/* Location */}
          <div>
            <h4 className="font-semibold mb-1"></h4>
            <p>{t("sidebar.address_value")}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
