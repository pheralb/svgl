<script lang="ts">
  import type { iSVG } from '@/types/svg';

  import { ClipboardIcon, CopyIcon, Loader, X } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';

  import * as Popover from '@/ui/popover';
  import * as Tabs from '@/ui/tabs';
  import { buttonStyles } from '@/ui/styles';

  // Utils:
  import { cn } from '@/utils/cn';
  import { clipboard } from '@/utils/clipboard';
  import { copyToClipboard as figmaCopyToClipboard } from '@/figma/copy-to-clipboard';

  // Templates:
  import { getSource } from '@/templates/getSource';
  import { getReactCode } from '@/templates/getReactCode';
  import { getVueCode } from '@/templates/getVueCode';
  import { getSvelteCode } from '@/templates/getSvelteCode';
  import { getAngularCode } from '@/templates/getAngularCode';
  import { getWebComponent } from '@/templates/getWebComponent';
  import { getAstroCode } from '@/templates/getAstroCode';

  //Icons:
  import ReactIcon from '@/components/icons/reactIcon.svelte';
  import VueIcon from '@/components/icons/vueIcon.svelte';
  import SvelteIcon from '@/components/icons/svelteIcon.svelte';
  import AngularIcon from '@/components/icons/angularIcon.svelte';
  import WebComponentIcon from '@/components/icons/webComponentIcon.svelte';
  import AstroIcon from '@/components/icons/astroIcon.svelte';

  // Props:
  export let iconSize = 24;
  export let iconStroke = 2;
  export let isInFigma = false;
  export let isWordmarkSvg = false;
  export let svgInfo: iSVG;

  // Variables:
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

    const content = await getSource({
      url: svgUrlToCopy
    });

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
    const content = await getSource({
      url: svgUrlToCopy
    });
    const dataComponent = { code: content, typescript: tsx, name: title };
    const { data, error } = await getReactCode(dataComponent);

    if (error || !data) {
      toast.error('Failed to fetch React component', {
        description: `${error ?? ''}`,
        duration: 5000
      });
      isLoading = false;
      return;
    }

    await clipboard(data);

    toast.success(`Copied as React ${tsx ? 'TSX' : 'JSX'} component`, {
      description: `${svgInfo.title} - ${svgInfo.category}`
    });

    isLoading = false;
  };

  // Copy SVG as Vue Component:
  const convertSvgVueComponent = async (ts: boolean) => {
    try {
      const svgUrlToCopy = getSvgUrl();

      optionsOpen = false;

      const content = await getSource({
        url: svgUrlToCopy
      });

      const copyCode = getVueCode({
        content: content,
        lang: ts ? 'ts' : 'js'
      });

      if (copyCode) {
        await clipboard(copyCode);
      }

      const category = Array.isArray(svgInfo?.category)
        ? svgInfo.category.sort().join(' - ')
        : svgInfo.category;

      toast.success(`Copied as Vue ${ts ? 'TS' : 'JS'} component`, {
        description: `${svgInfo?.title} - ${category}`
      });
    } catch (err) {
      console.error(`Error copying Vue component:`, err);
      toast.error(`Failed to copy Vue component`);
    }
  };

  // Copy SVG as Svelte Component:
  const convertSvgSvelteComponent = async (ts: boolean) => {
    try {
      const svgUrlToCopy = getSvgUrl();

      optionsOpen = false;

      const content = await getSource({
        url: svgUrlToCopy
      });

      const copyCode = getSvelteCode({
        content: content,
        lang: ts ? 'ts' : 'js'
      });

      if (copyCode) {
        await clipboard(copyCode);
      }

      const category = Array.isArray(svgInfo?.category)
        ? svgInfo.category.sort().join(' - ')
        : svgInfo.category;

      toast.success(`Copied as Svelte ${ts ? 'TS' : 'JS'} component`, {
        description: `${svgInfo?.title} - ${category}`
      });
    } catch (err) {
      console.error(`Error copying Svelte component:`, err);
      toast.error(`Failed to copy Svelte component`);
    }
  };

  // Copy SVG as Standalone Angular component:
  const convertSvgAngularComponent = async () => {
    isLoading = true;
    optionsOpen = false;

    const title = svgInfo.title.split(' ').join('');
    const svgUrlToCopy = getSvgUrl();
    const content = await getSource({
      url: svgUrlToCopy
    });

    if (!content) {
      toast.error('Failed to fetch the SVG content', {
        duration: 5000
      });
      isLoading = false;
      return;
    }

    const angularComponent = getAngularCode({
      componentName: title,
      svgContent: content
    });

    await clipboard(angularComponent);

    toast.success(`Copied as Standalone Angular component`, {
      description: `${svgInfo.title} - ${svgInfo.category}`
    });

    isLoading = false;
  };

  // Copy SVG as Web Component:
  const convertSvgWebComponent = async () => {
    isLoading = true;
    optionsOpen = false;

    const title = svgInfo.title.split(' ').join('');
    const svgUrlToCopy = getSvgUrl();
    const content = await getSource({
      url: svgUrlToCopy
    });

    if (!content) {
      toast.error('Failed to fetch the SVG content', {
        duration: 5000
      });
      isLoading = false;
      return;
    }

    const webComponentCode = getWebComponent({
      name: title,
      content: content
    });

    await clipboard(webComponentCode);

    toast.success(`Copied as Web Component`, {
      description: `${svgInfo.title} - ${svgInfo.category}`
    });

    isLoading = false;
  };

  // Copy SVG as Astro component:
  const convertSvgAstroComponent = async () => {
    isLoading = true;
    optionsOpen = false;

    const svgUrlToCopy = getSvgUrl();
    const content = await getSource({
      url: svgUrlToCopy
    });

    if (!content) {
      toast.error('Failed to fetch the SVG content', {
        duration: 5000
      });
      isLoading = false;
      return;
    }

    const astroComponentCode = getAstroCode({
      svgContent: content
    });

    await clipboard(astroComponentCode);

    toast.success(`Copied as Astro Component`, {
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
  <Popover.Content class="flex flex-col space-y-2 p-4" sideOffset={2}>
    <Tabs.Root value="source" class="flex w-full flex-col space-y-1">
      <Tabs.List>
        <Tabs.Trigger value="source">Source</Tabs.Trigger>
        <div
          class="ml-3 flex flex-row space-x-0.5 border-l border-dashed border-neutral-200 pl-3 dark:border-neutral-800"
        >
          <Tabs.Trigger value="web-component" title="Web Component">
            <WebComponentIcon iconSize={21} />
          </Tabs.Trigger>
          <Tabs.Trigger value="react" title="React">
            <ReactIcon iconSize={20} />
          </Tabs.Trigger>
          <Tabs.Trigger value="vue" title="Vue">
            <VueIcon iconSize={20} />
          </Tabs.Trigger>
          <Tabs.Trigger value="svelte" title="Svelte">
            <SvelteIcon iconSize={20} />
          </Tabs.Trigger>
          <Tabs.Trigger value="angular" title="Angular">
            <AngularIcon iconSize={20} />
          </Tabs.Trigger>
          <Tabs.Trigger value="astro" title="Astro" class="text-black dark:text-white">
            <AstroIcon iconSize={21} />
          </Tabs.Trigger>
        </div>
      </Tabs.List>
      <Tabs.Content value="source">
        <section class="flex flex-col space-y-2">
          <button
            class={cn(buttonStyles, 'w-full rounded-md')}
            title={isWordmarkSvg ? 'Copy wordmark SVG to clipboard' : 'Copy SVG to clipboard'}
            on:click={() => copyToClipboard()}
          >
            <ClipboardIcon size={16} strokeWidth={2} />
            <span>Copy SVG</span>
          </button>
        </section>
      </Tabs.Content>
      <Tabs.Content value="react">
        <section class="flex flex-col space-y-2">
          <button
            class={cn(buttonStyles, 'w-full rounded-md')}
            title="Copy as React component"
            disabled={isLoading}
            on:click={() => convertSvgReactComponent(true)}
          >
            <ReactIcon iconSize={18} />
            <span>Copy TSX</span>
          </button>
          <button
            class={cn(buttonStyles, 'w-full rounded-md')}
            title="Copy as React component"
            disabled={isLoading}
            on:click={() => convertSvgReactComponent(false)}
          >
            <ReactIcon iconSize={18} />
            <span>Copy JSX</span>
          </button>
        </section>
      </Tabs.Content>
      <Tabs.Content value="svelte">
        <section class="flex flex-col space-y-2">
          <button
            class={cn(buttonStyles, 'w-full rounded-md')}
            title="Copy as Svelte component"
            disabled={isLoading}
            on:click={() => convertSvgSvelteComponent(false)}
          >
            <SvelteIcon iconSize={18} />
            <span>Copy JS</span>
          </button>

          <button
            class={cn(buttonStyles, 'w-full rounded-md')}
            title="Copy as Svelte component"
            disabled={isLoading}
            on:click={() => convertSvgSvelteComponent(true)}
          >
            <SvelteIcon iconSize={18} />
            <span>Copy TS</span>
          </button>
        </section>
      </Tabs.Content>
      <Tabs.Content value="vue">
        <section class="flex flex-col space-y-2">
          <button
            class={cn(buttonStyles, 'w-full rounded-md')}
            title="Copy as Vue component"
            disabled={isLoading}
            on:click={() => convertSvgVueComponent(false)}
          >
            <VueIcon iconSize={18} />
            <span>Copy JS</span>
          </button>
          <button
            class={cn(buttonStyles, 'w-full rounded-md')}
            title="Copy as Vue component"
            disabled={isLoading}
            on:click={() => convertSvgVueComponent(true)}
          >
            <VueIcon iconSize={18} />
            <span>Copy TS</span>
          </button>
        </section>
      </Tabs.Content>
      <Tabs.Content value="angular">
        <section class="flex flex-col space-y-2">
          <button
            class={cn(buttonStyles, 'w-full rounded-md')}
            title="Copy as Standalone Component"
            disabled={isLoading}
            on:click={() => convertSvgAngularComponent()}
          >
            <AngularIcon iconSize={18} />
            <span>Copy Standalone Component</span>
          </button>
        </section>
      </Tabs.Content>
      <Tabs.Content value="web-component">
        <section class="flex flex-col space-y-2">
          <button
            class={cn(buttonStyles, 'w-full rounded-md')}
            title="Copy as Web Component"
            disabled={isLoading}
            on:click={() => convertSvgWebComponent()}
          >
            <WebComponentIcon iconSize={18} />
            <span>Copy Web Component</span>
          </button>
        </section>
      </Tabs.Content>
      <Tabs.Content value="astro">
        <section class="flex flex-col space-y-2">
          <button
            class={cn(buttonStyles, 'w-full rounded-md')}
            title="Copy as Astro Component"
            disabled={isLoading}
            on:click={() => convertSvgAstroComponent()}
          >
            <AstroIcon iconSize={18} />
            <span>Copy Astro Component</span>
          </button>
        </section>
      </Tabs.Content>
    </Tabs.Root>
    <div
      class="mt-1 flex w-full items-center text-center text-[12px] text-neutral-600 dark:text-neutral-400"
    >
      <p>
        Remember to request permission from the creators for the use of the SVG. Modification is not
        allowed.
      </p>
    </div>
  </Popover.Content>
</Popover.Root>
