<script lang="ts">
  import type { WithoutChild } from "@/types/components";

  import { cn } from "@/utils/cn";
  import { useHasPrimaryTouch } from "@/hooks/use-has-primary-touch";

  import { Scrollbar } from "./index.js";
  import ScrollAreaMask from "./scroll-area-mask.svelte";
  import { ScrollArea as ScrollAreaPrimitive } from "bits-ui";

  type Mask = {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  };

  let {
    ref = $bindable(null),
    class: className,
    orientation = "vertical",
    scrollbarXClasses = "",
    scrollbarYClasses = "",
    children,
    scrollHideDelay = 0,
    maskHeight = 30,
    maskClassName = "",
    viewportClassName = "",
    ...restProps
  }: WithoutChild<ScrollAreaPrimitive.RootProps> & {
    orientation?: "vertical" | "horizontal" | "both" | undefined;
    scrollbarXClasses?: string | undefined;
    scrollbarYClasses?: string | undefined;
    maskHeight?: number;
    maskClassName?: string;
    viewportClassName?: string;
  } = $props();

  let viewportRef: HTMLDivElement | null = $state(null);
  const showMask = $state<Mask>({
    top: true,
    bottom: true,
    left: true,
    right: true,
  });

  const hasPrimaryTouchStore = useHasPrimaryTouch();

  const checkScrollability = () => {
    const element = viewportRef;
    if (!element) {
      return;
    }

    const {
      scrollTop,
      scrollLeft,
      scrollWidth,
      clientWidth,
      scrollHeight,
      clientHeight,
    } = element;

    showMask.top = scrollTop > 0;
    showMask.bottom = scrollTop + clientHeight < scrollHeight - 1;
    showMask.left = scrollLeft > 0;
    showMask.right = scrollLeft + clientWidth < scrollWidth - 1;
  };

  $effect(() => {
    const element = viewportRef;
    if (!element) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const resizeObserver = new ResizeObserver(checkScrollability);
    resizeObserver.observe(element);

    element.addEventListener("scroll", checkScrollability, { signal });
    window.addEventListener("resize", checkScrollability, { signal });

    checkScrollability();

    return () => {
      controller.abort();
      resizeObserver.disconnect();
    };
  });
</script>

{#if $hasPrimaryTouchStore}
  <div
    bind:this={ref}
    role="group"
    data-slot="scroll-area"
    aria-roledescription="scroll area"
    class={cn("relative overflow-hidden", className)}
    {...restProps}
  >
    <div
      bind:this={viewportRef}
      data-slot="scroll-area-viewport"
      class={cn("size-full overflow-auto rounded-[inherit]", viewportClassName)}
      tabIndex={0}
    >
      {@render children?.()}
    </div>

    {#if maskHeight > 0}
      <ScrollAreaMask {showMask} class={maskClassName} {maskHeight} />{/if}
  </div>
{:else}
  <ScrollAreaPrimitive.Root
    bind:ref
    {scrollHideDelay}
    data-slot="scroll-area"
    class={cn("relative", className)}
    {...restProps}
  >
    <ScrollAreaPrimitive.Viewport
      bind:ref={viewportRef}
      data-slot="scroll-area-viewport"
      class={cn("focus-ring size-full rounded-[inherit]", viewportClassName)}
    >
      {@render children?.()}
    </ScrollAreaPrimitive.Viewport>

    {#if maskHeight > 0}
      <ScrollAreaMask {maskHeight} class={maskClassName} {showMask} />
    {/if}

    {#if orientation === "vertical" || orientation === "both"}
      <Scrollbar orientation="vertical" class={scrollbarYClasses} />
    {/if}

    {#if orientation === "horizontal" || orientation === "both"}
      <Scrollbar orientation="horizontal" class={scrollbarXClasses} />
    {/if}
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
{/if}
