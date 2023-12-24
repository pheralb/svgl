<script lang="ts">
  import { AlertTriangleIcon, Check } from 'lucide-svelte';
  import { browser } from '$app/environment';

  let warning = false;
  const initialValue = browser ? window.localStorage.getItem('warning') : true;
</script>

{#if !warning && !initialValue}
  <div
    class="flex items-center md:flex-row flex-col md:space-x-2 space-x-0 space-y-2 md:space-y-0 py-2 px-3 bg-neutral-100 dark:bg-neutral-800/40 text-neutral-700 dark:text-neutral-300"
  >
    <AlertTriangleIcon size={18} strokeWidth={2} class="mr-1" />
    <p>
      Each svg provides the link to the product or company that owns it, <strong
        >please contact them</strong
      >
      if you are going to use their logo. If you are the owner of an svg and do not want it to appear
      here, please
      <a
        target="_blank"
        class="underline underline-offset-4 decoration-dotted decoration-neutral-500"
        href="https://github.com/pheralb/svgl/issues/new">create an issue</a
      > on Github.
    </p>
    <button
      class="ml-auto transition-colors flex items-center space-x-1 rounded-md p-2 duration-100 hover:bg-neutral-200 dark:hover:bg-neutral-700/40 bg-neutral-200/50 dark:bg-neutral-800/40 text-neutral-700 dark:text-neutral-300"
      on:click={() => {
        localStorage.setItem('warning', 'true');
        warning = true;
      }}
    >
      <Check size={14} strokeWidth={2} />
      <span>Accept</span>
    </button>
  </div>
{/if}
