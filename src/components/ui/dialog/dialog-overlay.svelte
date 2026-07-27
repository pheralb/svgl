<script lang="ts">
  import { Dialog as DialogPrimitive } from "bits-ui";
  import { cn } from "@/utils/cn";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: DialogPrimitive.OverlayProps = $props();
</script>

<DialogPrimitive.Overlay
  bind:ref
  data-slot="dialog-overlay"
  class={cn(
    "fixed inset-0 z-50 bg-neutral-200/50 backdrop-blur-[4px] transition-opacity data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 dark:bg-neutral-900/50",
    className,
  )}
  {...restProps}
/>
