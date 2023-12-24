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
  import { MoonIcon, SunIcon } from 'lucide-svelte';
</script>

<svelte:head>
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

<button on:click={toggle} aria-label="Toggle dark mode" class="hover:opacity-80">
  <!-- moon icon -->
  {#if dark}
    <SunIcon size={20} strokeWidth={1.5} />
  {:else}
    <MoonIcon size={20} strokeWidth={1.5} />
  {/if}
</button>
