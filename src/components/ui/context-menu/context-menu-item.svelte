<script lang="ts">
  import { cn } from "@/utils/cn";
  import { ContextMenu as ContextMenuPrimitive } from "bits-ui";

  let {
    ref = $bindable(null),
    class: className,
    inset,
    variant = "default",
    ...restProps
  }: ContextMenuPrimitive.ItemProps & {
    inset?: boolean;
    variant?: "default" | "destructive";
  } = $props();
</script>

<ContextMenuPrimitive.Item
  bind:ref
  data-slot="context-menu-item"
  data-inset={inset}
  data-variant={variant}
  class={cn(
    "relative flex cursor-default items-center gap-2.5 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-highlighted:bg-neutral-200 data-highlighted:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 data-[variant=destructive]:text-neutral-700 data-[variant=destructive]:data-highlighted:bg-neutral-100 data-[variant=destructive]:data-highlighted:text-neutral-700 dark:data-highlighted:bg-neutral-800 dark:data-highlighted:text-neutral-50 dark:data-[variant=destructive]:data-highlighted:bg-neutral-700 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-neutral-500 dark:[&_svg:not([class*='text-'])]:text-neutral-400 data-[variant=destructive]:*:[svg]:text-neutral-700",
    className,
  )}
  {...restProps}
/>
