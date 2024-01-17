<script lang="ts">
  import type { iSVG } from '../types/svg';

  import download from 'downloadjs';
  import { toast } from 'svelte-sonner';
  import jszip from 'jszip';

  // Utils:
  import { MIMETYPE, getSvgContent } from '@/utils/getSvgContent';
  import { flyAndScale } from '@/utils/flyAndScale';

  // Icons:
  import {
    CopyIcon,
    DownloadIcon,
    LinkIcon,
    PackageIcon,
    PaintBucket,
    ChevronsRight,
    Baseline
  } from 'lucide-svelte';

  // Main Card:
  import CardSpotlight from './cardSpotlight.svelte';
  import { DropdownMenu } from 'bits-ui';

  // Figma
  import { onMount } from 'svelte';
  import { copyToClipboard as figmaCopyToClipboard } from '@/figma/copy-to-clipboard';
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

  // Download SVG:
  const downloadSvg = (url?: string) => {
    download(url || '');

    const category = Array.isArray(svgInfo.category)
      ? svgInfo.category.sort().join(' - ')
      : svgInfo.category;

    toast.success(`Downloading...`, {
      description: `${svgInfo.title} - ${category}`
    });
  };

  // Download all variants:
  const downloadAllVariants = async ({ route }: iSVG) => {
    const zip = new jszip();

    if (typeof route === 'string') {
      downloadSvg(route);
      return;
    }

    const lightSvg = await getSvgContent(route.light, false);
    const darkSvg = await getSvgContent(route.dark, false);

    zip.file(`${svgInfo.title}.svg`, lightSvg);
    zip.file(`${svgInfo.title}.dark.svg`, darkSvg);

    if (svgInfo.wordmark) {
      if (typeof svgInfo.wordmark === 'string') {
        downloadSvg(svgInfo.wordmark);
        return;
      }

      const lightWordmarkSvg = await getSvgContent(svgInfo.wordmark.light, false);
      const darkWordmarkSvg = await getSvgContent(svgInfo.wordmark.dark, false);

      zip.file(`${svgInfo.title}.wordmark.svg`, lightWordmarkSvg);
      zip.file(`${svgInfo.title}.wordmark.dark.svg`, darkWordmarkSvg);
    }

    zip.generateAsync({ type: 'blob' }).then((content) => {
      download(content, `${svgInfo.title}.zip`, 'application/zip');
    });

    const category = Array.isArray(svgInfo.category)
      ? svgInfo.category.sort().join(' - ')
      : svgInfo.category;

    toast.success('Downloading light & dark variants...', {
      description: `${svgInfo.title} - ${category}`
    });
  };

  // Copy SVG to clipboard:
  const copyToClipboard = async (url?: string) => {
    const data = {
      [MIMETYPE]: getSvgContent(url, true)
    };

    if (isInFigma) {
      const content = (await getSvgContent(url, false)) as string;
      figmaCopyToClipboard(content);
    }

    try {
      const clipboardItem = new ClipboardItem(data);
      await navigator.clipboard.write([clipboardItem]);
    } catch (error) {
      const content = (await getSvgContent(url, false)) as string;
      await navigator.clipboard.writeText(content);
    }

    const category = Array.isArray(svgInfo.category)
      ? svgInfo.category.sort().join(' - ')
      : svgInfo.category;

    if (isInFigma) {
      toast.success('Ready to paste in Figma!', {
        description: `${svgInfo.title} - ${category}`
      });
      return;
    }

    if (wordmarkSvg) {
      toast.success('Copied wordmark SVG to clipboard!', {
        description: `${svgInfo.title} - ${category}`
      });
      return;
    }

    toast.success('Copied to clipboard!', {
      description: `${svgInfo.title} - ${category}`
    });
  };

  const insertSVG = async (url?: string) => {
    const content = (await getSvgContent(url, false)) as string;
    figmaInsertSVG(content);
  };

  // Icon Stroke & Size:
  let iconStroke = 1.8;
  let iconSize = 16;
</script>

