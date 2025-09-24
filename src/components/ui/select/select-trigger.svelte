<script lang="ts">
  import type { WithoutChild } from "@/types/components";

  import { cn } from "@/utils/cn";
  import { Select as SelectPrimitive } from "bits-ui";
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";

  let {
    ref = $bindable(null),
    class: className,
    children,
    size = "default",
    ...restProps
  }: WithoutChild<SelectPrimitive.TriggerProps> & {
    size?: "sm" | "default";
  } = $props();
</script>

<SelectPrimitive.Trigger
  bind:ref
  data-slot="select-trigger"
  data-size={size}
  class={cn(className)}
  {...restProps}
>
  {@render children?.()}
  <ChevronDownIcon class="size-4 opacity-50" />
</SelectPrimitive.Trigger>
