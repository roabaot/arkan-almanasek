"use client";

import { useEffect, useRef } from "react";

const LOOP_END = 25;
const REPLAY_AFTER_END = false;

export default function BackgroundTakbeer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let hasStarted = false;
    let hasStopped = false;

    const startAudio = () => {
      if (hasStarted) return;

      audio.currentTime = 0;

      audio
        .play()
        .then(() => {
          hasStarted = true;
          window.removeEventListener("pointerdown", startAudio);
        })
        .catch(() => {
          // لو فشل التشغيل، لا نحذف الـ listener
          // حتى يعيد المحاولة عند النقر مرة أخرى
        });
    };

    const handleTimeUpdate = () => {
      if (audio.currentTime >= LOOP_END && !hasStopped) {
        hasStopped = true;

        if (REPLAY_AFTER_END) {
          audio.currentTime = 0;
          audio.play();
        } else {
          audio.pause();
        }
      }
    };

    window.addEventListener("pointerdown", startAudio);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      window.removeEventListener("pointerdown", startAudio);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/audio/takbeer.mpeg"
      preload="auto"
      playsInline
    />
  );
}
