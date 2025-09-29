<script lang="ts">
  import type { Snippet } from "svelte";

  interface SettingsCardProps {
    title: string;
    description: string;
    children: Snippet;
  }

  let { title, description, children }: SettingsCardProps = $props();
</script>

<div class="flex flex-col">
  <h3 class="mb-0.5 font-medium">{title}</h3>
  <p class="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
    {description}
  </p>
  {@render children?.()}
</div>
