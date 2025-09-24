<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "@/utils/cn";

  interface PageCardProps {
    children: Snippet;
    containerClass?: string;
    contentCardClass?: string;
  }

  let { children, contentCardClass, containerClass }: PageCardProps = $props();
</script>

<div class="p-[1px]">
  <div
    class={cn(
      "overflow-hidden",
      "rounded-md border border-neutral-200 dark:border-neutral-800",
      "bg-white dark:bg-neutral-900/40",
      "shadow-xs",
      containerClass,
    )}
  >
    <div
      class={cn(
        "max-h-[calc(100vh-4.5rem)] min-h-[calc(100vh-4.5rem)]",
        "overflow-hidden overflow-y-auto",
        contentCardClass,
      )}
    >
      {@render children?.()}
    </div>
  </div>
</div>
