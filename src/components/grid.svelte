<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "@/utils/cn";

  interface GridProps {
    columns?: "default" | "4" | "3" | "2";
    className?: string;
    children?: Snippet;
  }

  let { className, columns, children }: GridProps = $props();
</script>

<div
  class={cn(
    "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    columns === "4" && "lg:grid-cols-3 xl:grid-cols-4",
    columns === "3" && "lg:grid-cols-2 xl:grid-cols-3",
    columns === "2" && "md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2",
    className,
  )}
>
  {@render children?.()}
</div>
