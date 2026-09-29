import * as React from "react";
import { cn } from "@/lib/utils";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  children: React.ReactNode;
}

export const Display = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ as: Component = "h1", className, children, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        "font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.08] text-alarak-cream",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
);
Display.displayName = "Display";

export const Heading1 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ as: Component = "h1", className, children, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        "font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.12] text-alarak-cream",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
);
Heading1.displayName = "Heading1";

export const Heading2 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ as: Component = "h2", className, children, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        "font-serif text-2xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-[1.18] text-alarak-cream",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
);
Heading2.displayName = "Heading2";

export const Heading3 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ as: Component = "h3", className, children, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        "font-serif text-xl sm:text-2xl md:text-3xl font-medium tracking-normal leading-[1.25] text-alarak-cream",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
);
Heading3.displayName = "Heading3";

export const Eyebrow = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ as: Component = "p", className, children, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        "font-sans text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-alarak-gold",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
);
Eyebrow.displayName = "Eyebrow";

export const BodyLarge = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ as: Component = "p", className, children, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        "font-sans text-base md:text-lg leading-relaxed text-alarak-cream/85 font-light",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
);
BodyLarge.displayName = "BodyLarge";

export const Body = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ as: Component = "p", className, children, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        "font-sans text-sm md:text-base leading-relaxed text-alarak-cream/75 font-normal",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
);
Body.displayName = "Body";

export const SmallText = React.forwardRef<HTMLSpanElement, TypographyProps>(
  ({ as: Component = "span", className, children, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        "font-sans text-xs leading-normal text-alarak-cream/60",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
);
SmallText.displayName = "SmallText";

export const ArabicHeading = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ as: Component = "h2", className, children, ...props }, ref) => (
    <Component
      ref={ref}
      dir="rtl"
      className={cn(
        "font-arabic text-2xl sm:text-4xl md:text-5xl font-bold leading-snug text-alarak-gold-light",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
);
ArabicHeading.displayName = "ArabicHeading";

export const ArabicText = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ as: Component = "p", className, children, ...props }, ref) => (
    <Component
      ref={ref}
      dir="rtl"
      className={cn(
        "font-arabic text-base sm:text-lg leading-relaxed text-alarak-cream/85 font-normal",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
);
ArabicText.displayName = "ArabicText";
