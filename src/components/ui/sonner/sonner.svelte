<script lang="ts">
  import {
    Toaster as Sonner,
    type ToasterProps as SonnerProps,
  } from "svelte-sonner";
  import { mode } from "mode-watcher";

  let { ...restProps }: SonnerProps = $props();
</script>

<Sonner
  theme={mode.current}
  class="toaster group"
  toastOptions={{
    classes: {
      toast:
        "group toast dark:group-[.toaster]:bg-neutral-900 group-[.toaster]:font-sans",
      description: "group-[.toast]:text-xs font-mono",
    },
  }}
  {...restProps}
/>
