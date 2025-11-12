"use client";
import { motion, useInView, type Variants } from "framer-motion";
import * as React from "react";

export function TextFade({
  direction,
  children,
  className = "",
  staggerChildren = 0.1,
  delay = 0,
  inherit,
}: {
  direction: "up" | "down";
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
  delay?: number;
  inherit?: boolean;
  inView?: boolean;
}) {
  const FADE_DOWN: Variants = {
    visible: { opacity: 1, y: 0, transition: { type: "spring" } },
    hidden: { opacity: 0, y: direction === "down" ? -18 : 18 },
  };
  const isInViewRef = React.useRef(null);
  const internalInView = useInView(isInViewRef, { once: true });

  // If inherit is true, don't set initial/animate on this child so it inherits parent's variants and delayChildren/staggerChildren.
  const controlledByParent = !!inherit;

  return (
    <motion.div
      ref={isInViewRef}
      {...(controlledByParent
        ? {
            variants: {
              hidden: {},
              visible: { transition: { staggerChildren, delay } },
            },
          }
        : {
            initial: "hidden",
            animate: internalInView ? "visible" : "hidden",
            variants: {
              hidden: {},
              visible: { transition: { staggerChildren, delay } },
            },
          })}
      className={className}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? (
          <motion.div variants={FADE_DOWN}>{child}</motion.div>
        ) : (
          child
        )
      )}
    </motion.div>
  );
}
