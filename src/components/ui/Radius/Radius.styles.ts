import { tv } from "tailwind-variants";

export const radius = tv({
  base: "overflow-hidden",
  variants: {
    variant: {
      card: "rounded-lg",
      inner: "rounded",
      sm: "rounded-md",
    },
  },
  defaultVariants: {
    variant: "inner",
  },
});
