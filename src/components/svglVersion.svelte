<script>
  import { PUBLIC_SVGL_VERSION } from "$env/static/public";
  import Badge from "@/components/ui/badge/badge.svelte";
</script>

{#if PUBLIC_SVGL_VERSION}
  <Badge variant="outline">{PUBLIC_SVGL_VERSION}</Badge>
{/if}
