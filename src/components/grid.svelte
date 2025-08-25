<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "@/utils/cn";

  let { className, children }: { className?: string; children?: Snippet } =
    $props();
</script>

<div
  class={cn(
    "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5",
    className,
  )}
>
  {@render children?.()}
</div>
