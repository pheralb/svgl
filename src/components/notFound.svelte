<script lang="ts">
  export let notFoundTerm: string;

  import FileSearch from 'phosphor-svelte/lib/FileMagnifyingGlass';
  import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';
</script>

<div
  class="mt-6 flex w-full flex-col items-center justify-center space-y-2 text-gray-600 dark:text-gray-400"
>
  <FileSearch size={40} />
  <p class="mt-1 text-xl font-medium">SVG not found</p>
  <p class="text-lg">"{notFoundTerm}"</p>
  <a
    href="https://github.com/pheralb/svgl/issues/new"
    target="_blank"
    class="flex items-center space-x-2 rounded-md border border-neutral-300 p-2 duration-100 hover:bg-neutral-200 dark:border-neutral-700 dark:hover:bg-neutral-700/40"
  >
    <span>Request SVG</span>
    <ArrowUpRight size={16} />
  </a>
</div>
