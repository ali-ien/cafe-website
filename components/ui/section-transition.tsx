"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: "navy-to-cream" | "cream-to-navy" | "navy-to-dark" | "dark-to-navy";
  height?: "sm" | "md" | "lg";
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  mode = "navy-to-cream",
  height = "md",
  className,
  ...props
}) => {
  const heightStyles = {
    sm: "h-16 sm:h-24",
    md: "h-24 sm:h-36",
    lg: "h-36 sm:h-48",
  };

  const gradientStyles = {
    "navy-to-cream":
      "bg-gradient-to-b from-[#070C1E] via-[#0E1733] via-[#EAE3D5] to-[#FDFBF7]",
    "cream-to-navy":
      "bg-gradient-to-b from-[#FDFBF7] via-[#EAE3D5] via-[#0E1733] to-[#070C1E]",
    "navy-to-dark":
      "bg-gradient-to-b from-[#070C1E] via-[#0A1026] to-[#050814]",
    "dark-to-navy":
      "bg-gradient-to-b from-[#050814] via-[#0A1026] to-[#070C1E]",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative w-full pointer-events-none select-none z-10",
        heightStyles[height],
        gradientStyles[mode],
        className
      )}
      {...props}
    />
  );
};
