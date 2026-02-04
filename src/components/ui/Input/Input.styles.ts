import { tv } from "tailwind-variants";

export const inputWrapper = tv({
  base: [
    "relative rounded border bg-white",
    "focus-within:ring-1",
  ],
  variants: {
    error: {
      true: "border-red-500 focus-within:border-red-500 focus-within:ring-red-500",
      false: "border-gray-300 focus-within:border-primary focus-within:ring-primary",
    },
  },
  defaultVariants: {
    error: false,
  },
});

export const inputLabel = tv({
  base: [
    "absolute left-3 top-0 -translate-y-1/2 px-2 text-sm font-medium text-gray-600",
    "bg-white cursor-text",
  ],
});

export const input = tv({
  base: [
    "w-full border-0 bg-transparent py-3 pl-3 pr-4 text-base text-foreground",
    "placeholder:text-gray-400 outline-none",
  ],
});

export const inputErrorMessage = tv({
  base: ["mt-1.5 text-sm text-red-500"],
});
