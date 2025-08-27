<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "@/utils/cn";

  interface PageCardProps {
    children: Snippet;
  }

  let { children }: PageCardProps = $props();
</script>

<div
  class={cn(
    "mt-2.5 overflow-hidden",
    "rounded-md border border-neutral-200 dark:border-neutral-800",
    "bg-white dark:bg-neutral-900/40",
  )}
>
  <div
    class={cn(
      "max-h-[calc(100vh-8.6rem)] min-h-[calc(100vh-8.6rem)] overflow-y-auto",
    )}
  >
    {@render children?.()}
  </div>
</div>
