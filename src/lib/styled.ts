import React, { createElement } from "react";
import { cn } from "./utils";

type StyledElement = keyof React.JSX.IntrinsicElements;

export function styled(element: StyledElement, styles: Record<string, string>) {
  return function StyledComponent({
    className,
    ...props
  }: React.HTMLAttributes<HTMLElement>) {
    const baseStyles = Object.entries(styles)
      .map(([key, value]) => `${key}:${value}`)
      .join(" ");

    return createElement(element, {
      className: cn(baseStyles, className),
      ...props,
    });
  };
}
