import { tv } from "tailwind-variants";

export const button = tv({
  base: [
    "inline-flex items-center justify-center gap-2 rounded font-semibold uppercase cursor-pointer",
    "bg-primary text-white shadow-md shadow-black/20",
    "transition-all duration-150 hover:brightness-95 active:brightness-90 focus-visible:brightness-95 focus-visible:outline-none",
    "disabled:pointer-events-none disabled:opacity-50 disabled:brightness-100",
  ],
  variants: {
    size: {
      small: "px-4 py-2 text-sm gap-1.5 rounded-sm",
      medium: "px-6 py-3 text-base gap-2",
      large: "px-8 py-4 text-lg gap-2.5 rounded-sm",
    },
    fullWidth: {
      true: "w-full",
      false: "",
    },
  },
  defaultVariants: {
    size: "medium",
    fullWidth: false,
  },
});
