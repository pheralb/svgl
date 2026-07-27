import { tv } from "tailwind-variants";

const badgeVariants = tv({
  base: "inline-flex items-center cursor-default gap-1.5 font-medium rounded-full border transition-colors hover:text-black dark:hover:text-white ease-in-out",
  variants: {
    variant: {
      default:
        "bg-neutral-100 text-neutral-800 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700",
      primary:
        "bg-neutral-800 text-neutral-50 border-neutral-700 dark:bg-neutral-700 dark:text-neutral-50 dark:border-neutral-600",
      secondary:
        "bg-neutral-200 text-neutral-700 border-neutral-300 dark:bg-neutral-700 dark:text-neutral-200 dark:border-neutral-600",
      success:
        "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800",
      warning:
        "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900 dark:text-amber-100 dark:border-amber-800",
      danger:
        "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-800",
      outline:
        "bg-transparent border border-neutral-300 text-neutral-700 dark:border-neutral-800 dark:text-neutral-400",
    },
    size: {
      sm: "text-xs px-2 py-0.5",
      md: "text-sm px-2.5 py-0.5",
      lg: "text-base px-3 py-1",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  },
});

export { badgeVariants };
