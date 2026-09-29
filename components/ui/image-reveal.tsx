"use client";

import * as React from "react";
import Image, { type ImageProps } from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ImageRevealProps extends Omit<ImageProps, "className"> {
  aspectRatio?: "portrait" | "landscape" | "square" | "wide" | "tall" | "auto";
  containerClassName?: string;
  imageClassName?: string;
  caption?: string;
  delay?: number;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  aspectRatio = "portrait",
  containerClassName,
  imageClassName,
  caption,
  delay = 0,
  fill = true,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  const aspectStyles = {
    portrait: "aspect-[4/5]",
    landscape: "aspect-[16/10]",
    square: "aspect-square",
    wide: "aspect-[21/9]",
    tall: "aspect-[3/4]",
    auto: "",
  };

  return (
    <figure className={cn("relative group w-full", containerClassName)}>
      <motion.div
        initial={{ opacity: 0, clipPath: shouldReduceMotion ? "inset(0% 0% 0% 0%)" : "inset(8% 0% 8% 0%)" }}
        whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: shouldReduceMotion ? 0.3 : 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "relative w-full overflow-hidden rounded-sm bg-alarak-navy border border-alarak-gold/20 shadow-xl transition-colors duration-500 group-hover:border-alarak-gold/40",
          aspectStyles[aspectRatio]
        )}
      >
        <motion.div
          initial={{ scale: shouldReduceMotion ? 1 : 1.06, opacity: 0.85 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: shouldReduceMotion ? 0.3 : 1.2, delay: delay + 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full"
        >
          <Image
            src={src}
            alt={alt}
            fill={fill}
            className={cn(
              "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]",
              imageClassName
            )}
            {...props}
          />
        </motion.div>

        {/* Subtle Warm Gradient Overlay on Hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-alarak-navy-dark/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
      </motion.div>

      {caption && (
        <figcaption className="mt-3 font-serif text-xs text-alarak-cream/75 tracking-wider italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
