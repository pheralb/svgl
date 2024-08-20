<script lang="ts">
  import { BookIcon, Check, MegaphoneIcon } from 'lucide-svelte';
  import { browser } from '$app/environment';
  import { buttonStyles } from '@/ui/styles';
  import { cn } from '@/utils/cn';

  let warning = false;
  let warningName = 'svgl_warning_api_message';
  const initialValue = browser ? window.localStorage.getItem(warningName) : true;
</script>

{#if !warning && !initialValue}
  <div
    class="flex items-center w-full justify-between md:flex-row flex-col md:space-x-2 space-x-0 space-y-2 md:space-y-0 py-2 px-3 bg-neutral-100/60 dark:bg-neutral-800/40 text-neutral-700 dark:text-neutral-300 border-b border-neutral-200 dark:border-neutral-800"
  >
    <div class="flex items-center space-x-2">
      <MegaphoneIcon
        size={20}
        strokeWidth={2}
        class="mr-1 flex-shrink-0 text-rose-600 dark:text-rose-500 animate-pulse -rotate-12"
      />
      <p>
        Starting <strong>August 24th</strong>, the API route <strong>svgl.app/api/*</strong> will no
        longer be available. There is now a new route: <strong>api.svgl.app</strong>.
      </p>
    </div>
    <div class="flex items-center space-x-2">
      <a href="/api" class={cn(buttonStyles, 'h-10 text-sm')}>
        <BookIcon size={14} strokeWidth={2} />
        <span>Docs</span>
      </a>
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
  </div>
{/if}
