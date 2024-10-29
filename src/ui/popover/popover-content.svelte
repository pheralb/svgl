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
    'z-50 w-auto rounded-md border border-neutral-200 bg-white p-3 shadow-md outline-none dark:border-neutral-800 dark:bg-neutral-900',
    className
  )}
>
  <slot />
</PopoverPrimitive.Content>
