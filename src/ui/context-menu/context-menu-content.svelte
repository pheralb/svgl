<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from 'bits-ui';
  import { cn } from '@/utils/cn';
  import { flyAndScale } from '@/utils/flyAndScale';

  type $$Props = ContextMenuPrimitive.ContentProps;

  let className: $$Props['class'] = undefined;
  export let transition: $$Props['transition'] = flyAndScale;
  export let transitionConfig: $$Props['transitionConfig'] = undefined;
  export { className as class };
</script>

<ContextMenuPrimitive.Content
  {transition}
  {transitionConfig}
  class={cn(
    'bg-white dark:bg-neutral-900 text-popover-foreground z-50 min-w-[8rem] rounded-md border border-neutral-200 dark:border-neutral-800 p-1 shadow-md focus:outline-none',
    className
  )}
  {...$$restProps}
  on:keydown
>
  <slot />
</ContextMenuPrimitive.Content>
