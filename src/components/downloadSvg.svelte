<script lang="ts">
  import type { iSVG } from '@/types/svg';
  import JSZip from 'jszip';
  import download from 'downloadjs';
  import { toast } from 'svelte-sonner';
  import { DownloadIcon } from 'lucide-svelte';
  import { getSvgContent } from '@/utils/getSvgContent';
  import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
  } from '@/ui/dialog';
  import { buttonStyles } from '@/ui/styles';

  // Props:
  export let svgInfo: iSVG;
  export let isDarkTheme: () => boolean;

  // Shared:
  let iconStroke = 1.8;
  let iconSize = 16;
  let mainDownloadStyles =
    'flex items-center space-x-2 rounded-md p-2 duration-100 hover:bg-neutral-200 dark:hover:bg-neutral-700/40';
  let cardDownloadStyles =
    'mt-5 flex w-full flex-col space-y-2 p-4 rounded-md shadow-sm dark:bg-neutral-800/20 bg-neutral-200/10 border border-neutral-200 dark:border-neutral-800';

  // Functions:
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
    const zip = new JSZip();

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
</script>

{#if typeof svgInfo.route === 'string'}
  <button
    title="Download Light & Dark variants"
    class={mainDownloadStyles}
    on:click={() => {
      if (typeof svgInfo.route === 'string') {
        downloadSvg(svgInfo.route);
        return;
      }
    }}
  >
    <DownloadIcon size={iconSize} strokeWidth={iconStroke} />
  </button>
{:else}
  <Dialog>
    <DialogTrigger title="Download SVG" class={mainDownloadStyles}>
      <DownloadIcon size={iconSize} strokeWidth={iconStroke} />
    </DialogTrigger>
    <DialogContent class="max-w-[630px]">
      <DialogHeader>
        <DialogTitle>Download {svgInfo.title}</DialogTitle>
        <DialogDescription>This logo has multiple options to download.</DialogDescription>
      </DialogHeader>

      <div class="flex w-full items-center space-x-2">
        <div class={cardDownloadStyles}>
          <img
            src={isDarkTheme() ? svgInfo.route.dark : svgInfo.route.light}
            alt={svgInfo.title}
            class="h-8 my-4"
          />
          <button
            title="Logo with light & dark variants"
            class={buttonStyles}
            on:click={() => downloadAllVariants(svgInfo)}
          >
            <DownloadIcon size={iconSize} />
            <p>Light & dark variants</p>
          </button>

          <button
            title="Download light variant"
            class={buttonStyles}
            on:click={() => {
              if (typeof svgInfo.route !== 'string') {
                downloadSvg(svgInfo.route.light);
                return;
              }
            }}
          >
            <DownloadIcon class="mr-2" size={iconSize} />
            Only light variant
          </button>

          <button
            title="Download dark variant"
            class={buttonStyles}
            on:click={() => {
              if (typeof svgInfo.route !== 'string') {
                downloadSvg(svgInfo.route.dark);
                return;
              }
            }}
          >
            <DownloadIcon class="mr-2" size={iconSize} />
            Only dark variant
          </button>
        </div>

        {#if typeof svgInfo.wordmark === 'string' && svgInfo.wordmark !== undefined}
          <div class={cardDownloadStyles}>
            <img
              src={isDarkTheme() ? svgInfo.wordmark : svgInfo.wordmark}
              alt={svgInfo.title}
              class="h-8 my-4"
            />
            <button
              title="Download Wordmark logo"
              class={buttonStyles}
              on:click={() => {
                if (typeof svgInfo.wordmark === 'string') {
                  downloadSvg(svgInfo.wordmark);
                  return;
                }
              }}
            >
              <DownloadIcon class="mr-2" size={iconSize} />
              <p>Wordmark logo</p>
            </button>
          </div>
        {/if}

        {#if typeof svgInfo.wordmark !== 'string' && svgInfo.wordmark !== undefined}
          <div class={cardDownloadStyles}>
            <img
              src={isDarkTheme() ? svgInfo.wordmark.dark : svgInfo.wordmark.light}
              alt={svgInfo.title}
              class="h-8 my-4"
            />
            <button
              title="Download Wordmark light variant"
              class={buttonStyles}
              on:click={() => {
                if (typeof svgInfo.wordmark !== 'string') {
                  downloadAllVariants(svgInfo);
                  return;
                }
              }}
            >
              <DownloadIcon class="mr-2" size={iconSize} />
              Light & dark variants
            </button>

            <button
              title="Download Wordmark light variant"
              class={buttonStyles}
              on:click={() => {
                if (typeof svgInfo.wordmark !== 'string') {
                  downloadSvg(svgInfo.wordmark?.light);
                  return;
                }
              }}
            >
              <DownloadIcon class="mr-2" size={iconSize} />
              Wordmark light variant
            </button>

            <button
              title="Download Wordmark dark variant"
              class={buttonStyles}
              on:click={() => {
                if (typeof svgInfo.wordmark !== 'string') {
                  downloadSvg(svgInfo.wordmark?.dark);
                  return;
                }
              }}
            >
              <DownloadIcon class="mr-2" size={iconSize} />
              Wordmark dark variant
            </button>
          </div>
        {/if}
      </div>
    </DialogContent>
  </Dialog>
{/if}
