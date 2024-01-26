<script lang="ts">
  import { toggleMode, mode } from 'mode-watcher';

  // Icons:
  import { MoonIcon, SunIcon } from 'lucide-svelte';
</script>

<button on:click={toggleMode} aria-label="Toggle dark mode" class="opacity-80 hover:opacity-100">
  {#if $mode === 'light'}
    <SunIcon size={20} strokeWidth={1.5} />
  {:else}
    <MoonIcon size={20} strokeWidth={1.5} />
  {/if}
</button>
