<script lang="ts">
  import { page } from '$app/stores';

  // Global styles:
  import '@/styles/app.css';
  import { cn } from '@/utils/cn';
  import { ModeWatcher, mode } from 'mode-watcher';

  // Categories:
  import type { tCategory } from '@/types/categories';
  import { svgs } from '@/data/svgs';
  import { getCategories } from '@/data';

  // Toaster:
  import { Toaster } from 'svelte-sonner';

  // Components for all pages:
  import Transition from '@/components/transition.svelte';
  import Warning from '@/components/warning.svelte';

  // Layout:
  import Navbar from '@/components/navbar.svelte';
  import { sidebarCategoryCountStyles } from '@/ui/styles';
  import { sidebarItemStyles } from '@/ui/styles';

  // Get category counts:
  const categories: tCategory[] = getCategories();
  let categoryCounts: Record<string, number> = {};
  categories.forEach((category) => {
    categoryCounts[category] = svgs.filter((svg) => svg.category.includes(category)).length;
  });

  // Get main pathname:
  $: pathname = $page.url.pathname;
</script>

<ModeWatcher />
<Navbar currentPath={pathname} />
<main>
  <aside
    class={cn(
      'z-50 w-full overflow-y-auto overflow-x-hidden',
      'dark:border-neutral-800 md:fixed md:left-0 md:h-[calc(100vh-63px)] md:w-56 md:pb-0',
      'bg-white dark:bg-neutral-900',
      'opacity-95 backdrop-blur-md',
      'border-b border-neutral-200 dark:border-neutral-800 md:border-r'
    )}
  >
    <div class="md:px-3 md:py-6">
      <nav
        class="flex items-center space-x-1 overflow-y-auto px-6 pb-2 pt-2 md:mb-3 md:flex-col md:space-x-0 md:space-y-1 md:overflow-y-visible md:px-0 md:pt-0"
      >
        <a
          href="/"
          class={cn(
            sidebarItemStyles,
            pathname === '/'
              ? 'bg-neutral-200 font-medium text-dark dark:bg-neutral-700/30 dark:text-white'
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
              pathname === `/directory/${category.toLowerCase()}`
                ? 'bg-neutral-200 font-medium text-dark dark:bg-neutral-700/30 dark:text-white'
                : ''
            )}
          >
            <span>{category}</span>
            <span
              class={cn(
                sidebarCategoryCountStyles,
                pathname === `/directory/${category.toLowerCase()}`
                  ? 'border-neutral-300 dark:border-neutral-700'
                  : '',
                'hidden font-mono text-xs md:inline'
              )}>{categoryCounts[category]}</span
            >
          </a>
        {/each}
      </nav>
    </div>
  </aside>
  <div class="ml-0 pb-6 md:ml-56">
    <Warning />
    <Transition {pathname}>
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
