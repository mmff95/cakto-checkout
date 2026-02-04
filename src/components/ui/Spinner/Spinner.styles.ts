import { tv } from "tailwind-variants";

export const spinner = tv({
  base: [
    "inline-block animate-spin rounded-full border-2 border-current border-t-transparent",
  ],
  variants: {
    size: {
      small: "h-4 w-4",
      medium: "h-5 w-5",
      large: "h-6 w-6",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});
