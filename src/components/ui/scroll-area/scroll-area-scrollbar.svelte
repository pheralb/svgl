<script lang="ts">
  import type { WithoutChild } from "@/types/components";

  import { cn } from "@/utils/cn";
  import { ScrollArea as ScrollAreaPrimitive } from "bits-ui";
  import { useHasPrimaryTouch } from "@/hooks/use-has-primary-touch";

  let {
    ref = $bindable(null),
    class: className,
    orientation = "vertical",
    children,
    thumbClassName,
    ...restProps
  }: WithoutChild<ScrollAreaPrimitive.ScrollbarProps> & {
    thumbClassName?: string;
  } = $props();

  const hasPrimaryTouch = useHasPrimaryTouch();
</script>

{#if !$hasPrimaryTouch}
  <ScrollAreaPrimitive.Scrollbar
    bind:ref
    data-slot="scroll-area-scrollbar"
    {orientation}
    class={cn(
      "flex touch-none p-px transition-[colors] duration-150 select-none hover:bg-neutral-200 data-[state=hidden]:animate-out data-[state=hidden]:fade-out-0 data-[state=visible]:animate-in data-[state=visible]:fade-in-0 dark:hover:bg-neutral-900",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent px-1 pr-1.25",
      className,
    )}
    {...restProps}
  >
    {@render children?.()}
    <ScrollAreaPrimitive.Thumb
      data-slot="scroll-area-thumb"
      class={cn(
        "relative my-0.5 flex-1 rounded-full bg-neutral-300 transition-colors ease-out hover:bg-neutral-500/50 active:bg-neutral-500/75 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:active:bg-neutral-600",
        thumbClassName,
      )}
    />
  </ScrollAreaPrimitive.Scrollbar>
{/if}
