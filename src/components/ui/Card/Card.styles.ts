import { tv } from "tailwind-variants";

export const card = tv({
  base: [
    "rounded-lg bg-white p-4 shadow shadow-black/10",
  ],
});

export const cardHeader = tv({
  base: [
    "mb-3",
  ],
});

export const cardContent = tv({
  base: [
    "text-base text-gray-600",
  ],
});
