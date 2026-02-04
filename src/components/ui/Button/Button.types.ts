import type { ReactNode, ButtonHTMLAttributes } from "react";

export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: ButtonSize;
  icon?: ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
}
