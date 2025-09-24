<script lang="ts">
  import type { TableOfContentsProps } from "./toc.types";
  import { cn } from "@/utils/cn";

  let { toc, className }: TableOfContentsProps = $props();
</script>

<div
  class={cn(
    "flex flex-col text-sm text-neutral-600 dark:text-neutral-400",
    className,
  )}
>
  {#each toc as tocItem (tocItem.id)}
    <a
      href={"#" + tocItem.slug}
      class={cn(
        "pt-1 pb-1.5 transition-colors hover:text-neutral-900 dark:hover:text-neutral-50",
        tocItem.level === 2 && "ml-0 font-medium",
        tocItem.level === 3 &&
          "border-l border-neutral-200 pl-4 dark:border-neutral-800",
        tocItem.level === 4 && "ml-8",
      )}
    >
      {tocItem.text}
    </a>
  {/each}
</div>
