<script lang="ts">
  import { buttonStyles } from '@/ui/styles';
  export let notFoundTerm: string;
  import { PackageOpen, ArrowUpRight } from 'lucide-svelte';
</script>

<div class="mt-6 flex w-full flex-col items-center justify-center text-gray-600 dark:text-gray-400">
  <PackageOpen size={40} class="mb-4" />
  <p class="text-xl mb-1 font-medium">Couldn't find the Icon</p>
  <p class="text-md mb-4 font-mono">"{notFoundTerm}"</p>
  <div class="flex items-center space-x-1">
    <a
      href="https://github.com/pheralb/svgl?tab=readme-ov-file#-getting-started"
      target="_blank"
      class={buttonStyles}
    >
      <span>Submit logo</span>
      <ArrowUpRight size={16} />
    </a>
    <a
      href="https://github.com/pheralb/svgl/issues/new?assignees=pheralb&labels=request&projects=&template=request-svg-.md&title=%5BRequest%5D%3A"
      target="_blank"
      class={buttonStyles}
    >
      <span>Request Icon</span>
      <ArrowUpRight size={16} />
    </a>
  </div>
</div>
