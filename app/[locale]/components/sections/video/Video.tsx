"use client"
import { useEffect, useRef, useCallback } from "react";

interface VideoProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Video = ({ setIsOpen }: VideoProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-all duration-300">
      <div
        ref={modalRef}
        className="relative w-[90%] max-w-3xl bg-white rounded-lg overflow-hidden shadow-xl transition-all duration-300"
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-white bg-primaryBlue rounded-full w-8 h-8 flex items-center justify-center z-10"
        >
          ✕
        </button>

        <iframe
          className="w-full aspect-video"
          src="https://www.youtube.com/embed/-oOoTIuoL8M?si=Fww3v6wTak3DYTC8&autoplay=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Video;
