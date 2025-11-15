"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
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
}: Props) {
  // Wrap direct children so each child becomes an animating item.
  const mappedChildren = React.Children.map(children, (child) => (
    <motion.div variants={itemVariants} className="w-full">
      {child}
    </motion.div>
  ));

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      variants={containerVariants(stagger, delay)}
      className={className}
    >
      {mappedChildren}
    </motion.div>
  );
}
