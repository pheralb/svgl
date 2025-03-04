<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui';
  import { cn } from '@/utils/cn';

  type $$Props = TabsPrimitive.ListProps;

  let className: $$Props['class'] = undefined;
  export { className as class };
</script>

<TabsPrimitive.List
  class={cn('mb-2 flex flex-wrap items-center justify-center rounded-lg', className)}
  {...$$restProps}
>
  <slot />
</TabsPrimitive.List>
