<script lang="ts">
  import type { iSVG } from "@/types/svg";

  import { cn } from "@/utils/cn";
  import { mode } from "mode-watcher";
  import { getSvgImgUrl } from "@/data";

  // Icons:
  import XIcon from "@lucide/svelte/icons/x";
  import TagIcon from "@lucide/svelte/icons/tag";
  import LinkIcon from "@lucide/svelte/icons/link";
  import PaletteIcon from "@lucide/svelte/icons/palette";
  import SparklesIcon from "@lucide/svelte/icons/sparkles";
  import BaselineIcon from "@lucide/svelte/icons/baseline";
  import EllipsisIcon from "@lucide/svelte/icons/ellipsis";

  // UI Components:
  import * as Popover from "@/components/ui/popover";
  import { badgeVariants } from "@/components/ui/badge";
  import { Button, buttonVariants } from "@/components/ui/button";

  // Components:
  import CopySvg from "@/components/svgs/copySvg.svelte";
  import DownloadSvg from "@/components/svgs/downloadSvg.svelte";
  import AddToFavorite from "@/components/svgs/addToFavorite.svelte";

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
  const globalImageStyles = "mb-4 mt-1.5 h-10 select-none pointer-events-none";
</script>

<div
  class={cn(
    "flex flex-col items-center justify-center px-3.5 py-3",
    "rounded-md border border-neutral-200 dark:border-neutral-800",
    "hover:bg-neutral-100/80 dark:hover:bg-neutral-800/20",
  )}
>
  <!-- Image Options -->
  <div class="flex w-full items-center justify-end space-x-3 pb-0.5">
    {#if svgInfo.brandUrl !== undefined}
      <a
        href={svgInfo.brandUrl}
        title="Brand Assets"
        target="_blank"
        rel="noopener noreferrer"
        class={cn(
          "cursor-pointer transition-colors",
          "text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white",
        )}
      >
        <PaletteIcon size={iconSize} strokeWidth={iconStroke} />
      </a>
    {/if}
    <AddToFavorite svg={svgInfo} />
  </div>
  <!-- Image -->
  {#if wordmarkSvg && svgInfo.wordmark !== undefined}
    <img
      loading="lazy"
      class={cn("hidden dark:block", globalImageStyles)}
      src={getSvgImgUrl({ url: svgInfo.wordmark, isDark: true })}
      alt={svgInfo.title}
      title={svgInfo.title}
      height="40"
    />
    <img
      loading="lazy"
      class={cn("block dark:hidden", globalImageStyles)}
      src={getSvgImgUrl({ url: svgInfo.wordmark, isDark: false })}
      alt={svgInfo.title}
      title={svgInfo.title}
      height="40"
    />
  {:else}
    <img
      loading="lazy"
      class={cn("hidden dark:block", globalImageStyles)}
      src={getSvgImgUrl({ url: svgInfo.route, isDark: true })}
      alt={svgInfo.title}
      title={svgInfo.title}
      height="40"
    />
    <img
      loading="lazy"
      class={cn("block dark:hidden", globalImageStyles)}
      src={getSvgImgUrl({ url: svgInfo.route, isDark: false })}
      alt={svgInfo.title}
      title={svgInfo.title}
      height="40"
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
        {#each svgInfo.category.slice(0, maxVisibleCategories) as c (c)}
          <a
            href={`/directory/${c.toLowerCase()}`}
            class={badgeVariants({
              variant: "outline",
              class:
                "cursor-pointer font-mono hover:border-neutral-400 dark:hover:border-neutral-600",
            })}
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
              class={badgeVariants({
                variant: "outline",
                class:
                  "cursor-pointer font-mono hover:border-neutral-400 dark:hover:border-neutral-600",
              })}
              title="More Tags"
            >
              {#if moreTagsOptions}
                <XIcon size={15} strokeWidth={1.5} />
              {:else}
                <EllipsisIcon size={15} strokeWidth={1.5} />
              {/if}
            </Popover.Trigger>
            <Popover.Content class="flex w-auto flex-col space-y-2">
              <p class="font-medium">More tags</p>
              {#each svgInfo.category.slice(maxVisibleCategories) as c (c)}
                <a
                  href={`/directory/${c.toLowerCase()}`}
                  class={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full justify-start",
                  )}
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
          class={badgeVariants({
            variant: "outline",
            class:
              "cursor-pointer font-mono hover:border-neutral-400 dark:hover:border-neutral-600",
          })}
        >
          {svgInfo.category}
        </a>
      {/if}
    </div>
  </div>
  <!-- Actions -->
  <div class="flex items-center space-x-0.5">
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

    <DownloadSvg {svgInfo} isDarkTheme={() => mode.current === "dark"} />

    <a
      href={svgInfo.url}
      title="Website"
      target="_blank"
      rel="noopener noreferrer"
      class={buttonVariants({
        size: "icon",
        variant: "ghost",
        class: "hover:bg-neutral-200",
      })}
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
        class="hover:bg-neutral-200"
      >
        {#if wordmarkSvg}
          <SparklesIcon size={iconSize} strokeWidth={iconStroke} />
        {:else}
          <BaselineIcon size={iconSize} strokeWidth={iconStroke} />
        {/if}
      </Button>
    {/if}
  </div>
</div>
