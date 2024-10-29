<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui';
  import { cn } from '@/utils/cn';

  type $$Props = TabsPrimitive.TriggerProps;
  type $$Events = TabsPrimitive.TriggerEvents;

  let className: $$Props['class'] = undefined;
  export let value: $$Props['value'];
  export { className as class };
</script>

<TabsPrimitive.Trigger
  class={cn(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium text-neutral-500 transition-all hover:bg-neutral-300/40 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-neutral-300/40 data-[state=active]:text-black data-[state=active]:shadow dark:text-neutral-400 dark:hover:bg-neutral-800/40 dark:hover:text-white dark:focus-visible:ring-neutral-800 dark:data-[state=active]:bg-neutral-800/40 dark:data-[state=active]:text-white',
    className
  )}
  {value}
  {...$$restProps}
  on:click
  on:keydown
  on:focus
>
  <slot />
</TabsPrimitive.Trigger>
