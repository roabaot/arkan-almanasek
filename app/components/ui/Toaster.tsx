"use client";

import { useMemo } from "react";
import { useLocale } from "next-intl";
import { ToastContainer, type ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type ToasterProps = Partial<ToastContainerProps>;

export default function Toaster(props: ToasterProps) {
  const locale = useLocale();
  const isRtl = useMemo(() => locale === "ar", [locale]);

  return (
    <ToastContainer
      position={isRtl ? "top-right" : "top-left"}
      rtl={isRtl}
      newestOnTop
      closeOnClick
      closeButton={false}
      pauseOnHover
      draggable
      autoClose={2500}
      hideProgressBar
      toastClassName={() =>
        [
          "rounded-xl border",
          "bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)]",
          "text-[var(--color-text-main)] dark:text-white",
          "border-black/10 dark:border-white/10",
          "shadow-[var(--shadow-soft)]",
          "px-3 py-2 font-medium",
          "cursor-pointer",
        ].join(" ")
      }
      {...props}
    />
  );
}
