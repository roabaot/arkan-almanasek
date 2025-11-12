"use client";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

// Fixed floating WhatsApp chat button
// Opens WhatsApp with predefined phone number. Text left blank so user can type.
// Arabic locale will keep RTL direction automatically.
const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=966556332242&text&type=phone_number&app_absent=0";

export default function WhatsAppButton() {
  return (
    <Link
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed z-[9999] bottom-5 right-24 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-green-600/40 transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
    >
      <FaWhatsapp
        size={30}
        className="transition-transform group-hover:rotate-12"
      />
      <span className="sr-only">WhatsApp</span>
    </Link>
  );
}
