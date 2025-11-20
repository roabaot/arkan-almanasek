"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  /** If true (default), animate when scrolled into view. If false, animate immediately. */
  inView?: boolean;
  /** Only applies when inView=true: whether to animate only the first time. */
  once?: boolean;
  /** Only applies when inView=true: intersection threshold amount. */
  amount?: number;
  /** If false and inView=false, skip the initial hidden state (shows instantly). */
  animateInitial?: boolean;
};

const containerVariants = (stagger = 0.08, delay = 0) => {
  const v: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
  return v;
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function MotionContainer({
  children,
  className = "",
  delay = 0,
  stagger = 0.08,
  inView = true,
  once = true,
  amount = 0.35,
  animateInitial = true,
}: Props) {
  // Wrap direct children so each child becomes an animating item.
  const mappedChildren = React.Children.map(children, (child) => (
    <motion.div variants={itemVariants} className="w-full">
      {child}
    </motion.div>
  ));

  // Decide animation strategy based on inView flag
  const motionProps = inView
    ? {
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: { once, amount },
      }
    : {
        initial: animateInitial ? "hidden" : undefined,
        animate: "show" as const,
      };

  return (
    <motion.div
      {...motionProps}
      variants={containerVariants(stagger, delay)}
      className={className}
    >
      {mappedChildren}
    </motion.div>
  );
}
