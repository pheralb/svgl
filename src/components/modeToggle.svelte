<script lang="ts">
  import { onMount } from "svelte";
  import { toggleMode } from "mode-watcher";

  import SunIcon from "@lucide/svelte/icons/sun";
  import MoonIcon from "@lucide/svelte/icons/moon";

  interface Props {
    className?: string;
  }

  let { className }: Props = $props();

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "l") {
      event.preventDefault();
      toggleMode();
    }
  };

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });
</script>

<button class={className} onclick={toggleMode} title="Mode Toggle (Cmd + l)">
  <SunIcon
    size={20}
    strokeWidth={1.5}
    class="scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
  />
  <MoonIcon
    size={20}
    strokeWidth={1.5}
    class="absolute scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
  />
  <span class="sr-only">Toggle theme</span>
</button>
