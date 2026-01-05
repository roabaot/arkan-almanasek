"use client";
import Link from "next/link";
import { MdMessage } from "react-icons/md";

export default function WhatsAppButton() {
  return (
    <Link
      href="/consultation?type=contact"
      className="group fixed z-[9999] bottom-36 ltr:right-6 rtl:left-6 flex items-center justify-center w-14 h-14 rounded-full bg-primaryBlue text-white shadow-lg shadow-blue-600/40 transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primaryBlue"
    >
      <MdMessage
        size={30}
        className="transition-transform group-hover:rotate-12"
      />
      <span className="sr-only">Contact</span>
    </Link>
  );
}
