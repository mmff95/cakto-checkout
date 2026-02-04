"use client";

import { button } from "./Button.styles";
import type { ButtonProps } from "./Button.types";
import { Spinner } from "../Spinner";

export const Button = ({
  children,
  size = "medium",
  icon,
  fullWidth = false,
  loading = false,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={button({ size, fullWidth, className })}
      {...props}
      disabled={loading || disabled}
    >
      {loading ? (
        <span className="inline-flex items-center justify-center text-white">
          <Spinner size="medium" />
        </span>
      ) : (
        <>
          <span>{children}</span>
          {icon != null && <span className="inline-flex shrink-0" aria-hidden>{icon}</span>}
        </>
      )}
    </button>
  );
};
