"use client";

import { JSX } from "react";
import { typography } from "./Typography.styles";
import type { TypographyProps } from "./Typography.types";

const variantToElement: Record<
  NonNullable<TypographyProps["variant"]>,
  keyof JSX.IntrinsicElements
> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body: "p",
  bodySmall: "p",
  caption: "span",
  label: "span",
};

export const Typography = ({
  children,
  variant = "body",
  as,
  className,
  ...props
}: TypographyProps) => {
  const Component = as ?? variantToElement[variant];
  return (
    <Component className={typography({ variant, className })} {...props}>
      {children}
    </Component>
  );
};
