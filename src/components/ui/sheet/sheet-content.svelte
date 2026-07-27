<script lang="ts">
  import type { Snippet } from "svelte";
  import type { WithoutChildrenOrChild } from "@/types/components";

  import SheetOverlay from "./sheet-overlay.svelte";
  import { sheetVariants, type Side } from "./sheet.variants";

  import { cn } from "@/utils/cn";
  import { Dialog as SheetPrimitive } from "bits-ui";
  import XIcon from "@lucide/svelte/icons/x";

  let {
    ref = $bindable(null),
    class: className,
    side = "right",
    portalProps,
    children,
    ...restProps
  }: WithoutChildrenOrChild<SheetPrimitive.ContentProps> & {
    portalProps?: SheetPrimitive.PortalProps;
    side?: Side;
    children: Snippet;
  } = $props();
</script>

<SheetPrimitive.Portal {...portalProps}>
  <SheetOverlay />
  <SheetPrimitive.Content
    bind:ref
    data-slot="sheet-content"
    class={cn(sheetVariants({ side }), className)}
    {...restProps}
  >
    {@render children?.()}
    <SheetPrimitive.Close
      class={cn(
        "ring-offset-neutral-300 focus-visible:ring-neutral-300 dark:ring-offset-neutral-700 dark:focus-visible:ring-neutral-700",
        "absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none",
      )}
    >
      <XIcon class="size-4" />
      <span class="sr-only">Close</span>
    </SheetPrimitive.Close>
  </SheetPrimitive.Content>
</SheetPrimitive.Portal>
