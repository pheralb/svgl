<script lang="ts">
  import type { Extension } from "@/types/extensions";

  import { cn } from "@/utils/cn";
  import { buttonVariants } from "@/components/ui/button";
  import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";

  interface ExtensionProps {
    data: Extension;
  }

  let { data }: ExtensionProps = $props();
</script>

<div
  class={cn(
    "relative h-48 max-h-48",
    "rounded-md transition-shadow hover:shadow-sm",
    "bg-white dark:bg-neutral-900",
    "border border-neutral-200 dark:border-neutral-800",
    "flex flex-col",
  )}
>
  <div class="p-4">
    <div class="mb-4 flex items-center justify-between">
      <img
        src={data.image}
        alt={data.name}
        class="h-8 w-8 rounded-md object-contain"
      />
      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        class={buttonVariants({ variant: "outline" })}
      >
        <span>Install</span>
        <ArrowUpRightIcon
          size={12}
          strokeWidth={2}
          class="text-neutral-600 dark:text-neutral-400"
        />
      </a>
    </div>
    <p class="mb-1 font-medium">{data.name}</p>
    <p
      title={data.description}
      class="truncate text-sm text-pretty text-neutral-700 dark:text-neutral-300"
    >
      {data.description}
    </p>
  </div>
  <div
    class="absolute bottom-0 flex w-full items-center justify-end gap-1 border-t border-neutral-200 bg-neutral-100/60 px-4 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-800/40"
  >
    <span>Created by</span>
    <a
      href={data.created_by.socialUrl}
      target="_blank"
      rel="noopener noreferrer"
      class="font-medium text-pretty decoration-neutral-400 underline-offset-2 transition-colors hover:text-neutral-600 hover:underline dark:decoration-neutral-600 dark:hover:text-neutral-400"
    >
      {data.created_by.name}
    </a>
  </div>
</div>
