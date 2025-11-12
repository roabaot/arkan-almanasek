"use client";
import { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.pageYOffset > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 bg-primaryBlue text-white p-3 rounded-full shadow-lg transition-opacity duration-300 cursor-pointer z-[9999]"
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <IoIosArrowUp size={24} />
    </button>
  );
};

export default ScrollToTopButton;
