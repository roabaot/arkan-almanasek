"use client";

import { useEffect, useRef } from "react";

export default function BackgroundTakbeer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const startAudio = () => {
      audio.play().catch(() => {});
      window.removeEventListener("click", startAudio);
      window.removeEventListener("touchstart", startAudio);
    };

    // أول تفاعل من المستخدم
    window.addEventListener("click", startAudio);
    window.addEventListener("touchstart", startAudio);

    return () => {
      window.removeEventListener("click", startAudio);
      window.removeEventListener("touchstart", startAudio);
    };
  }, []);

  return <audio ref={audioRef} src="/audio/takbeer.mp3" loop preload="auto" />;
}
