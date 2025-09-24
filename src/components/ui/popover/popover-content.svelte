<script lang="ts">
  import { cn } from "@/utils/cn";
  import { Popover as PopoverPrimitive } from "bits-ui";

  let {
    ref = $bindable(null),
    class: className,
    sideOffset = 4,
    align = "center",
    portalProps,
    ...restProps
  }: PopoverPrimitive.ContentProps & {
    portalProps?: PopoverPrimitive.PortalProps;
  } = $props();
</script>

<PopoverPrimitive.Portal {...portalProps}>
  <PopoverPrimitive.Content
    bind:ref
    data-slot="popover-content"
    {sideOffset}
    {align}
    class={cn(
      "z-50 w-auto max-w-96 origin-(--bits-popover-content-transform-origin) rounded-md border border-neutral-200 bg-white p-4 text-neutral-900 shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 md:max-w-[480px] dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50",
      className,
    )}
    {...restProps}
  />
</PopoverPrimitive.Portal>
