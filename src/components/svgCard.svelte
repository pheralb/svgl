<script lang="ts">
  import type { iSVG } from '@/types/svg';

  // Utils:
  import { cn } from '@/utils/cn';
  import { getSvgContent } from '@/utils/getSvgContent';

  // Icons:
  import { LinkIcon, ChevronsRight, Baseline, Sparkles } from 'lucide-svelte';

  // Components & styles:
  import DownloadSvg from './downloadSvg.svelte';
  import CopySvg from './copySvg.svelte';
  import { badgeStyles } from '@/ui/styles';

  // Figma
  import { onMount } from 'svelte';
  import { insertSVG as figmaInsertSVG } from '@/figma/insert-svg';

  // Props:
  export let svgInfo: iSVG;

  let isInFigma = false;
  onMount(() => {
    const searchParams = new URLSearchParams(window.location.search);
    isInFigma = searchParams.get('figma') === '1';
  });

  // Wordmark SVG:
  let wordmarkSvg = false;

  const insertSVG = async (url?: string) => {
    const content = (await getSvgContent(url)) as string;
    figmaInsertSVG(content);
  };

  // Icon Stroke & Size:
  let iconStroke = 1.8;
  let iconSize = 16;

  // Global Images Styles:
  const globalImageStyles = 'mb-4 mt-2 h-10 select-none';
</script>

<div
  class="flex flex-col items-center justify-center rounded-md p-4 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/20 transition-colors duration-100 group"
>
  <!-- Image -->
  {#if wordmarkSvg == true}
    <img
      class={cn('hidden dark:block', globalImageStyles)}
      src={typeof svgInfo.wordmark !== 'string'
        ? svgInfo.wordmark?.dark || ''
        : svgInfo.wordmark || ''}
      alt={svgInfo.title}
      title={svgInfo.title}
      loading="lazy"
    />
    <img
      class={cn('block dark:hidden', globalImageStyles)}
      src={typeof svgInfo.wordmark !== 'string'
        ? svgInfo.wordmark?.light || ''
        : svgInfo.wordmark || ''}
      alt={svgInfo.title}
      title={svgInfo.title}
      loading="lazy"
    />
  {:else}
    <img
      class={cn('hidden dark:block', globalImageStyles)}
      src={typeof svgInfo.route !== 'string' ? svgInfo.route.dark : svgInfo.route}
      alt={svgInfo.title}
      title={svgInfo.title}
      loading="lazy"
    />
    <img
      class={cn('block dark:hidden', globalImageStyles)}
      src={typeof svgInfo.route !== 'string' ? svgInfo.route.light : svgInfo.route}
      alt={svgInfo.title}
      title={svgInfo.title}
      loading="lazy"
    />
  {/if}
  <!-- Title -->
  <div class="mb-3 flex flex-col space-y-1 items-center justify-center">
    <p class="truncate text-[15px] font-medium text-balance text-center select-all">
      {svgInfo.title}
    </p>
    <div class="flex items-center space-x-1 justify-center">
      {#if Array.isArray(svgInfo.category)}
        {#each svgInfo.category.sort() as c, index}
          <a href={`/directory/${c.toLowerCase()}`} class={badgeStyles}>{c} </a>
        {/each}
      {:else}
        <a href={`/directory/${svgInfo.category.toLowerCase()}`} class={badgeStyles}>
          {svgInfo.category}
        </a>
      {/if}
    </div>
  </div>
  <!-- Actions -->
  <div class="flex items-center space-x-1">
    {#if isInFigma}
      <button
        title="Insert to figma"
        on:click={() => {
          const svgHasTheme = typeof svgInfo.route !== 'string';

          if (!svgHasTheme) {
            insertSVG(
              typeof svgInfo.route === 'string'
                ? svgInfo.route
                : "Something went wrong. Couldn't copy the SVG."
            );
            return;
          }

          const dark = document.documentElement.classList.contains('dark');

          insertSVG(
            typeof svgInfo.route !== 'string'
              ? dark
                ? svgInfo.route.dark
                : svgInfo.route.light
              : svgInfo.route
          );
        }}
        class="flex items-center space-x-2 rounded-md p-2 duration-100 hover:bg-neutral-200 dark:hover:bg-neutral-700/40"
      >
        <ChevronsRight size={iconSize} strokeWidth={iconStroke} />
      </button>
    {/if}

    {#if wordmarkSvg}
      <CopySvg {iconSize} {iconStroke} {svgInfo} isInFigma={false} isWordmarkSvg={true} />
    {:else}
      <CopySvg {iconSize} {iconStroke} {svgInfo} isInFigma={false} isWordmarkSvg={false} />
    {/if}

    <DownloadSvg
      {svgInfo}
      isDarkTheme={() => {
        const dark = document.documentElement.classList.contains('dark');
        return dark;
      }}
    />

    <a
      href={svgInfo.url}
      title="Website"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center space-x-2 rounded-md p-2 duration-100 hover:bg-neutral-200 dark:hover:bg-neutral-700/40"
    >
      <LinkIcon size={iconSize} strokeWidth={iconStroke} />
    </a>
    {#if svgInfo.wordmark !== undefined}
      <button
        title={wordmarkSvg ? 'Show logo SVG' : 'Show wordmark SVG'}
        on:click={() => {
          wordmarkSvg = !wordmarkSvg;
        }}
        class="flex items-center space-x-2 rounded-md p-2 duration-100 hover:bg-neutral-200 dark:hover:bg-neutral-700/40"
      >
        {#if wordmarkSvg}
          <Sparkles size={iconSize} strokeWidth={iconStroke} />
        {:else}
          <Baseline size={iconSize} strokeWidth={iconStroke} />
        {/if}
      </button>
    {/if}
  </div>
</div>
