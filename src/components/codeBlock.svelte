<script lang="ts">
  import type { Component } from "svelte";

  import { cn } from "@/utils/cn";
  import CopyIcon from "@lucide/svelte/icons/copy";
  import CheckIcon from "@lucide/svelte/icons/check";
  import { clipboard } from "@/utils/clipboard";

  interface Props {
    code: string;
    className?: string;
    Icon?: Component;
    copyDuration?: number;
  }

  let { Icon, className, code, copyDuration = 2000 }: Props = $props();
  let copied = $state(false);
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const handleCopy = async () => {
    await clipboard(code);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    copied = true;
    timeoutId = setTimeout(() => {
      copied = false;
      timeoutId = null;
    }, copyDuration);
  };

  $effect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  });
</script>

<div
  class={cn(
    "relative flex items-center space-x-2 rounded-md border border-neutral-200 p-2.5 dark:border-neutral-800",
    className,
  )}
>
  <button
    class="absolute right-2 transition-colors hover:text-neutral-600 dark:hover:text-neutral-400"
    onclick={handleCopy}
    disabled={copied}
    title={copied ? "Copied" : "Copy code"}
  >
    {#if copied}
      <CheckIcon size={14} />
    {:else}
      <CopyIcon size={14} />
    {/if}
  </button>
  {#if Icon}
    <Icon size={14} class="text-neutral-500" />
  {/if}
  <code class="pr-8 font-mono text-sm select-all">
    {code}
  </code>
</div>
