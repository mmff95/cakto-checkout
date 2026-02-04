import type { ReactNode, HTMLAttributes } from "react";

export type RadiusVariant = "card" | "inner" | "sm";

export interface RadiusProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: RadiusVariant;
}
