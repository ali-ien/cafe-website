"use client";

import * as React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SectionRevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  viewportAmount?: number;
  className?: string;
  staggerChildren?: number;
}

export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  viewportAmount = 0.18,
  className,
  staggerChildren,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : 12,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true, amount: viewportAmount }}
      transition={{
        duration: shouldReduceMotion ? 0.3 : duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren,
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};
