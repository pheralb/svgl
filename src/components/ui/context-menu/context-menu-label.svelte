<script lang="ts">
  import { cn } from "@/utils/cn";
  import type { WithElementRef } from "@/types/components";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    class: className,
    inset,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    inset?: boolean;
  } = $props();
</script>

<div
  bind:this={ref}
  data-slot="context-menu-label"
  data-inset={inset}
  class={cn(
    "px-2 py-1.5 text-sm font-medium text-neutral-900 data-[inset]:pl-8 dark:text-neutral-100",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
