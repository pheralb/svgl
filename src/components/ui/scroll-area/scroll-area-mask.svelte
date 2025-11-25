<script lang="ts">
  import { cn } from "@/utils/cn";
  type Mask = {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  };

  let {
    showMask,
    maskHeight,
    class: className = "",
  }: {
    showMask: Mask;
    maskHeight: number;
    class?: string;
  } = $props();
</script>

<div
  aria-hidden="true"
  style={`--top-fade-height: ${showMask.top ? `${maskHeight}px` : "0px"}; --bottom-fade-height: ${showMask.bottom ? `${maskHeight}px` : "0px"};`}
  class={cn(
    "pointer-events-none absolute inset-0 z-10",
    "before:absolute before:inset-x-0 before:top-0 before:transition-[height,opacity] before:duration-300 before:content-['']",
    "after:absolute after:inset-x-0 after:bottom-0 after:transition-[height,opacity] after:duration-300 after:content-['']",
    "before:h-(--top-fade-height) after:h-(--bottom-fade-height)",
    showMask.top ? "before:opacity-100" : "before:opacity-0",
    showMask.bottom ? "after:opacity-100" : "after:opacity-0",
    "before:from-background before:bg-gradient-to-b before:to-transparent",
    "after:from-background after:bg-gradient-to-t after:to-transparent",
    className,
  )}
></div>
<div
  aria-hidden="true"
  style={`--left-fade-width: ${showMask.left ? `${maskHeight}px` : "0px"}; --right-fade-width: ${showMask.right ? `${maskHeight}px` : "0px"};`}
  class={cn(
    "pointer-events-none absolute inset-0 z-10",
    "before:absolute before:inset-y-0 before:left-0 before:transition-[width,opacity] before:duration-300 before:content-['']",
    "after:absolute after:inset-y-0 after:right-0 after:transition-[width,opacity] after:duration-300 after:content-['']",
    "before:w-(--left-fade-width) after:w-(--right-fade-width)",
    showMask.left ? "before:opacity-100" : "before:opacity-0",
    showMask.right ? "after:opacity-100" : "after:opacity-0",
    "before:from-background before:bg-gradient-to-r before:to-transparent",
    "after:from-background after:bg-gradient-to-l after:to-transparent",
    className,
  )}
></div>
