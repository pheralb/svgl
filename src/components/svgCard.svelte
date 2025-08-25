<script lang="ts">
  import type { iSVG } from "@/types/svg";
  import { cn } from "@/utils/cn";

  // Icons:
  import XIcon from "@lucide/svelte/icons/x";
  import TagIcon from "@lucide/svelte/icons/tag";
  import LinkIcon from "@lucide/svelte/icons/link";
  import SparklesIcon from "@lucide/svelte/icons/sparkles";
  import BaselineIcon from "@lucide/svelte/icons/baseline";
  import PaletteIcon from "@lucide/svelte/icons/palette";
  import EllipsisIcon from "@lucide/svelte/icons/ellipsis";

  // UI Components:
  import * as Popover from "@/components/ui/popover";
  import { badgeVariants } from "@/components/ui/badge";
  import { Button, buttonVariants } from "@/components/ui/button";

  // Components:
  import CopySvg from "@/components/copySvg.svelte";
  import DownloadSvg from "@/components/downloadSvg.svelte";

  // Props:
  interface Props {
    svgInfo: iSVG;
  }

  let { svgInfo }: Props = $props();

  // States:
  let wordmarkSvg = $state<boolean>(false);
  let moreTagsOptions = $state<boolean>(false);

  // Icon Stroke & Size:
  let iconStroke = 1.8;
  let iconSize = 16;
  let maxVisibleCategories = 1;

  // Global Styles:
  const globalImageStyles = "mb-4 mt-2 h-10 select-none pointer-events-none";
</script>

<div
  class={cn(
    "group flex flex-col items-center justify-center p-4",
    "rounded-md border border-neutral-200 dark:border-neutral-800",
    "transition-colors duration-100 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/20",
  )}
>
  <!-- Image -->
  {#if wordmarkSvg == true && svgInfo.wordmark !== undefined}
    <img
      class={cn("hidden dark:block", globalImageStyles)}
      src={typeof svgInfo.wordmark !== "string"
        ? svgInfo.wordmark?.dark || ""
        : svgInfo.wordmark || ""}
      alt={svgInfo.title}
      title={svgInfo.title}
      loading="lazy"
    />
    <img
      class={cn("block dark:hidden", globalImageStyles)}
      src={typeof svgInfo.wordmark !== "string"
        ? svgInfo.wordmark?.light || ""
        : svgInfo.wordmark || ""}
      alt={svgInfo.title}
      title={svgInfo.title}
      loading="lazy"
    />
  {:else}
    <img
      class={cn("hidden dark:block", globalImageStyles)}
      src={typeof svgInfo.route !== "string"
        ? svgInfo.route.dark
        : svgInfo.route}
      alt={svgInfo.title}
      title={svgInfo.title}
      loading="lazy"
    />
    <img
      class={cn("block dark:hidden", globalImageStyles)}
      src={typeof svgInfo.route !== "string"
        ? svgInfo.route.light
        : svgInfo.route}
      alt={svgInfo.title}
      title={svgInfo.title}
      loading="lazy"
    />
  {/if}
  <!-- Title -->
  <div class="mb-3 flex flex-col items-center justify-center space-y-1">
    <p
      class="truncate text-center text-[15px] font-medium text-balance select-all"
    >
      {svgInfo.title}
    </p>
    <div class="flex items-center justify-center space-x-1">
      {#if Array.isArray(svgInfo.category)}
        {#each svgInfo.category.slice(0, maxVisibleCategories) as c, index}
          <a
            href={`/directory/${c.toLowerCase()}`}
            class={badgeVariants({ variant: "outline" })}
            title={`This icon is part of the ${svgInfo.category} category`}
          >
            {c}
          </a>
        {/each}

        {#if svgInfo.category.length > maxVisibleCategories}
          <Popover.Root
            open={moreTagsOptions}
            onOpenChange={(isOpen) => (moreTagsOptions = isOpen)}
          >
            <Popover.Trigger
              class={badgeVariants({ variant: "outline" })}
              title="More Tags"
            >
              {#if moreTagsOptions}
                <XIcon size={15} strokeWidth={1.5} />
              {:else}
                <EllipsisIcon size={15} strokeWidth={1.5} />
              {/if}
            </Popover.Trigger>
            <Popover.Content class="flex flex-col space-y-2">
              <p class="font-medium">More tags:</p>
              {#each svgInfo.category.slice(maxVisibleCategories) as c}
                <a
                  href={`/directory/${c.toLowerCase()}`}
                  class={cn(buttonVariants({ variant: "outline" }), "w-full")}
                >
                  <TagIcon size={15} strokeWidth={1.5} />
                  <span>{c}</span>
                </a>
              {/each}
            </Popover.Content>
          </Popover.Root>
        {/if}
      {:else}
        <a
          href={`/directory/${svgInfo.category.toLowerCase()}`}
          class={badgeVariants({ variant: "outline" })}
        >
          {svgInfo.category}
        </a>
      {/if}
    </div>
  </div>
  <!-- Actions -->
  <div class="flex items-center space-x-1">
    {#if wordmarkSvg && svgInfo.wordmark !== undefined}
      <CopySvg
        size={iconSize}
        {iconStroke}
        {svgInfo}
        isInFigma={false}
        isWordmarkSvg={true}
      />
    {:else}
      <CopySvg
        size={iconSize}
        {iconStroke}
        {svgInfo}
        isInFigma={false}
        isWordmarkSvg={false}
      />
    {/if}

    <DownloadSvg
      {svgInfo}
      isDarkTheme={() => {
        const dark = document.documentElement.classList.contains("dark");
        return dark;
      }}
    />

    <a
      href={svgInfo.url}
      title="Website"
      target="_blank"
      rel="noopener noreferrer"
      class={buttonVariants({ variant: "ghost" })}
    >
      <LinkIcon size={iconSize} strokeWidth={iconStroke} />
    </a>
    {#if svgInfo.wordmark !== undefined}
      <Button
        title={wordmarkSvg ? "Show logo SVG" : "Show wordmark SVG"}
        onclick={() => {
          wordmarkSvg = !wordmarkSvg;
        }}
        variant="ghost"
        size="icon"
      >
        {#if wordmarkSvg}
          <SparklesIcon size={iconSize} strokeWidth={iconStroke} />
        {:else}
          <BaselineIcon size={iconSize} strokeWidth={iconStroke} />
        {/if}
      </Button>
    {/if}
    {#if svgInfo.brandUrl !== undefined}
      <a
        href={svgInfo.brandUrl}
        title="Brand Assets"
        target="_blank"
        rel="noopener noreferrer"
        class={buttonVariants({ variant: "ghost" })}
      >
        <PaletteIcon size={iconSize} strokeWidth={iconStroke} />
      </a>
    {/if}
  </div>
</div>
