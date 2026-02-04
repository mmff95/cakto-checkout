import type { ReactNode, InputHTMLAttributes } from "react";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label?: ReactNode;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  mask?: string;
  className?: string;
  inputClassName?: string;
}
