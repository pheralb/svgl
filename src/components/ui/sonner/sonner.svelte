<script lang="ts">
  import {
    Toaster as Sonner,
    type ToasterProps as SonnerProps,
  } from "svelte-sonner";

  import { cn } from "@/utils/cn";
  import { mode } from "mode-watcher";

  let { ...restProps }: SonnerProps = $props();
</script>

<Sonner
  theme={mode.current}
  position="bottom-center"
  toastOptions={{
    unstyled: true,
    classes: {
      toast: cn(
        "w-full max-w-md",
        "flex items-center gap-3 p-4 rounded-lg shadow-md font-sans",
        "bg-neutral-50 dark:bg-neutral-900",
        "border border-neutral-200 dark:border-neutral-800",
        "text-neutral-900 dark:text-neutral-100",
      ),
      title: "font-medium",
      description: "text-sm text-pretty text-neutral-600 dark:text-neutral-400",
    },
  }}
  {...restProps}
/>
