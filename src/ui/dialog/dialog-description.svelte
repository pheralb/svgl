<script lang="ts">
  import { Dialog as DialogPrimitive } from 'bits-ui';
  import { cn } from '@/utils/cn';

  type $$Props = DialogPrimitive.DescriptionProps;

  let className: $$Props['class'] = undefined;
  export { className as class };
</script>

<DialogPrimitive.Description class={cn('text-sm opacity-70 mb-2', className)} {...$$restProps}>
  <slot />
</DialogPrimitive.Description>
