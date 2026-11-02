<script lang="ts">
  import { onMount } from "svelte";
  import { toggleMode } from "mode-watcher";

  import SunIcon from "@lucide/svelte/icons/sun";
  import MoonIcon from "@lucide/svelte/icons/moon";

  interface Props {
    className?: string;
  }

  let { className }: Props = $props();

  const isTyping = (target: EventTarget | null) =>
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    (target instanceof HTMLElement &&
      (target.isContentEditable || target.closest('[role="menu"]') !== null));

  const handleKeydown = (event: KeyboardEvent) => {
    if (
      (event.key === "d" || event.key === "D") &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.altKey &&
      !event.repeat &&
      !isTyping(event.target)
    ) {
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

<button class={className} onclick={toggleMode} title="Mode Toggle (D)">
  <SunIcon
    size={20}
    strokeWidth={1.5}
    class="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
  />
  <MoonIcon
    size={20}
    strokeWidth={1.5}
    class="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
  />
  <span class="sr-only">Toggle theme</span>
</button>
