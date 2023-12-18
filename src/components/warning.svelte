<script lang="ts">
  import { AlertTriangleIcon } from 'lucide-svelte';
  import { browser } from '$app/environment';

  let warning = false;
  const initialValue = browser ? window.localStorage.getItem('warning') : true;
</script>

{#if !warning && !initialValue}
  <div
    class="flex items-center md:flex-row flex-col md:space-x-2 space-x-0 p-3 bg-neutral-100 dark:bg-neutral-800/40 text-neutral-700 dark:text-neutral-300"
  >
    <AlertTriangleIcon size={18} strokeWidth={2} class="mr-2 text-yellow-500" />
    <p>
      Use each svg responsibly. The svgs provides the link to the product or company that owns it,
      <strong>please contact them</strong> if you are going to use their logo. If you are the owner
      of an svg and do not want it to appear here, please
      <a
        target="_blank"
        class="underline underline-offset-2"
        href="https://github.com/pheralb/svgl/issues/new">create an issue</a
      > on Github.
    </p>
    <button
      class="ml-auto flex items-center space-x-2 rounded-md p-2 duration-100 hover:bg-neutral-200 dark:hover:bg-neutral-700/40"
      on:click={() => {
        localStorage.setItem('warning', 'true');
        warning = true;
      }}
    >
      Accept
    </button>
  </div>
{/if}
