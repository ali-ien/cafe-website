import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "cream";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2.5 rounded-sm font-sans font-medium uppercase tracking-widest transition-all duration-300 focus-ring cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none select-none";

    const variantStyles = {
      primary:
        "bg-alarak-gold text-alarak-navy-dark hover:bg-alarak-gold-light active:bg-alarak-gold-dark shadow-sm hover:shadow-[0_0_20px_rgba(197,160,89,0.3)]",
      secondary:
        "bg-alarak-navy text-alarak-cream border border-alarak-gold/30 hover:border-alarak-gold hover:bg-alarak-navy-light",
      outline:
        "bg-transparent text-alarak-cream border border-alarak-gold/40 hover:border-alarak-gold hover:bg-alarak-gold/10 hover:text-alarak-gold-light",
      ghost:
        "bg-transparent text-alarak-gold hover:bg-alarak-gold/10 hover:text-alarak-gold-light",
      cream:
        "bg-alarak-cream text-alarak-navy-dark hover:bg-alarak-cream-soft active:bg-alarak-gold-light",
    };

    const sizeStyles = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-xs md:text-sm",
      lg: "px-8 py-4 text-sm",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
        {icon && <span className="shrink-0">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
