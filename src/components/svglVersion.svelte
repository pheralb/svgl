<script lang="ts">
  import { PUBLIC_SVGL_VERSION } from "$env/static/public";
  import Badge from "@/components/ui/badge/badge.svelte";

  interface Props {
    className?: string;
  }

  let { className }: Props = $props();
</script>

{#if PUBLIC_SVGL_VERSION}
  <Badge variant="outline" class={className}>{PUBLIC_SVGL_VERSION}</Badge>
{/if}
