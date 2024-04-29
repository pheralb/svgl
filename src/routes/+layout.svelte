<script lang="ts">
  import type { LayoutServerData } from './$types';
  export let data: LayoutServerData;

  // Global styles:
  import '../app.css';
  import { cn } from '@/utils/cn';
  import { ModeWatcher, mode } from 'mode-watcher';
  import { sidebarCategoryCountStyles } from '@/ui/styles';
  import { sidebarItemStyles } from '@/ui/styles';

  // Get categories:
  import { svgs } from '@/data/svgs';
  const categories = svgs
    .flatMap((svg) => (Array.isArray(svg.category) ? svg.category : [svg.category]))
    .filter((category, index, array) => array.indexOf(category) === index);

  // Get category counts:
  let categoryCounts: Record<string, number> = {};
  categories.forEach((category) => {
    categoryCounts[category] = svgs.filter((svg) => svg.category.includes(category)).length;
  });

  // Toaster:
  import { Toaster } from 'svelte-sonner';

  // Components for all pages:
  import Transition from '@/components/transition.svelte';
  import Warning from '@/components/warning.svelte';

  // Layout:
  import Navbar from '@/components/navbar.svelte';
</script>

<ModeWatcher />
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
    <div class="md:px-3 md:py-6">
      <nav
        class="flex items-center space-x-1 overflow-y-auto md:mb-3 md:flex-col md:space-x-0 md:space-y-1 md:overflow-y-visible px-6 md:px-0 pb-2 pt-2 md:pt-0"
      >
        <a
          href="/"
          class={cn(
            sidebarItemStyles,
            data.pathname === '/'
              ? 'bg-neutral-200 dark:bg-neutral-700/30 font-medium dark:text-white text-dark'
              : ''
          )}
          data-sveltekit-preload-data>All</a
        >
        <!-- Order alfabetically: -->
        {#each categories.sort() as category}
          <a
            href={`/directory/${category.toLowerCase()}`}
            data-sveltekit-preload-data
            class={cn(
              sidebarItemStyles,
              data.pathname === `/directory/${category.toLowerCase()}`
                ? 'bg-neutral-200 dark:bg-neutral-700/30 font-medium dark:text-white text-dark'
                : ''
            )}
          >
            <span>{category}</span>
            <span
              class={cn(
                sidebarCategoryCountStyles,
                data.pathname === `/directory/${category.toLowerCase()}`
                  ? 'border-neutral-300 dark:border-neutral-700'
                  : '',
                'text-xs font-mono hidden md:inline'
              )}>{categoryCounts[category]}</span
            >
          </a>
        {/each}
      </nav>
    </div>
  </aside>
  <div class="ml-0 md:ml-56 pb-6">
    <Warning />
    <Transition pathname={data.pathname}>
      <slot />
    </Transition>
    <Toaster
      position="bottom-right"
      theme={$mode}
      class="toaster group"
      toastOptions={{
        classes: {
          toast: 'group toast dark:group-[.toaster]:bg-neutral-900 group-[.toaster]:font-sans',
          description: 'group-[.toast]:text-xs font-mono'
        }
      }}
    />
  </div>
</main>
