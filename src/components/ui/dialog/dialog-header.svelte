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
  data-slot="dialog-header"
  class={cn("mb-2 flex flex-col gap-1 text-center sm:text-left", className)}
  {...restProps}
>
  {@render children?.()}
</div>
