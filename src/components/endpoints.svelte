<script lang="ts">
  import { cn } from '@/utils/cn';

  type methodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

  export let method: methodType;
  export let title: string;
  export let description: string;
</script>

<div class={cn('border-2 border-neutral-100 dark:border-neutral-800 rounded-lg', 'p-4 mb-2')}>
  <div class="flex items-center space-x-4 mb-4">
    <p
      class={cn(
        'm-0 rounded-md font-medium px-1.5 py-0.5 text-sm leading-5 select-none',
        method === 'GET' &&
          ' text-green-600 dark:text-green-500 bg-green-400/20 dark:bg-green-400/20',
        method === 'POST' && ' text-blue-600 dark:text-blue-500 bg-blue-400/20 dark:bg-blue-400/20',
        method === 'PUT' &&
          ' text-yellow-600 dark:text-yellow-500 bg-yellow-400/20 dark:bg-yellow-400/20',
        method === 'PATCH' &&
          ' text-yellow-600 dark:text-yellow-500 bg-yellow-400/20 dark:bg-yellow-400/20',
        method === 'DELETE' && ' text-red-600 dark:text-red-500 bg-red-400/20 dark:bg-red-400/20'
      )}
    >
      {method}
    </p>
    <div class="flex flex-col space-y-0 m-0">
      <h3 class="m-0 font-medium">{title}</h3>
      <p class="mb-0 font-mono text-sm">{description}</p>
    </div>
  </div>
  <slot />
</div>
