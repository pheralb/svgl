<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui';
  import { cn } from '@/utils/cn';

  type $$Props = TabsPrimitive.ListProps;

  let className: $$Props['class'] = undefined;
  export { className as class };
</script>

<TabsPrimitive.List
  class={cn('inline-flex h-9 items-center justify-center space-x-1 rounded-lg', className)}
  {...$$restProps}
>
  <slot />
</TabsPrimitive.List>
