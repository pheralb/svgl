<script lang="ts">
  import SunIcon from "@lucide/svelte/icons/sun";
  import MoonIcon from "@lucide/svelte/icons/moon";

  import { toggleMode } from "mode-watcher";

  interface Props {
    className?: string;
  }

  let { className }: Props = $props();
</script>

<button class={className} onclick={toggleMode} title="Mode Toggle">
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
