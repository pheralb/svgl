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
  import ArrowLeft from 'phosphor-svelte/lib/ArrowLeft';
  import Star from 'phosphor-svelte/lib/Star';

  // Toaster:
  import { Toaster } from 'svelte-french-toast';

  // Components for all pages:
  import Transition from '@/components/transition.svelte';
  import Container from '@/components/container.svelte';
  import Theme from '@/components/theme.svelte';
</script>

<main class="min-h-screen bg-light font-sans text-mini dark:bg-dark dark:text-white">
  <nav
    class="z-50 w-full overflow-y-auto overflow-x-hidden border-b border-neutral-300 dark:border-neutral-800 md:fixed md:left-0 md:top-0 md:h-full md:w-60 md:border-none md:pb-10"
  >
    <div class="px-6 py-6">
      <div class="mb-3 border-b border-neutral-300 pb-3 dark:border-neutral-700/40">
        <div class="flex items-center justify-between">
          <a href="/">
            <div
              class="flex items-center space-x-2 duration-150 hover:text-neutral-500 dark:hover:text-neutral-300"
            >
              <h3 class="text-xl font-medium">svgl</h3>
              <p class="text-neutral-500">v3.0.0</p>
            </div>
          </a>
          <Theme />
        </div>
        <p class="mt-2 font-medium text-neutral-400">✨ Optimized SVGs for web</p>
      </div>
      <div
        class="flex items-center space-x-1 overflow-y-auto border-b border-neutral-300 pb-3 dark:border-neutral-700/40 md:mb-3 md:flex-col md:space-x-0 md:space-y-1 md:overflow-y-visible"
      >
        <a
          href="/"
          class={`flex w-full items-center rounded-md p-2 transition-none duration-100 hover:bg-neutral-200 dark:hover:bg-neutral-700/40
              ${data.pathname === `/` ? 'bg-neutral-200 dark:bg-neutral-700/30' : ''}`}
          data-sveltekit-preload-data>All</a
        >
        {#each categories as category}
          <a
            href={`/directory/${category.toLowerCase()}`}
            class={`flex w-full items-center rounded-md p-2 transition-none duration-100 hover:bg-neutral-200 dark:hover:bg-neutral-700/40
              ${
                data.pathname === `/directory/${category.toLowerCase()}`
                  ? 'bg-neutral-200 dark:bg-neutral-700/30'
                  : ''
              }`}
            data-sveltekit-preload-data>{category}</a
          >
        {/each}
      </div>
      <div
        class="mt-3 flex flex-row items-center space-x-2 border-b border-neutral-300 pb-3 dark:border-neutral-700/40 md:mt-0 md:flex-col md:space-x-0 md:space-y-1"
      >
        <a
          href="https://github.com/pheralb/svgl#-getting-started"
          target="_blank"
          class="flex w-full items-center space-x-2 rounded-md p-2 duration-100 hover:bg-neutral-200 dark:hover:bg-neutral-700/40"
        >
          <span>Submit logo</span>
          <ArrowUpRight size={16} />
        </a>
        <a
          href="https://github.com/pheralb/svgl"
          target="_blank"
          class="flex w-full items-center space-x-2 rounded-md p-2 duration-100 hover:bg-neutral-200 dark:hover:bg-neutral-700/40"
        >
          <span class="flex items-center justify-center">
            Repository
            {#if data.stars}
              - Star <span class="mx-[2px]"><Star size={14} /></span>| {data.stars}
            {/if}
            <ArrowUpRight size={16} />
          </span></a
        >
      </div>
      <a
        href="https://twitter.com/pheralb_"
        target="_blank"
        class="mt-5 flex items-center space-x-2 duration-100 hover:text-dark dark:text-neutral-400 dark:hover:text-white"
      >
        <Heart color="#991b1b" size={18} weight={'duotone'} />
        <div class="flex items-center space-x-1">
          <p class="text-muted text-sm">Created by pheralb</p>
          <ArrowUpRight size={12} />
        </div>
      </a>
    </div>
  </nav>
  <div class="py-2 md:ml-60 md:py-6">
    {#if data.pathname !== '/'}
      <Container>
        <a href="/">
          <div
            class="flex items-center space-x-2 duration-100 hover:text-neutral-500 dark:text-neutral-400 dark:hover:text-white"
          >
            <ArrowLeft size={20} />
            <span>View all</span>
          </div>
        </a>
      </Container>
    {/if}
    <Transition pathname={data.pathname}>
      <slot />
    </Transition>
    <Toaster position="bottom-center" />
  </div>
</main>
