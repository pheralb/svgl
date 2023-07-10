<script lang="ts">
  export let searchTerm: string;
  export let placeholder: string = 'Search...';
  export let clearSearch: () => void;
  import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
  import X from 'phosphor-svelte/lib/X';
</script>

<div class="relative w-full">
  <div class="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
    <div class="pointer-events-none">
      <MagnifyingGlass size={18} weight={searchTerm ? 'duotone' : 'regular'} />
    </div>
  </div>
  <input
    type="text"
    {placeholder}
    autocomplete="off"
    class="w-full rounded-md border border-neutral-300 bg-neutral-200/50 p-3 pl-10 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:border-neutral-800 dark:bg-neutral-700/10 dark:focus:ring-neutral-700"
    bind:value={searchTerm}
    on:input
  />
  {#if searchTerm.length > 0}
    <div class="absolute inset-y-0 right-0 flex items-center pr-3">
      <button
        type="button"
        class="focus:outline-none focus:ring-1 focus:ring-neutral-300"
        on:click={clearSearch}
      >
        <X size={18} />
      </button>
    </div>
  {/if}
</div>
