<script lang="ts">
  import type { iSVG } from '@/types/svg';
  import JSZip from 'jszip';
  import download from 'downloadjs';
  import { toast } from 'svelte-sonner';
  import { DownloadIcon } from 'lucide-svelte';
  import { getSource } from '@/templates/getSource';

  import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
  } from '@/ui/dialog';
  import { buttonStyles } from '@/ui/styles';
  import { cn } from '@/utils/cn';

  // Props:
  export let svgInfo: iSVG;
  export let isDarkTheme: () => boolean;

  // Shared:
  let iconStroke = 1.8;
  let iconSize = 16;
  let mainDownloadStyles =
    'flex items-center space-x-2 rounded-md p-2 duration-100 hover:bg-neutral-200 dark:hover:bg-neutral-700/40';
  let cardDownloadStyles =
    'flex w-full h-full flex-col p-4 rounded-md shadow-sm dark:bg-neutral-800/20 bg-neutral-200/10 border border-neutral-200 dark:border-neutral-800 space-y-2';

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
  const downloadAllVariants = async ({
    lightRoute,
    darkRoute,
    isWordmark
  }: {
    lightRoute: string;
    darkRoute: string;
    isWordmark?: boolean;
  }) => {
    const zip = new JSZip();

    const lightSvg = await getSource({
      url: lightRoute
    });
    const darkSvg = await getSource({
      url: darkRoute
    });

    if (isWordmark) {
      zip.file(`${svgInfo.title}_wordmark_light.svg`, lightSvg);
      zip.file(`${svgInfo.title}_wordmark_dark.svg`, darkSvg);
    } else {
      zip.file(`${svgInfo.title}_light.svg`, lightSvg);
      zip.file(`${svgInfo.title}_dark.svg`, darkSvg);
    }

    zip.generateAsync({ type: 'blob' }).then((content) => {
      download(
        content,
        isWordmark ? `${svgInfo.title}_wordmark_light_dark.zip` : `${svgInfo.title}_light_dark.zip`,
        'application/zip'
      );
    });

    const category = Array.isArray(svgInfo.category)
      ? svgInfo.category.sort().join(' - ')
      : svgInfo.category;

    toast.success('Downloading light & dark variants...', {
      description: isWordmark
        ? `${svgInfo.title} - Wordmark - ${category}`
        : `${svgInfo.title} - ${category}`
    });
  };
</script>

{#if typeof svgInfo.route === 'string' && svgInfo.wordmark === undefined}
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
        <DialogTitle>Download {svgInfo.title} SVG</DialogTitle>
        <DialogDescription>This logo has multiple options to download:</DialogDescription>
      </DialogHeader>
      <div
        class={cn(
          'flex h-full flex-col space-y-2 pb-0.5 pt-4',
          'md:flex-row md:items-center md:justify-center md:space-x-2 md:space-y-0'
        )}
      >
        {#if typeof svgInfo.route === 'string'}
          <div class={cardDownloadStyles}>
            <img
              src={isDarkTheme() ? svgInfo.route : svgInfo.route}
              alt={svgInfo.title}
              class="my-4 h-8"
            />
            <button
              title="Download logo"
              class={buttonStyles}
              on:click={() => {
                if (typeof svgInfo.route === 'string') {
                  downloadSvg(svgInfo.route);
                  return;
                }
              }}
            >
              <DownloadIcon class="mr-2" size={iconSize} />
              <p>Icon logo</p>
            </button>
          </div>
        {:else}
          <div class={cardDownloadStyles}>
            <img
              src={isDarkTheme() ? svgInfo.route.dark : svgInfo.route.light}
              alt={svgInfo.title}
              class="my-4 h-10"
            />
            <button
              title="Logo with light & dark variants"
              class={buttonStyles}
              on:click={() => {
                if (typeof svgInfo.route !== 'string') {
                  downloadAllVariants({
                    lightRoute: svgInfo.route.light,
                    darkRoute: svgInfo.route.dark
                  });
                }
              }}
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
        {/if}

        {#if typeof svgInfo.wordmark === 'string' && svgInfo.wordmark !== undefined}
          <div class={cardDownloadStyles}>
            <img
              src={isDarkTheme() ? svgInfo.wordmark : svgInfo.wordmark}
              alt={svgInfo.title}
              class="my-4 h-8"
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
              class="my-4 h-10"
            />
            <button
              title="Download Wordmark light variant"
              class={buttonStyles}
              on:click={() => {
                if (typeof svgInfo.wordmark !== 'string') {
                  downloadAllVariants({
                    lightRoute: svgInfo.wordmark?.light || '',
                    darkRoute: svgInfo.wordmark?.dark || '',
                    isWordmark: true
                  });
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
      <DialogFooter class="mt-3 text-xs text-neutral-600 dark:text-neutral-400">
        <p>
          Remember to request permission from the creators for the use of the SVG. Modification is
          not allowed.
        </p>
      </DialogFooter>
    </DialogContent>
  </Dialog>
{/if}
