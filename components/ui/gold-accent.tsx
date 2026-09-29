"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GoldAccentProps {
  variant?: "line" | "badge" | "dot";
  width?: string;
  delay?: number;
  className?: string;
  children?: React.ReactNode;
}

export const GoldAccent: React.FC<GoldAccentProps> = ({
  variant = "line",
  width = "w-16",
  delay = 0,
  className,
  children,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (variant === "line") {
    return (
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: shouldReduceMotion ? 0.2 : 0.65,
          delay,
          ease: "easeInOut",
        }}
        className={cn(
          "h-[1.5px] bg-gradient-to-r from-alarak-gold via-alarak-gold/80 to-transparent origin-left",
          width,
          className
        )}
      />
    );
  }

  if (variant === "dot") {
    return (
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay }}
        className={cn("inline-block w-1.5 h-1.5 rounded-full bg-alarak-gold", className)}
      />
    );
  }

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "font-sans text-[11px] uppercase tracking-[0.25em] text-alarak-gold font-medium",
        className
      )}
    >
      {children}
    </motion.span>
  );
};
