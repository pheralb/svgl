<script lang="ts">
  import { fade } from 'svelte/transition';
  export let pathname: string = '';
</script>

{#key pathname}
  <div in:fade={{ duration: 300 }}>
    <slot />
  </div>
{/key}
