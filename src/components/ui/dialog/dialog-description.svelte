<script lang="ts">
  import { Dialog as DialogPrimitive } from "bits-ui";
  import { cn } from "@/utils/cn";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: DialogPrimitive.DescriptionProps = $props();
</script>

<DialogPrimitive.Description
  bind:ref
  data-slot="dialog-description"
  class={cn("text-sm text-neutral-600 dark:text-neutral-400", className)}
  {...restProps}
/>
