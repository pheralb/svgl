<script lang="ts">
  import { cn } from "@/utils/cn";
  import { ContextMenu as ContextMenuPrimitive } from "bits-ui";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ContextMenuPrimitive.SeparatorProps = $props();
</script>

<ContextMenuPrimitive.Separator
  bind:ref
  data-slot="context-menu-separator"
  class={cn("-mx-1 my-1 h-px bg-neutral-200 dark:bg-neutral-800", className)}
  {...restProps}
/>
