"use client";

import { separator } from "./Separator.styles";
import type { SeparatorProps } from "./Separator.types";

export const Separator = ({ className, ...props }: SeparatorProps) => {
  return <hr className={separator({ className })} {...props} />;
};
