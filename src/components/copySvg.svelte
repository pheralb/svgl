<script lang="ts">
  import type { iSVG } from '@/types/svg';

  import { ClipboardIcon, CopyIcon, Loader, X } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';
  import * as Popover from '@/ui/popover';

  // Utils:
  import { getSvgContent } from '@/utils/getSvgContent';
  import { getReactComponentCode } from '@/utils/getReactComponentCode';
  import { clipboard } from '@/utils/clipboard';
  import { copyToClipboard as figmaCopyToClipboard } from '@/figma/copy-to-clipboard';
  import { buttonStyles } from '@/ui/styles';
  import { cn } from '@/utils/cn';
  import ReactIcon from './reactIcon.svelte';

  // Props:
  export let iconSize = 24;
  export let iconStroke = 2;
  export let isInFigma = false;
  export let isWordmarkSvg = false;
  export let svgInfo: iSVG;
  let optionsOpen = false;
  let isLoading = false;

  const getSvgUrl = () => {
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

    return svgUrlToCopy;
  };

  // Copy SVG to clipboard:
  const copyToClipboard = async () => {
    const svgUrlToCopy = getSvgUrl();
    optionsOpen = false;

    const content = await getSvgContent(svgUrlToCopy);
    if (isInFigma) {
      figmaCopyToClipboard(content);
    }

    await clipboard(content);

    const category = Array.isArray(svgInfo.category)
      ? svgInfo.category.sort().join(' - ')
      : svgInfo.category;

    if (isInFigma) {
      toast.success('Ready to paste in Figma', {
        description: `${svgInfo.title} - ${category}`
      });
      return;
    }

    if (isWordmarkSvg) {
      toast.success('Copied wordmark SVG to clipboard', {
        description: `${svgInfo.title} - ${category}`
      });
      return;
    }

    toast.success('Copied to clipboard', {
      description: `${svgInfo.title} - ${category}`
    });
  };

  // Convert SVG as React component:
  const convertSvgReactComponent = async (tsx: boolean) => {
    const svgUrlToCopy = getSvgUrl();
    optionsOpen = false;

    isLoading = true;

    const title = svgInfo.title.split(' ').join('');
    const content = await getSvgContent(svgUrlToCopy);
    const dataComponent = { code: content, typescript: tsx, name: title };
    const { data, error } = await getReactComponentCode(dataComponent);

    if (error || !data) {
      toast.error('Failed to fetch React component', {
        description: `${error ?? ''}`,
        duration: 5000
      });
      return;
    }

    await clipboard(data);

    toast.success(`Copied as React ${tsx ? 'TSX' : 'JSX'} component`, {
      description: `${svgInfo.title} - ${svgInfo.category}`
    });

    isLoading = false;
  };
</script>

<Popover.Root open={optionsOpen} onOpenChange={(isOpen) => (optionsOpen = isOpen)}>
  <Popover.Trigger
    title="Copy SVG element as svg file, React TSX code, or React JSX code"
    class="flex items-center space-x-2 rounded-md p-2 duration-100 hover:bg-neutral-200 dark:hover:bg-neutral-700/40"
  >
    {#if optionsOpen}
      <X size={iconSize} strokeWidth={iconStroke} />
    {:else if isLoading}
      <Loader size={iconSize} strokeWidth={iconStroke} class="animate-spin" />
    {:else}
      <CopyIcon size={iconSize} strokeWidth={iconStroke} />
    {/if}
  </Popover.Trigger>
  <Popover.Content class="flex flex-col space-y-2" sideOffset={0.3}>
    <button
      class={cn(buttonStyles, 'rounded-md w-full')}
      title={isWordmarkSvg ? 'Copy wordmark SVG to clipboard' : 'Copy SVG to clipboard'}
      on:click={() => copyToClipboard()}
    >
      <ClipboardIcon size={16} strokeWidth={2} />
      <span>Copy SVG</span>
    </button>
    <button
      class={cn(buttonStyles, 'rounded-md w-full')}
      title="Copy as React component"
      disabled={isLoading}
      on:click={() => convertSvgReactComponent(true)}
    >
      <ReactIcon iconSize={18} color="#2563eb" />
      <span>Copy TSX</span>
    </button>
    <button
      class={cn(buttonStyles, 'rounded-md w-full')}
      title="Copy as React component"
      disabled={isLoading}
      on:click={() => convertSvgReactComponent(false)}
    >
      <ReactIcon iconSize={18} color="#60a5fa" />
      <span>Copy JSX</span>
    </button>
  </Popover.Content>
</Popover.Root>
