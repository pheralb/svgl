<script lang="ts">
  import type { iSVG } from '@/types/svg';

  import { CopyIcon } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';

  // Utils:
  import { MIMETYPE, getSvgContent } from '@/utils/getSvgContent';
  import { copyToClipboard as figmaCopyToClipboard } from '@/figma/copy-to-clipboard';

  // Props:
  export let iconSize = 24;
  export let iconStroke = 2;
  export let isInFigma = false;
  export let isWordmarkSvg = false;
  export let svgInfo: iSVG;

  // Copy SVG to clipboard:
  const copyToClipboard = async () => {
    let svgUrlToCopy;
    const dark = document.documentElement.classList.contains('dark');

    if (isWordmarkSvg) {
      const svgHasTheme = typeof svgInfo.wordmark !== 'string';
      if (!svgHasTheme) {
        svgUrlToCopy =
          typeof svgInfo.wordmark === 'string'
            ? svgInfo.wordmark
            : "Something went wrong. Couldn't copy the SVG.";
      }

      svgUrlToCopy =
        typeof svgInfo.wordmark !== 'string'
          ? dark
            ? svgInfo.wordmark?.dark
            : svgInfo.wordmark?.light
          : svgInfo.wordmark;
    } else {
      const svgHasTheme = typeof svgInfo.route !== 'string';
      if (!svgHasTheme) {
        svgUrlToCopy =
          typeof svgInfo.route === 'string'
            ? svgInfo.route
            : "Something went wrong. Couldn't copy the SVG.";
      }
      svgUrlToCopy =
        typeof svgInfo.route !== 'string'
          ? dark
            ? svgInfo.route.dark
            : svgInfo.route.light
          : svgInfo.route;
    }

    const data = {
      [MIMETYPE]: getSvgContent(svgUrlToCopy, true)
    };

    if (isInFigma) {
      const content = (await getSvgContent(svgUrlToCopy, false)) as string;
      figmaCopyToClipboard(content);
    }

    try {
      const clipboardItem = new ClipboardItem(data);
      await navigator.clipboard.write([clipboardItem]);
    } catch (error) {
      const content = (await getSvgContent(svgUrlToCopy, false)) as string;
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

    if (isWordmarkSvg) {
      toast.success('Copied wordmark SVG to clipboard!', {
        description: `${svgInfo.title} - ${category}`
      });
      return;
    }

    toast.success('Copied to clipboard!', {
      description: `${svgInfo.title} - ${category}`
    });
  };
</script>

<button
  title={isWordmarkSvg ? 'Copy wordmark SVG to clipboard' : 'Copy SVG to clipboard'}
  on:click={() => copyToClipboard()}
  class="flex items-center space-x-2 rounded-md p-2 duration-100 hover:bg-neutral-200 dark:hover:bg-neutral-700/40"
>
  <CopyIcon size={iconSize} strokeWidth={iconStroke} />
</button>
