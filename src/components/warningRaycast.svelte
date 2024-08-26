<script lang="ts">
  import { browser } from '$app/environment';
  import { buttonStyles } from '@/ui/styles';
  import { cn } from '@/utils/cn';
  import RaycastIcon from './icons/raycastIcon.svelte';
  import { ArrowUpLeft, ArrowUpRight, X } from 'lucide-svelte';
  import XIcon from './icons/xIcon.svelte';

  let warning = false;
  let warningName = 'svgl_warning_raycast_message';
  const initialValue = browser ? window.localStorage.getItem(warningName) : true;
</script>

{#if !warning && !initialValue}
  <div
    class="flex items-center w-full justify-between md:flex-row flex-col md:space-x-2 space-x-0 space-y-2 md:space-y-0 py-2 px-3 bg-neutral-100/60 dark:bg-neutral-800/40 text-neutral-700 dark:text-neutral-300 border-b border-neutral-200 dark:border-neutral-800"
  >
    <div class="flex items-center space-x-2">
      <RaycastIcon
        iconSize={22}
        className="mr-1 flex-shrink-0 text-rose-600 dark:text-rose-500 animate-pulse"
      />
      <p>
        Update your <strong>Raycast</strong> extension to the latest version to use the new SVGL API.
      </p>
    </div>
    <div class="flex items-center space-x-2">
      <a
        href="https://x.com/1weiho/status/1828077090824241445"
        class={cn(buttonStyles, 'h-10 text-sm')}
        target="_blank"
      >
        <XIcon iconSize={14} />
        <span>How to update</span>
        <ArrowUpRight size={14} strokeWidth={2} />
      </a>
      <button
        class={cn(buttonStyles, 'h-10 text-sm')}
        on:click={() => {
          localStorage.setItem(warningName, 'true');
          warning = true;
        }}
      >
        <X size={14} strokeWidth={2} />
        <span>Close</span>
      </button>
    </div>
  </div>
{/if}
