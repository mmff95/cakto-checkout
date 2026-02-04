import type { HTMLAttributes } from "react";

export type SpinnerSize = "small" | "medium" | "large";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
}
