"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface EditorialImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt: string;
  aspectRatio?: "portrait" | "landscape" | "square" | "wide" | "tall";
  frame?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  objectFit?: "cover" | "contain";
  caption?: string;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  aspectRatio = "portrait",
  frame = false,
  fill = true,
  width,
  height,
  priority = false,
  objectFit = "cover",
  caption,
  className,
  ...props
}) => {
  const aspectStyles = {
    portrait: "aspect-[4/5]",
    landscape: "aspect-[16/10]",
    square: "aspect-square",
    wide: "aspect-[21/9]",
    tall: "aspect-[3/4]",
  };

  return (
    <figure className={cn("relative group w-full overflow-hidden", className)} {...props}>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-sm bg-alarak-navy/80 border border-alarak-gold/15 transition-all duration-700 group-hover:border-alarak-gold/40",
          aspectStyles[aspectRatio]
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill={fill}
            width={!fill ? width : undefined}
            height={!fill ? height : undefined}
            priority={priority}
            className={cn(
              "transition-transform duration-700 ease-out group-hover:scale-[1.03]",
              objectFit === "cover" ? "object-cover" : "object-contain"
            )}
          />
        ) : (
          /* Editorial Placeholder Frame for Alarak Assets */
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-alarak-navy-light via-alarak-navy to-alarak-navy-dark">
            <div className="w-12 h-12 rounded-full border border-alarak-gold/30 flex items-center justify-center text-alarak-gold mb-3">
              <span className="font-serif text-lg">A</span>
            </div>
            <span className="font-serif text-sm tracking-widest text-alarak-gold/90 uppercase">
              Alarak Editorial Photo
            </span>
            <span className="font-sans text-xs text-alarak-cream/50 mt-1">
              {alt}
            </span>
          </div>
        )}

        {/* Subtle Gold Frame Accent */}
        {frame && (
          <div className="pointer-events-none absolute inset-3 border border-alarak-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}
      </div>

      {caption && (
        <figcaption className="mt-2.5 font-sans text-xs text-alarak-cream/60 tracking-wider">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
