<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "@/utils/cn";

  let { className, children }: { className?: string; children?: Snippet } =
    $props();
</script>

<div class={cn("container mx-auto px-6 lg:px-4", className)}>
  {@render children?.()}
</div>
