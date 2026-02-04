"use client";

import { spinner } from "./Spinner.styles";
import type { SpinnerProps } from "./Spinner.types";

export const Spinner = ({ size = "medium", className, ...props }: SpinnerProps) => {
  return <span className={spinner({ size, className })} role="status" aria-label="Carregando" {...props} />;
};
