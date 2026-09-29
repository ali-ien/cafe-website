import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "surface" | "elevated" | "outline" | "ghost";
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "surface",
      hoverable = true,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      surface: "bg-alarak-navy border border-alarak-gold/15 text-alarak-cream",
      elevated: "bg-alarak-navy-light border border-alarak-gold/20 text-alarak-cream shadow-xl",
      outline: "bg-transparent border border-alarak-gold/30 text-alarak-cream",
      ghost: "bg-alarak-navy/40 border border-transparent text-alarak-cream",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-sm p-6 transition-all duration-300",
          variantStyles[variant],
          hoverable && "hover:border-alarak-gold/40 hover:shadow-[0_4px_25px_rgba(7,12,24,0.6)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "gold" | "navy" | "cream";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "gold", children, ...props }, ref) => {
    const variantStyles = {
      gold: "bg-alarak-gold/10 text-alarak-gold border-alarak-gold/30",
      navy: "bg-alarak-navy-light text-alarak-cream border-alarak-gold/20",
      cream: "bg-alarak-cream text-alarak-navy-dark border-transparent font-semibold",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-3 py-1 rounded-full text-[11px] font-sans font-medium uppercase tracking-[0.2em] border transition-colors",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Badge.displayName = "Badge";
