<script lang="ts">
  import { AlertTriangleIcon, Check } from 'lucide-svelte';
  import { browser } from '$app/environment';
  import { buttonStyles } from '@/ui/styles';
  import { cn } from '@/utils/cn';

  let warning = false;
  let warningName = 'svgl_warn_message';
  const initialValue = browser ? window.localStorage.getItem(warningName) : true;
</script>

{#if !warning && !initialValue}
  <div
    class="flex w-full flex-col items-center justify-between space-x-0 space-y-2 border-b border-neutral-200 bg-neutral-100/60 px-3 py-2 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-800/40 dark:text-neutral-300 md:flex-row md:space-x-2 md:space-y-0"
  >
    <div class="flex items-center space-x-2">
      <AlertTriangleIcon
        size={18}
        strokeWidth={2}
        class="mr-1 flex-shrink-0 animate-pulse text-yellow-600 dark:text-yellow-500"
      />
      <p>
        All SVGs include links to the respective products or companies that own them. <strong
          >Please contact the owner directly if you need to use their logo.</strong
        >
        If you are the owner of an SVG and would like it removed,
        <a
          target="_blank"
          class="underline decoration-neutral-500 decoration-dotted underline-offset-4"
          href="https://github.com/pheralb/svgl/issues/new">create an issue</a
        > on GitHub.
      </p>
    </div>
    <button
      class={cn(buttonStyles, 'h-10 text-sm')}
      on:click={() => {
        localStorage.setItem(warningName, 'true');
        warning = true;
      }}
    >
      <Check size={14} strokeWidth={2} />
      <span>Accept</span>
    </button>
  </div>
{/if}
