<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "@/utils/cn";
  import ScrollArea from "./ui/scroll-area/scroll-area.svelte";
  import { ScrollAreaScrollbar } from "./ui/scroll-area";

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
    <ScrollArea
      maskHeight={50}
      maskClassName="before:from-transparent after:from-white dark:before:from-[#0f0f0f] dark:after:from-[#0f0f0f]"
      class={cn(
        "flex size-full max-h-[calc(100vh-4.5rem)] min-h-[calc(100vh-4.5rem)] flex-col",
        contentCardClass,
      )}
    >
      <ScrollAreaScrollbar orientation="vertical" class="relative z-99999" />
      {@render children?.()}
    </ScrollArea>
  </div>
</div>
