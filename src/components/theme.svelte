<script lang="ts">
  import { onMount } from 'svelte';
  let dark: boolean;
  let hidden = true;

  onMount(() => {
    dark = document.documentElement.classList.contains('dark');
    hidden = false;
    const matcher = window.matchMedia('(prefers-color-scheme: dark)');
    matcher.addEventListener('change', handleChange);
    return () => matcher.removeEventListener('change', handleChange);
  });

  function handleChange({ matches: dark }: MediaQueryListEvent) {
    if (!localStorage.theme) {
      setMode(dark);
    }
  }

  function toggle() {
    setMode(!dark);
  }

  function setMode(value: boolean) {
    dark = value;
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.theme = dark ? 'dark' : 'light';
    if (window.matchMedia(`(prefers-color-scheme: ${localStorage.theme})`).matches) {
      localStorage.removeItem('theme');
    }
  }

  // Icons:
  import Moon from 'phosphor-svelte/lib/Moon';
  import Sun from 'phosphor-svelte/lib/Sun';
</script>

<svelte:head>
  <!-- set dark mode class based on user preference / device settings (in head to avoid FOUC) -->
  <script>
    if (
      localStorage.theme === 'dark' ||
      (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  </script>
</svelte:head>

<button
  on:click={toggle}
  class="duration-100 hover:-translate-y-0.5 focus:outline-none"
  aria-label="Toggle dark mode"
>
  <!-- moon icon -->
  {#if dark}
    <Sun size={18} />
  {:else}
    <Moon size={18} />
  {/if}
</button>
