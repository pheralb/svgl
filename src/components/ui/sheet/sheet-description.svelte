<script lang="ts">
  import { Dialog as SheetPrimitive } from "bits-ui";
  import { cn } from "@/utils/cn";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: SheetPrimitive.DescriptionProps = $props();
</script>

<SheetPrimitive.Description
  bind:ref
  data-slot="sheet-description"
  class={cn("text-sm text-neutral-700 dark:text-neutral-300", className)}
  {...restProps}
/>
