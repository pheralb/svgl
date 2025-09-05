<script lang="ts">
  import { Dialog as SheetPrimitive } from "bits-ui";
  import { cn } from "@/utils/cn";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: SheetPrimitive.TitleProps = $props();
</script>

<SheetPrimitive.Title
  bind:ref
  data-slot="sheet-title"
  class={cn("font-semibold text-neutral-950 dark:text-neutral-50", className)}
  {...restProps}
/>
