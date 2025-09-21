<script lang="ts">
  import type { WithoutChildrenOrChild } from "@/types/components";

  import { cn } from "@/utils/cn";
  import { Switch as SwitchPrimitive } from "bits-ui";

  let {
    ref = $bindable(null),
    class: className,
    checked = $bindable(false),
    ...restProps
  }: WithoutChildrenOrChild<SwitchPrimitive.RootProps> = $props();
</script>

<SwitchPrimitive.Root
  bind:ref
  bind:checked
  data-slot="switch"
  class={cn(
    "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-neutral-500 focus-visible:ring-[3px] focus-visible:ring-neutral-300/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-neutral-900 data-[state=unchecked]:bg-neutral-200 dark:focus-visible:ring-neutral-500/50 dark:data-[state=checked]:bg-neutral-100 dark:data-[state=unchecked]:bg-neutral-700",
    className,
  )}
  {...restProps}
>
  <SwitchPrimitive.Thumb
    data-slot="switch-thumb"
    class={cn(
      "pointer-events-none block size-4 rounded-full bg-white ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=checked]:bg-white data-[state=unchecked]:translate-x-0 dark:bg-neutral-900 dark:data-[state=checked]:bg-neutral-900",
    )}
  />
</SwitchPrimitive.Root>
