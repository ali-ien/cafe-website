"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface EditorialRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  containerClassName?: string;
}

export const EditorialReveal: React.FC<EditorialRevealProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  className,
  containerClassName,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={cn(containerClassName)}>
      <motion.div
        initial={{
          opacity: 0,
          y: shouldReduceMotion ? 0 : 10,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: shouldReduceMotion ? 0.3 : duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={cn(className)}
      >
        {children}
      </motion.div>
    </div>
  );
};
