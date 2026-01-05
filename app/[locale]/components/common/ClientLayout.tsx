"use client";

import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import Contact from "./Contact";

// Lazy load only interactive extras
const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });
const ScrollToTopButton = dynamic(() => import("./ScrollToTopButton"), {
  ssr: false,
});
const WhatsAppButton = dynamic(() => import("./WhatsAppButton"), {
  ssr: false,
});

export default function ClientLayout() {
  return (
    <>
      {/* Mount globally ONLY if really required */}
      <CustomCursor />
      <ScrollToTopButton />
      <Contact />
      {/* Offset WhatsApp button so it doesn't overlap scroll button (scroll is bottom-6 right-6) */}
      <div className="fixed flex flex-col gap-4 z-[9999] pointer-events-none">
        {/* Wrapper to stack buttons; each button re-enables pointer events */}
        <div className="pointer-events-auto">
          <WhatsAppButton />
        </div>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
}
