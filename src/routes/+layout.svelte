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
  import { ArrowUpRight } from 'lucide-svelte';

  // Toaster:
  import { Toaster } from 'svelte-sonner';

  // Components for all pages:
  import Transition from '@/components/transition.svelte';

  // Layout:
  import Navbar from '@/components/navbar.svelte';
  import { cn } from '@/utils/cn';
</script>

<Navbar currentPath={data.pathname} />
<main>
  <aside
    class={cn(
      'z-50 w-full overflow-y-auto overflow-x-hidden',
      'dark:border-neutral-800 md:fixed md:left-0 md:h-full md:w-56 md:pb-10',
      'bg-white dark:bg-neutral-900',
      'backdrop-blur-md opacity-95',
      'border-r border-neutral-200 dark:border-neutral-800'
    )}
  >
    <div class="px-6 py-6">
      <div
        class="flex items-center space-x-1 overflow-y-auto border-b border-neutral-300 pb-3 dark:border-neutral-700/40 md:mb-3 md:flex-col md:space-x-0 md:space-y-1 md:overflow-y-visible"
      >
        <a
          href="/"
          class={`flex w-full items-center rounded-md p-2 transition-none duration-100 hover:bg-neutral-200 dark:hover:bg-neutral-700/40 text-neutral-600 hover:text-dark dark:hover:text-white dark:text-neutral-400 ${
            data.pathname === `/`
              ? 'bg-neutral-200 dark:bg-neutral-700/30 font-medium dark:text-white text-dark'
              : ''
          }`}
          data-sveltekit-preload-data>All</a
        >
        <!-- Order alfabetically: -->
        {#each categories.sort() as category}
          <a
            href={`/directory/${category.toLowerCase()}`}
            class={cn(
              'flex w-full items-center justify-between rounded-md p-2 transition-none duration-100 text-neutral-600 hover:text-dark dark:hover:text-white dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700/40',
              data.pathname === `/directory/${category.toLowerCase()}`
                ? 'bg-neutral-200 dark:bg-neutral-700/30 font-medium dark:text-white text-dark'
                : ''
            )}
          >
            <span>{category}</span>
          </a>
        {/each}
      </div>
      <div></div>
      <a
        href="https://twitter.com/pheralb_"
        target="_blank"
        class="group mt-5 md:flex hidden items-center space-x-2 duration-100 hover:text-dark dark:text-neutral-400 dark:hover:text-white"
      >
        <Heart color="#991b1b" size={18} weight={'duotone'} />
        <div class="flex items-center space-x-1">
          <p class="text-muted text-sm">Created by pheralb</p>
          <ArrowUpRight
            size={14}
            class="transition-transform duration-300 group-hover:-translate-y-[1px]"
          />
        </div>
      </a>
    </div>
  </aside>
  <div class="md:ml-56 pb-6">
    <Transition pathname={data.pathname}>
      <slot />
    </Transition>
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: `background-color: #171717;
           color: #ffff; 
           border-radius: 0.4rem; border: 1px solid #262626;`
      }}
    />
  </div>
</main>
