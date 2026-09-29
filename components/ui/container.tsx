import * as React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "narrow" | "default" | "wide" | "full";
  padding?: "none" | "small" | "default" | "large";
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    { className, size = "default", padding = "default", children, ...props },
    ref
  ) => {
    const sizeStyles = {
      narrow: "max-w-4xl",
      default: "max-w-7xl",
      wide: "max-w-[1400px]",
      full: "max-w-full",
    };

    const paddingStyles = {
      none: "px-0",
      small: "px-4 sm:px-6",
      default: "px-4 sm:px-6 lg:px-8",
      large: "px-6 sm:px-10 lg:px-12",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full mx-auto",
          sizeStyles[size],
          paddingStyles[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";
