<script lang="ts">
  import { Dialog as DialogPrimitive } from 'bits-ui';
  import * as Dialog from '@/ui/dialog';
  import { cn } from '@/utils/cn';

  import { X } from 'lucide-svelte';
  import { flyAndScale } from '@/utils/flyAndScale';

  type $$Props = DialogPrimitive.ContentProps;

  let className: $$Props['class'] = undefined;
  export let transition: $$Props['transition'] = flyAndScale;
  export let transitionConfig: $$Props['transitionConfig'] = {
    duration: 200
  };
  export { className as class };
</script>

<Dialog.Portal>
  <Dialog.Overlay />
  <DialogPrimitive.Content
    {transition}
    {transitionConfig}
    class={cn(
      'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 bg-white p-6 shadow-lg sm:rounded-lg md:w-full',
      className
    )}
    {...$$restProps}
  >
    <slot />
    <DialogPrimitive.Close
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
    >
      <X class="h-4 w-4" />
      <span class="sr-only">Close</span>
    </DialogPrimitive.Close>
  </DialogPrimitive.Content>
</Dialog.Portal>
