<script lang="ts">
  import { cn } from "@/utils/cn";
  import type { WithElementRef } from "@/types/components";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {} = $props();
</script>

<div
  bind:this={ref}
  data-slot="select-label"
  class={cn(
    "px-2 py-1.5 text-xs text-neutral-600 dark:text-neutral-400",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
