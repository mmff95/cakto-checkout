"use client";

import { radius } from "./Radius.styles";
import type { RadiusProps } from "./Radius.types";

export const Radius = ({
  children,
  variant = "inner",
  className,
  ...props
}: RadiusProps) => {
  return (
    <div className={radius({ variant, className })} {...props}>
      {children}
    </div>
  );
};
