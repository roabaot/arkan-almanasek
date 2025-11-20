"use client";
import { useTranslations } from "next-intl";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState, useRef, ChangeEvent } from "react";

interface BlogSearchProps {
  onSearch?: (value: string) => void;
  initialValue?: string;
  delayMs?: number; // allow override of debounce duration
}

// Debounced blog search input. Calls onSearch after user stops typing for delayMs (default 500ms).
const BlogSearch = ({
  onSearch,
  initialValue = "",
  delayMs = 500,
}: BlogSearchProps) => {
  const t = useTranslations("blogs");
  const [value, setValue] = useState(initialValue);
  const [isComposing, setIsComposing] = useState(false); // Track IME composition (Arabic, etc.)
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle input change immediately (controlled component)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // Debounce effect
  useEffect(() => {
    if (!onSearch) return; // no callback, nothing to schedule
    if (isComposing) return; // wait until composition finishes to avoid partial queries
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onSearch(value.trim());
    }, delayMs);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value, onSearch, delayMs, isComposing]);

  return (
    <div className="bg-white shadow-navbar-shadow rounded-[10px] border-t border-primaryBorder md:p-10 p-7">
      <form
        className="relative"
        onSubmit={(e) => e.preventDefault()}
        role="search"
        aria-label={t("search")}
      >
        <input
          type="search"
          value={value}
          onChange={handleChange}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={(e) => {
            setIsComposing(false);
            // Ensure final composed value applied (especially for Arabic multi-char sequences)
            setValue(e.currentTarget.value);
          }}
          className="bg-[#F2F4F8] w-full rounded-[30px] ps-5 pe-14 h-[60px] text-[16px] border border-[#F2F4F8] text-secondaryColor font-primary outline-0 hover:border-primaryBlue focus:border-primaryBlue duration-300 ease-in-out"
          placeholder={t("search")}
          aria-label={t("search")}
        />
        <span>
          <IoSearchOutline className="pointer-events-none text-[24px] text-primaryBlue absolute top-5 ltr:right-5 rtl:left-5" />
        </span>
      </form>
    </div>
  );
};

export default BlogSearch;
