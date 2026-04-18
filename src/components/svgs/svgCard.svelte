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
  import InternalLink from "@/components/ui/links/internal-link.svelte";
  import ExternalLink from "@/components/ui/links/external-link.svelte";

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
  // onload, the "loaded" class will be added to parent the image, which will trigger the transition to show the image and hide the skeleton
  const onImageLoad = (e: Event) => {
    const target = e.currentTarget as HTMLImageElement;
    target?.parentElement?.classList.add("loaded");
  };
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
  <div class="group relative flex place-content-center">
    {#if wordmarkSvg && svgInfo.wordmark !== undefined}
      <img
        loading="lazy"
        class={cn(
          "dark:group-[.loaded]:size-initial size-0 opacity-0 dark:group-[.loaded]:w-auto dark:group-[.loaded]:opacity-100",
          globalImageStyles,
        )}
        src={getSvgImgUrl({ url: svgInfo.wordmark, isDark: true })}
        alt={svgInfo.title}
        title={svgInfo.title}
        height="40"
        onload={onImageLoad}
      />
      <img
        loading="lazy"
        class={cn(
          "group-[.loaded]:size-initial size-0 opacity-0 group-[.loaded]:w-auto group-[.loaded]:opacity-100 dark:size-0 dark:opacity-0",
          globalImageStyles,
        )}
        src={getSvgImgUrl({ url: svgInfo.wordmark, isDark: false })}
        alt={svgInfo.title}
        title={svgInfo.title}
        height="40"
        onload={onImageLoad}
      />
    {:else}
      <img
        loading="lazy"
        class={cn(
          "dark:group-[.loaded]:size-initial size-0 opacity-0 dark:group-[.loaded]:w-auto dark:group-[.loaded]:opacity-100",
          globalImageStyles,
        )}
        src={getSvgImgUrl({ url: svgInfo.route, isDark: true })}
        alt={svgInfo.title}
        title={svgInfo.title}
        height="40"
        onload={onImageLoad}
      />
      <img
        loading="lazy"
        class={cn(
          "group-[.loaded]:size-initial size-0 opacity-0 group-[.loaded]:w-auto group-[.loaded]:opacity-100 dark:size-0 dark:opacity-0",
          globalImageStyles,
        )}
        src={getSvgImgUrl({ url: svgInfo.route, isDark: false })}
        alt={svgInfo.title}
        title={svgInfo.title}
        height="40"
        onload={onImageLoad}
      />
    {/if}
    <!-- skeleton -->
    <div
      role="status"
      class={cn(
        "absolute flex w-10 animate-pulse space-y-8 group-[.loaded]:animate-none group-[.loaded]:opacity-0 md:items-center md:space-y-0 md:space-x-8 rtl:space-x-reverse",
        globalImageStyles,
      )}
    >
      <!-- picture -->
      <svg
        class="text-fg-disabled h-11 w-11"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        ><path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
        /></svg
      >
    </div>
  </div>
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
          <InternalLink
            href={`/directory/${c.toLowerCase()}`}
            className={badgeVariants({
              variant: "outline",
              class:
                "cursor-pointer font-mono hover:border-neutral-400 dark:hover:border-neutral-600",
            })}
            title={`This icon is part of the ${svgInfo.category} category`}
          >
            {c}
          </InternalLink>
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
                <InternalLink
                  href={`/directory/${c.toLowerCase()}`}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full justify-start",
                  )}
                >
                  <TagIcon size={15} strokeWidth={1.5} />
                  <span>{c}</span>
                </InternalLink>
              {/each}
            </Popover.Content>
          </Popover.Root>
        {/if}
      {:else}
        <InternalLink
          href={`/directory/${svgInfo.category.toLowerCase()}`}
          className={badgeVariants({
            variant: "outline",
            class:
              "cursor-pointer font-mono hover:border-neutral-400 dark:hover:border-neutral-600",
          })}
        >
          {svgInfo.category}
        </InternalLink>
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

    <ExternalLink
      href={svgInfo.url}
      title="Website"
      className={buttonVariants({
        size: "icon",
        variant: "ghost",
        class: "hover:bg-neutral-200",
      })}
    >
      <LinkIcon size={iconSize} strokeWidth={iconStroke} />
    </ExternalLink>
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
