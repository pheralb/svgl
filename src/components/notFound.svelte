<script lang="ts">
  export let notFoundTerm: string;
  import { PackageOpen, ArrowUpRight } from 'lucide-svelte';
</script>

<div class="mt-6 flex w-full flex-col items-center justify-center text-gray-600 dark:text-gray-400">
  <PackageOpen size={40} class="mb-4" />
  <p class="text-xl mb-1 font-medium">SVG not found</p>
  <p class="text-md mb-4 font-mono">"{notFoundTerm}"</p>
  <div class="flex items-center space-x-1">
    <a
      href="https://github.com/pheralb/svgl?tab=readme-ov-file#-getting-started"
      target="_blank"
      class="flex items-center space-x-2 rounded-md border border-neutral-300 p-2 duration-100 hover:bg-neutral-200 dark:border-neutral-700 dark:hover:bg-neutral-700/40"
    >
      <span>Submit logo</span>
      <ArrowUpRight size={16} />
    </a>
    <a
      href="https://github.com/pheralb/svgl/issues/new"
      target="_blank"
      class="flex items-center space-x-2 rounded-md border border-neutral-300 p-2 duration-100 hover:bg-neutral-200 dark:border-neutral-700 dark:hover:bg-neutral-700/40"
    >
      <span>Request SVG</span>
      <ArrowUpRight size={16} />
    </a>
  </div>
</div>
