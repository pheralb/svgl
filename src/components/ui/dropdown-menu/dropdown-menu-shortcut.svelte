<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { WithElementRef } from "@/types/components";
  import { cn } from "@/utils/cn";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLSpanElement>> = $props();
</script>

<span
  bind:this={ref}
  data-slot="dropdown-menu-shortcut"
  class={cn(
    "ml-auto text-xs tracking-widest text-neutral-700 dark:text-neutral-300",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</span>
