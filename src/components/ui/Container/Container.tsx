"use client";

import { container } from "./Container.styles";
import type { ContainerProps } from "./Container.types";

export const Container = ({ children, className, ...props }: ContainerProps) => {
  return (
    <div className={container({ className })} {...props}>
      {children}
    </div>
  );
};
