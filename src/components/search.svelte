<script lang="ts">
  import { SearchIcon } from 'lucide-svelte';
  export let searchTerm: string;
  export let placeholder: string = 'Search...';
  export let clearSearch: () => void;
  import X from 'phosphor-svelte/lib/X';
</script>

<div class="sticky top-[63px] z-50">
  <div class="relative w-full text-lg">
    <div class="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
      <div class="pointer-events-none">
        <SearchIcon size={20} strokeWidth={searchTerm ? 2.5 : 1.5} />
      </div>
    </div>
    <input
      type="text"
      {placeholder}
      autocomplete="off"
      class="w-full border-b border-neutral-300 bg-neutral-100 p-3 pl-11 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:focus:ring-neutral-700"
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
</div>
