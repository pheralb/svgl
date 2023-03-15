<script>
  // Global styles:
  import '../app.css';

  // Get categories:
  import svgData from '../data/svgs.json';
  const categories = svgData
    .map((svg) => svg.category)
    .filter((category, index, array) => array.indexOf(category) === index);

  // Icons:
  import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';

  // Toaster:
  import { Toaster } from 'svelte-french-toast';
</script>

<main class="bg-dark font-sans text-mini text-white min-h-screen">
  <nav class="fixed top-0 left-0 z-50 h-full pb-10 overflow-x-hidden overflow-y-auto w-60">
    <div class="px-6 py-6 items-center">
      <div class="border-b border-neutral-700/40 pb-3 mb-3">
        <a href="/">
          <div class="flex items-center space-x-2">
            <h3 class="text-xl font-medium">svgl</h3>
            <p class="text-neutral-500">v3.0.0</p>
          </div>
        </a>
        <p class="mt-2 text-neutral-400 font-medium">✨ Optimized SVGs logos</p>
      </div>
      <div class="pb-3 mb-3 border-b border-neutral-700/40 flex flex-col space-y-1">
        {#each categories as category}
          <a
            href={`/category/${category.toLowerCase()}`}
            class="flex w-full items-center p-2 hover:bg-neutral-700/40 rounded-md duration-100 transition-all"
            >{category}</a
          >
        {/each}
      </div>
      <div class="flex flex-col space-y-1">
        <a
          href="https://github.com/pheralb/svgl#-getting-started"
          target="_blank"
          class="flex w-full items-center space-x-2 p-2 hover:bg-neutral-700/40 rounded-md duration-100 transition-all"
        >
          <span>Submit logo</span>
          <ArrowUpRight size={16} />
        </a>
        <a
          href="https://github.com/pheralb/svgl#-getting-started"
          target="_blank"
          class="flex w-full items-center space-x-2 p-2 hover:bg-neutral-700/40 rounded-md duration-100 transition-all"
        >
          <span>Repository</span>
          <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  </nav>
  <div class="ml-60 py-6">
    <slot />
    <Toaster position="bottom-center" />
  </div>
</main>
