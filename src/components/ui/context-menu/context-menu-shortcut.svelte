<script lang="ts">
  import { cn } from "@/utils/cn";
  import type { WithElementRef } from "bits-ui";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLSpanElement>> = $props();
</script>

<span
  bind:this={ref}
  data-slot="context-menu-shortcut"
  class={cn(
    "ml-auto text-xs tracking-widest text-neutral-400 dark:text-neutral-600",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</span>
