<script lang="ts">
  import { Tabs as TabsPrimitive } from "bits-ui";
  import { cn } from "@/utils/cn";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: TabsPrimitive.TriggerProps = $props();
</script>

<TabsPrimitive.Trigger
  bind:ref
  data-slot="tabs-trigger"
  class={cn(
    "inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap ring-offset-white transition-all focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-neutral-200  data-[state=active]:text-neutral-950 data-[state=active]:shadow dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 dark:data-[state=active]:bg-neutral-800 dark:data-[state=active]:text-neutral-50",
    className,
  )}
  {...restProps}
/>
