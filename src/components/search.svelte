<script lang="ts">
  import { inputStyles } from '@/ui/styles';
  import { Command, SearchIcon } from 'lucide-svelte';
  export let searchTerm: string;
  export let placeholder: string = 'Search...';
  export let clearSearch: () => void;
  import { X } from 'lucide-svelte';

  let inputElement;

  function focusInput(node: HTMLElement) {
    const handleKeydown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        node.focus();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return {
      destroy() {
        window.removeEventListener('keydown', handleKeydown);
      }
    };
  }
</script>

<div class="sticky top-[63px] z-50">
  <div class="relative w-full text-[16px]">
    <div class="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
      <div class="pointer-events-none">
        <SearchIcon size={20} strokeWidth={searchTerm ? 2.5 : 1.5} />
      </div>
    </div>
    <input
      type="text"
      {placeholder}
      autocomplete="off"
      class={inputStyles}
      bind:value={searchTerm}
      on:input
      use:focusInput
      bind:this={inputElement}
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
    {:else}
      <div class="absolute inset-y-0 right-0 flex items-center pr-4 text-neutral-500">
        <div class="flex h-full items-center pointer-events-none gap-x-1 font-mono">
          <Command size={16} />
          <span>K</span>
        </div>
      </div>
    {/if}
  </div>
</div>
