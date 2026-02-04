import { tv } from "tailwind-variants";

export const typography = tv({
  base: "text-foreground",
  variants: {
    variant: {
      h1: "text-4xl font-bold",
      h2: "text-3xl font-bold",
      h3: "text-2xl font-bold",
      h4: "text-xl font-bold",
      h5: "text-lg font-semibold",
      h6: "text-base font-semibold",
      body: "text-base",
      bodySmall: "text-sm",
      caption: "text-sm text-gray-500",
      label: "text-sm font-medium",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});
