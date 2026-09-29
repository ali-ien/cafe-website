"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MotionRevealProps extends Omit<HTMLMotionProps<"div">, "direction"> {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  staggerChildren?: number;
}

export const MotionReveal: React.FC<MotionRevealProps> = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  once = true,
  className,
  staggerChildren,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  const getVariants = (): Variants => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2, delay } },
      };
    }

    const distance = 25;

    const directions = {
      up: { y: distance, x: 0 },
      down: { y: -distance, x: 0 },
      left: { x: distance, y: 0 },
      right: { x: -distance, y: 0 },
      fade: { x: 0, y: 0 },
      scale: { scale: 0.96, x: 0, y: 0 },
    };

    const initial = {
      opacity: 0,
      ...directions[direction],
    };

    return {
      hidden: initial,
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: "easeOut",
          staggerChildren,
        },
      },
    };
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      variants={getVariants()}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};
