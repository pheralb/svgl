<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "@/utils/cn";

  interface PageHeaderProps {
    children: Snippet;
    className?: string;
  }

  let { children, className }: PageHeaderProps = $props();
</script>

<div
  class={cn(
    "sticky top-0 z-50 flex h-12.5 items-center justify-between py-1.5 pr-2 pl-3",
    "border-b border-neutral-200 dark:border-neutral-800",
    "bg-white/80 backdrop-blur-sm dark:bg-neutral-900/40",
    className,
  )}
>
  {@render children?.()}
</div>
