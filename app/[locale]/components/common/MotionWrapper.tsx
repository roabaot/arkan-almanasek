"use client";
import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

type MotionWrapperProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  once?: boolean;
}>;

const MotionWrapper = ({
  children,
  className = "",
  delay = 0,
  once = true,
}: MotionWrapperProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20, scale: 0.995 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
