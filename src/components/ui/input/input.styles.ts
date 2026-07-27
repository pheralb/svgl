import { cn } from "@/utils/cn";

export const inputStyles = cn(
  "flex h-9 w-full min-w-0 rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-neutral-900 selection:text-neutral-50 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:bg-neutral-200/30 dark:dark:bg-neutral-800/30 dark:selection:bg-neutral-50 dark:selection:text-neutral-900 dark:file:text-neutral-50 dark:placeholder:text-neutral-400",
  "focus-visible:border-neutral-950 focus-visible:ring-[3px] focus-visible:ring-neutral-950/50 dark:focus-visible:border-neutral-300 dark:focus-visible:ring-neutral-300/50",
  "aria-invalid:border-red-500 aria-invalid:ring-red-500/20 dark:aria-invalid:border-red-900 dark:aria-invalid:ring-red-900/20 dark:dark:aria-invalid:ring-red-900/40",
);
