<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from 'bits-ui';
  import { cn } from '@/utils/cn';

  type $$Props = ContextMenuPrimitive.ItemProps & {
    inset?: boolean;
  };
  type $$Events = ContextMenuPrimitive.ItemEvents;

  let className: $$Props['class'] = undefined;
  export let inset: $$Props['inset'] = undefined;
  export { className as class };
</script>

<ContextMenuPrimitive.Item
  class={cn(
    'data-[highlighted]:bg-neutral-100 dark:data-[highlighted]:bg-neutral-800 data-[highlighted]:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 space-x-2',
    inset && 'pl-8',
    className
  )}
  {...$$restProps}
  on:click
  on:keydown
  on:focusin
  on:focusout
  on:pointerdown
  on:pointerleave
  on:pointermove
>
  <slot />
</ContextMenuPrimitive.Item>
