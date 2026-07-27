import { cn } from "@/utils/cn";

export const sidebarItemClasses = {
  base: cn(
    "rounded-md px-2 py-1.5 h-8",
    "flex w-full items-center justify-between space-x-3 text-sm",
    "text-neutral-600 dark:text-neutral-400",
    "hover:text-black dark:hover:text-white",
  ),
  active: cn(
    "rounded-lg shadow-sm text-black dark:text-white border border-neutral-200 bg-white font-medium dark:border-neutral-800 dark:bg-neutral-800",
  ),
};
