<script lang="ts">
  import type { Component } from "svelte";

  import { cn } from "@/utils/cn";
  import { clipboard } from "@/utils/clipboard";

  import * as DropdownMenu from "@/components/ui/dropdown-menu";
  import { Button, buttonVariants } from "@/components/ui/button";

  import CopyIcon from "@lucide/svelte/icons/copy";
  import Openai from "@/components/logos/openai.svelte";
  import Claude from "@/components/logos/claude.svelte";
  import CheckCheck from "@lucide/svelte/icons/check-check";
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
  import Markdown from "./logos/markdown.svelte";

  interface DocumentSettingsProps {
    documentContent: string;
    documentUrl: string;
    rawUrl: string;
  }

  let isCopied = $state<boolean>(false);
  let settingsOpen = $state<boolean>(false);
  let { documentContent, documentUrl, rawUrl }: DocumentSettingsProps =
    $props();

  const handleCopyPage = () => {
    clipboard(documentContent);
    isCopied = true;
    setTimeout(() => {
      isCopied = false;
    }, 2000);
  };

  interface AiOption {
    name: string;
    href: string;
    icon: Component;
  }

  const aiPrompt = `The following is a documentation page from SVGL, a web app with SVG logos: ${documentUrl}. Help me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.`;

  const aiOptions: AiOption[] = [
    {
      name: "ChatGPT",
      href: `https://chatgpt.com/?q=${encodeURIComponent(aiPrompt)}`,
      icon: Openai,
    },
    {
      name: "Claude",
      href: `https://claude.ai/new?q=${encodeURIComponent(aiPrompt)}`,
      icon: Claude,
    },
  ];
</script>

{#snippet LinkItem({ href, icon, name }: AiOption)}
  <DropdownMenu.Item>
    {#snippet child({ props })}
      {@const Icon = icon}
      <a {href} target="_blank" {...props}>
        <div class="flex items-center space-x-2">
          <Icon size={14} />
          <span>{name}</span>
          <ArrowUpRight size={12} class="opacity-50" />
        </div>
      </a>
    {/snippet}
  </DropdownMenu.Item>
{/snippet}

<div class="flex items-center">
  <Button
    size="sm"
    variant="outline"
    class="rounded-r-none border-r-0 px-2 md:px-3"
    onclick={handleCopyPage}
  >
    {#if isCopied}
      <CheckCheck size={14} />
    {:else}
      <CopyIcon size={14} />
    {/if}
    <span class="hidden md:block">Copy Page</span>
  </Button>
  <DropdownMenu.Root bind:open={settingsOpen}>
    <DropdownMenu.Trigger
      class={cn(
        buttonVariants({ variant: "outline", size: "sm" }),
        "rounded-l-none px-2",
      )}
    >
      <ChevronDown
        size={14}
        class={cn(
          "transition-transform duration-200",
          settingsOpen ? "rotate-180" : "rotate-0",
        )}
      />
    </DropdownMenu.Trigger>
    <DropdownMenu.Content side="bottom" align="end" sideOffset={6}>
      <DropdownMenu.Group>
        {@render LinkItem({
          href: rawUrl,
          icon: Markdown,
          name: "View as Markdown",
        })}
        {#each aiOptions as option (option.name)}
          {@render LinkItem(option)}
        {/each}
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</div>
