<script lang="ts">
  import { Popover as PopoverPrimitive } from 'bits-ui';

  import { cn } from '@/utils/cn';
  import { flyAndScale } from '@/utils/flyAndScale';

  type $$Props = PopoverPrimitive.ContentProps;

  let className: $$Props['class'] = undefined;
  export let transition: $$Props['transition'] = flyAndScale;
  export let transitionConfig: $$Props['transitionConfig'] = undefined;
  export let align: $$Props['align'] = 'center';
  export let sideOffset: $$Props['sideOffset'] = 4;
  export { className as class };
</script>

<PopoverPrimitive.Content
  {transition}
  {transitionConfig}
  {align}
  {sideOffset}
  {...$$restProps}
  class={cn(
    'z-50 w-60 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 text-popover-foreground shadow-md outline-none',
    className
  )}
>
  <slot />
</PopoverPrimitive.Content>
