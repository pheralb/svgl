<script lang="ts">
  import type { LayoutServerData } from './$types';
  export let data: LayoutServerData;

  // Global styles:
  import '../app.css';

  // Get categories:
  import { svgs } from '@/data/svgs';
  const categories = svgs
    .map((svg) => svg.category)
    .filter((category, index, array) => array.indexOf(category) === index);

  // Icons:
  import Heart from 'phosphor-svelte/lib/Heart';
  import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';

  // Toaster:
  import { Toaster } from 'svelte-french-toast';
  import Transition from '@/components/transition.svelte';
</script>

<main class="min-h-screen bg-dark font-sans text-mini text-white">
  <nav class="fixed top-0 left-0 z-50 h-full w-60 overflow-y-auto overflow-x-hidden pb-10">
    <div class="items-center px-6 py-6">
      <div class="mb-3 border-b border-neutral-700/40 pb-3">
        <a href="/">
          <div class="flex items-center space-x-2">
            <h3 class="text-xl font-medium">svgl</h3>
            <p class="text-neutral-500">v3.0.0</p>
          </div>
        </a>
        <p class="mt-2 font-medium text-neutral-400">✨ Optimized SVGs logos</p>
      </div>
      <div class="mb-3 flex flex-col space-y-1 border-b border-neutral-700/40 pb-3">
        {#each categories as category}
          <a
            href={`/directory/${category.toLowerCase()}`}
            class="flex w-full items-center rounded-md p-2 transition-all duration-100 hover:bg-neutral-700/40"
            data-sveltekit-preload-data>{category}</a
          >
        {/each}
      </div>
      <div class="flex flex-col space-y-1 border-b border-neutral-700/40 pb-3">
        <a
          href="https://github.com/pheralb/svgl#-getting-started"
          target="_blank"
          class="flex w-full items-center space-x-2 rounded-md p-2 transition-all duration-100 hover:bg-neutral-700/40"
        >
          <span>Submit logo</span>
          <ArrowUpRight size={16} />
        </a>
        <a
          href="https://github.com/pheralb/svgl#-getting-started"
          target="_blank"
          class="flex w-full items-center space-x-2 rounded-md p-2 transition-all duration-100 hover:bg-neutral-700/40"
        >
          <span>Repository</span>
          <ArrowUpRight size={16} />
        </a>
      </div>
      <a
        href="https://twitter.com/pheralb_"
        target="_blank"
        class="mt-5 flex items-center space-x-2 text-neutral-400 transition-all duration-100 hover:text-white"
      >
        <Heart color="#991b1b" size={18} />
        <div class="flex items-center space-x-1">
          <p class="text-muted text-sm">Created by pheralb</p>
          <ArrowUpRight size={12} />
        </div>
      </a>
    </div>
  </nav>
  <div class="ml-60 py-6">
    <Transition pathname={data.pathname}>
      <slot />
    </Transition>
    <Toaster position="bottom-center" />
  </div>
</main>
