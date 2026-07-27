import { tv } from "tailwind-variants";

const buttonVariants = tv({
  base: "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 dark:focus-visible:ring-neutral-700",
  variants: {
    variant: {
      default:
        "bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/70",
      radial:
        "bg-radial-[at_52%_-52%] **:[text-shadow:0_1px_0_var(--color-neutral-950)] border-neutral-950 from-neutral-950/70 to-neutral-950/95 text-white inset-shadow-2xs inset-shadow-white/25 border text-sm shadow-md shadow-neutral-950/30 ring-0 transition-[filter] duration-200 hover:brightness-125 active:brightness-95 dark:bg-white dark:text-neutral-50 dark:shadow-none dark:border-0",
      destructive:
        "bg-red-500 text-neutral-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
      outline:
        "border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-none",
      secondary:
        "bg-neutral-100 text-neutral-900 shadow-sm hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80",
      ghost:
        "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
      link: "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50",
    },
    size: {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8",
      icon: "h-9 w-9",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export { buttonVariants };
