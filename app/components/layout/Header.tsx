import Link from "next/link";
import { FaMosque } from "react-icons/fa6";
import {
  RiMenuLine,
  RiSearchLine,
  RiShoppingBag3Line,
  RiUser3Line,
} from "react-icons/ri";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#f0f4f0] bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300 dark:border-[#2a3e2a] dark:bg-[#1a2e1a]/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <div className="flex shrink-0 items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-[#14b814]/10 text-[#14b814]">
              <FaMosque className="text-3xl" />
            </div>
            <Link
              href="#"
              className="text-2xl font-black tracking-tight text-[#111811] dark:text-white"
            >
              مناسك الحج
            </Link>
          </div>

          <div className="mx-8 hidden max-w-lg flex-1 md:flex">
            <div className="group relative w-full">
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition-colors group-focus-within:text-[#14b814]">
                <RiSearchLine />
              </div>
              <input
                className="block w-full rounded-lg border border-gray-200 bg-[#f9fbf9] p-2.5 pr-10 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#14b814] focus:ring-[#14b814] dark:border-gray-700 dark:bg-[#233523] dark:text-white dark:placeholder:text-gray-400"
                placeholder="ابحث عن المنتجات أو الخدمات..."
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden gap-8 lg:flex">
              <a
                className="text-sm font-bold text-gray-700 transition-colors hover:text-[#14b814] dark:text-gray-200"
                href="#"
              >
                الرئيسية
              </a>
              <a
                className="text-sm font-medium text-gray-600 transition-colors hover:text-[#14b814] dark:text-gray-300"
                href="#services"
              >
                الخدمات
              </a>
              <a
                className="text-sm font-medium text-gray-600 transition-colors hover:text-[#14b814] dark:text-gray-300"
                href="#products"
              >
                المنتجات
              </a>
              <a
                className="text-sm font-medium text-gray-600 transition-colors hover:text-[#14b814] dark:text-gray-300"
                href="#"
              >
                من نحن
              </a>
            </nav>

            <div className="mr-2 flex items-center gap-3 border-r border-gray-200 pr-6 dark:border-gray-700">
              <button
                type="button"
                className="flex items-center justify-center rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#233523]"
                aria-label="الحساب"
              >
                <RiUser3Line />
              </button>

              <button
                type="button"
                className="relative flex items-center justify-center rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#233523]"
                aria-label="السلة"
              >
                <RiShoppingBag3Line />
                <span className="absolute right-1 top-1 size-2 rounded-full bg-[#d4af37]" />
              </button>

              <button
                type="button"
                className="flex items-center justify-center rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#233523] md:hidden"
                aria-label="القائمة"
              >
                <RiMenuLine />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
