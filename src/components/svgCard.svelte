<script lang="ts">
  import type { iSVG } from '../types/svg';
  import download from 'downloadjs';
  import { toast } from 'svelte-sonner';
  import { MIMETYPE, getSvgContent } from '../utils/getSvgContent';

  // Icons:
  import { CopyIcon, DownloadIcon, LinkIcon } from 'lucide-svelte';

  // Main Card:
  import CardSpotlight from './cardSpotlight.svelte';

  // Props:
  export let svgInfo: iSVG;

  // Download SVG:
  const downloadSvg = (url?: string) => {
    download(url || '');
    toast.success('Downloading...');
  };

  // Copy SVG to clipboard:
  const copyToClipboard = async (url?: string) => {
    const data = {
      [MIMETYPE]: getSvgContent(url, true)
    };
    try {
      const clipboardItem = new ClipboardItem(data);
      await navigator.clipboard.write([clipboardItem]);
    } catch (error) {
      const content = (await getSvgContent(url, false)) as string;
      await navigator.clipboard.writeText(content);
    }
    toast.success('Copied to clipboard!', {
      description: `${svgInfo.title} - ${svgInfo.category}`
    });
  };

  // Icon Stroke & Size:
  let iconStroke = 1.8;
  let iconSize = 16;
</script>

<CardSpotlight>
  <div class="flex flex-col items-center justify-center rounded-md p-4">
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
    <div class="mb-3 flex flex-col items-center justify-center">
      <p class="truncate text-[15px] font-medium text-balance text-center">{svgInfo.title}</p>
      <a
        href={`/directory/${svgInfo.category.toLowerCase()}`}
        class="text-sm lowercase text-neutral-500 hover:underline">{svgInfo.category}</a
      >
    </div>
    <div class="flex items-center space-x-1">
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
      <button
        title="Download"
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
        class="flex items-center space-x-2 rounded-md p-2 duration-100 hover:bg-neutral-200 dark:hover:bg-neutral-700/40"
      >
        <DownloadIcon size={iconSize} strokeWidth={iconStroke} />
      </button>
      <a
        href={svgInfo.url}
        title="Website"
        target="_blank"
        class="flex items-center space-x-2 rounded-md p-2 duration-100 hover:bg-neutral-200 dark:hover:bg-neutral-700/40"
      >
        <LinkIcon size={iconSize} strokeWidth={iconStroke} />
      </a>
    </div>
  </div>
</CardSpotlight>
