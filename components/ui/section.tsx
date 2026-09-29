import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  variant?: "navy-dark" | "navy" | "navy-light" | "cream";
  spacing?: "none" | "sm" | "md" | "lg";
  divider?: boolean;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      as: Component = "section",
      variant = "navy-dark",
      spacing = "md",
      divider = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      "navy-dark": "bg-alarak-navy-dark text-alarak-cream",
      navy: "bg-alarak-navy text-alarak-cream",
      "navy-light": "bg-alarak-navy-light text-alarak-cream",
      cream: "bg-alarak-cream text-alarak-navy-dark",
    };

    const spacingStyles = {
      none: "py-0",
      sm: "py-10 md:py-16",
      md: "py-16 md:py-24 lg:py-28",
      lg: "py-24 md:py-32 lg:py-40",
    };

    return (
      <Component
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden",
          variantStyles[variant],
          spacingStyles[spacing],
          divider && "border-t border-alarak-gold/20",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Section.displayName = "Section";