<CardSpotlight>
  <div class="flex flex-col items-center justify-center rounded-md p-4">
    <!-- Image -->
    {#if wordmarkSvg == true}
      <img
        class="hidden dark:block mb-4 mt-2 h-10"
        src={typeof svgInfo.wordmark !== 'string'
          ? svgInfo.wordmark?.dark || ''
          : svgInfo.wordmark || ''}
        alt={svgInfo.title}
        title={svgInfo.title}
        loading="lazy"
      />
      <img
        class="block dark:hidden mb-4 mt-2 h-10"
        src={typeof svgInfo.wordmark !== 'string'
          ? svgInfo.wordmark?.light || ''
          : svgInfo.wordmark || ''}
        alt={svgInfo.title}
        title={svgInfo.title}
        loading="lazy"
      />
    {:else}
      <img
        class="hidden dark:block mb-4 mt-2 h-10"
        src={typeof svgInfo.route !== 'string' ? svgInfo.route.dark : svgInfo.route}
        alt={svgInfo.title}
        title={svgInfo.title}
        loading="lazy"
      />
      <img
        class="block dark:hidden mb-4 mt-2 h-10"
        src={typeof svgInfo.route !== 'string' ? svgInfo.route.light : svgInfo.route}
        alt={svgInfo.title}
        title={svgInfo.title}
        loading="lazy"
      />
    {/if}
    <!-- Title -->
    <div class="mb-3 flex flex-col items-center justify-center">
      <p class="truncate text-[15px] font-medium text-balance text-center select-all">
        {svgInfo.title}
      </p>
      <div class="flex flex-wrap justify-center">
        {#if Array.isArray(svgInfo.category)}
          {#each svgInfo.category.sort() as c, index}
            <a
              href={`/directory/${c.toLowerCase()}`}
              class="text-sm lowercase text-neutral-500 hover:underline font-mono">{c}</a
            >
            {#if index < svgInfo.category.length - 1}
              <span class="text-neutral-500">.</span>
            {/if}
          {/each}
        {:else}
          <a
            href={`/directory/${svgInfo.category.toLowerCase()}`}
            class="text-sm lowercase text-neutral-500 hover:underline font-mono"
            >{svgInfo.category}</a
          >
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
        <button
          title="Copy wordmark SVG to clipboard"
          on:click={() => {
            const svgHasTheme = typeof svgInfo.wordmark !== 'string';

            if (!svgHasTheme) {
              copyToClipboard(
                typeof svgInfo.wordmark === 'string'
                  ? svgInfo.wordmark
                  : "Something went wrong. Couldn't copy the SVG."
              );
              return;
            }

            const dark = document.documentElement.classList.contains('dark');

            copyToClipboard(
              typeof svgInfo.wordmark !== 'string'
                ? dark
                  ? svgInfo.wordmark?.dark
                  : svgInfo.wordmark?.light
                : svgInfo.wordmark
            );
          }}
          class="flex items-center space-x-2 rounded-md p-2 duration-100 hover:bg-neutral-200 dark:hover:bg-neutral-700/40"
        >
          <CopyIcon size={iconSize} strokeWidth={iconStroke} />
        </button>
      {:else}
        <button
          title="Copy to clipboard"
          on:click={() => {
            const svgHasTheme = typeof svgInfo.route !== 'string';

            if (!svgHasTheme) {
              copyToClipboard(
                typeof svgInfo.route === 'string'
                  ? svgInfo.route
                  : "Something went wrong. Couldn't copy the SVG."
              );
              return;
            }

            const dark = document.documentElement.classList.contains('dark');

            copyToClipboard(
              typeof svgInfo.route !== 'string'
                ? dark
                  ? svgInfo.route.dark
                  : svgInfo.route.light
                : svgInfo.route
            );
          }}
          class="flex items-center space-x-2 rounded-md p-2 duration-100 hover:bg-neutral-200 dark:hover:bg-neutral-700/40"
        >
          <CopyIcon size={iconSize} strokeWidth={iconStroke} />
        </button>
      {/if}

      {#if typeof svgInfo.route !== 'string'}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger
            title="Download SVG"
            class="flex items-center space-x-2 rounded-md p-2 duration-100 hover:bg-neutral-200 dark:hover:bg-neutral-700/40"
          >
            <DownloadIcon size={iconSize} strokeWidth={iconStroke} />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            class="w-full shadow-md max-w-[229px] rounded-md border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-1 py-1.5 shadow-popover"
            transition={flyAndScale}
            sideOffset={3}
          >
            <DropdownMenu.Item
              title="Download Light & Dark variants"
              class="flex h-10 select-none items-center rounded-md py-3 pl-3 pr-1.5 text-sm font-medium cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700/40"
              on:click={() => {
                downloadAllVariants(svgInfo);
              }}
            >
              <PackageIcon class="mr-2" size={18} />
              <p>Light & dark variants</p>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              title="Download only {document.documentElement.classList.contains('dark')
                ? 'dark'
                : 'light'} variant"
              class="flex h-10 select-none items-center rounded-md py-3 pl-3 pr-1.5 text-sm font-medium cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700/40"
              on:click={() => {
                const svgHasTheme = typeof svgInfo.route !== 'string';

                if (!svgHasTheme) {
                  downloadSvg(
                    typeof svgInfo.route === 'string'
                      ? svgInfo.route
                      : "Something went wrong. Couldn't copy the SVG."
                  );
                  return;
                }

                const dark = document.documentElement.classList.contains('dark');

                downloadSvg(
                  typeof svgInfo.route !== 'string'
                    ? dark
                      ? svgInfo.route.dark
                      : svgInfo.route.light
                    : svgInfo.route
                );
              }}
            >
              <PaintBucket class="mr-2" size={18} />
              Only {document.documentElement.classList.contains('dark') ? 'dark' : 'light'} variant
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      {:else}
        <button
          title="Download SVG"
          on:click={() => {
            if (typeof svgInfo.route === 'string') downloadSvg(svgInfo.route);
          }}
          class="flex items-center space-x-2 rounded-md p-2 duration-100 hover:bg-neutral-200 dark:hover:bg-neutral-700/40"
        >
          <DownloadIcon size={iconSize} strokeWidth={iconStroke} />
        </button>
      {/if}
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
          title="Show wordmark SVG"
          on:click={() => {
            wordmarkSvg = !wordmarkSvg;
          }}
          class="flex items-center space-x-2 rounded-md p-2 duration-100 hover:bg-neutral-200 dark:hover:bg-neutral-700/40"
        >
          <Baseline size={iconSize} strokeWidth={iconStroke} />
        </button>
      {/if}
    </div>
  </div>
</CardSpotlight>
