"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export type VideoSectionProps = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  video?:
    | {
        kind: "html5";
        src?: string;
        posterSrc?: string;
        mimeType?: string;
      }
    | {
        kind: "iframe";
        src?: string;
        title?: string;
      }
    | {
        kind: "placeholder";
        posterSrc?: string;
      };
};

export default function VideoSection({
  eyebrow,
  heading,
  description,
  video = { kind: "placeholder" },
}: VideoSectionProps) {
  const t = useTranslations("home.video");

  const resolvedEyebrow = eyebrow ?? t("eyebrow");
  const resolvedHeading = heading ?? t("heading");
  const resolvedDescription = description ?? t("description");

  const containerRef = useRef<HTMLElement | null>(null);

  const isInView = useInView(containerRef, { once: true, amount: 0.35 });

  const videoMimeType =
    video.kind === "html5" ? (video.mimeType ?? "video/mp4") : undefined;

  return (
    <section
      ref={containerRef}
      aria-labelledby="home-video-section-heading"
      className="bg-[var(--color-background)] px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div
          className="relative overflow-hidden rounded-3xl bg-[var(--color-background)] shadow-[var(--shadow-soft)]"
          style={{ borderRadius: "1.5rem" }}
        >
          {/* Subtle ornamentation (Islamic-inspired) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-6 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[2px] border border-primary/40 bg-[var(--color-background)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 bottom-6 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 bottom-6 size-3 -translate-x-1/2 translate-y-1/2 rotate-45 rounded-[2px] border border-primary/30 bg-[var(--color-background)]"
          />

          <div className="flex flex-col items-center gap-8 p-8 md:gap-10 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="w-full max-w-3xl text-center"
            >
              {resolvedEyebrow ? (
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-[var(--color-surface-light)] px-4 py-2 text-sm font-semibold tracking-wide text-[var(--color-text-muted)]">
                  <span
                    className="size-1.5 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  <span>{resolvedEyebrow}</span>
                </div>
              ) : null}

              <h2
                id="home-video-section-heading"
                className="mb-4 text-3xl font-black leading-tight text-[var(--color-text-main)] md:text-4xl"
              >
                {resolvedHeading}
              </h2>

              <p className="max-w-xl mx-auto text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
                {resolvedDescription}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full max-w-5xl"
            >
              <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-2xl bg-[var(--color-surface-light)]">
                {/* Poster/placeholder layer */}
                <div className="pointer-events-none absolute inset-0 bg-[color-mix(in_srgb,var(--color-surface-light)_94%,transparent)]" />

                {video.kind === "iframe" ? (
                  isInView && video.src ? (
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={video.src}
                      title={video.title ?? t("iframeTitle")}
                      loading="lazy"
                      allow="autoplay; fullscreen"
                    />
                  ) : (
                    <div className="absolute inset-0" aria-hidden="true" />
                  )
                ) : video.kind === "html5" ? (
                  <video
                    className="absolute inset-0 h-full w-full"
                    controls
                    preload="none"
                    playsInline
                    poster={video.posterSrc}
                  >
                    {isInView && video.src ? (
                      <source src={video.src} type={videoMimeType} />
                    ) : null}
                    {t("html5Fallback")}
                  </video>
                ) : (
                  <div className="absolute inset-0" aria-hidden="true" />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
