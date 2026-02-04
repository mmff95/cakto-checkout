"use client";

import { button } from "./Button.styles";
import type { ButtonProps } from "./Button.types";

export const Button = ({
  children,
  size = "medium",
  icon,
  fullWidth = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button className={button({ size, fullWidth, className })} {...props}>
      <span>{children}</span>
      {icon && <span className="inline-flex shrink-0" aria-hidden>{icon}</span>}
    </button>
  );
};
