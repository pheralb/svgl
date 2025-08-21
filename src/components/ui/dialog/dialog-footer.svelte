<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { WithElementRef } from "@/types/components";
  import { cn } from "@/utils/cn";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  data-slot="dialog-footer"
  class={cn(
    "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
