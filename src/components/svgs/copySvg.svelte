<script lang="ts">
  import type { iSVG } from "@/types/svg";

  // Utils:
  import { cn } from "@/utils/cn";
  import { clipboard } from "@/utils/clipboard";
  import { getPrefixFromSvgUrl, prefixSvgIds } from "@/utils/prefixSvgIds";
  import { copyToClipboard as figmaCopyToClipboard } from "@/figma/copy-to-clipboard";
  import { settingsStore } from "@/stores/settings.store";

  // Icons:
  import XIcon from "@lucide/svelte/icons/x";
  import CopyIcon from "@lucide/svelte/icons/copy";
  import LoaderIcon from "@lucide/svelte/icons/loader";
  import ClipboardIcon from "@lucide/svelte/icons/clipboard";

  // UI Components:
  import { toast } from "svelte-sonner";
  import { Separator } from "@/components/ui/separator";
  import * as Tabs from "@/components/ui/tabs";
  import { Button, buttonVariants } from "@/components/ui/button";
  import * as Popover from "@/components/ui/popover";

  // CLIs:
  import CopyShadcnCommand from "@/components/svgs/copyShadcnCommand.svelte";

  // Templates:
  import { getSource } from "@/templates/getSource";
  import { getVueCode } from "@/templates/getVueCode";
  import { getReactCode } from "@/templates/getReactCode";
  import { getAstroCode } from "@/templates/getAstroCode";
  import { getSvelteCode } from "@/templates/getSvelteCode";
  import { getAngularCode } from "@/templates/getAngularCode";
  import { getWebComponent } from "@/templates/getWebComponent";

  // SVGs:
  import Vue from "@/components/logos/vue.svelte";
  import React from "@/components/logos/react.svelte";
  import Astro from "@/components/logos/astro.svelte";
  import Svelte from "@/components/logos/svelte.svelte";
  import Shadcn from "@/components/logos/shadcn.svelte";
  import Angular from "@/components/logos/angular.svelte";
  import WebComponents from "@/components/logos/webComponents.svelte";

  // Props:
  interface Props {
    size?: number;
    iconStroke?: number;
    isInFigma?: boolean;
    isWordmarkSvg?: boolean;
    svgInfo: iSVG;
  }

  let {
    size = 24,
    iconStroke = 2,
    isInFigma = false,
    isWordmarkSvg = false,
    svgInfo,
  }: Props = $props();

  // States:
  let optionsOpen = $state<boolean>(false);
  let isLoading = $state<boolean>(false);
  let optimize = $derived($settingsStore.optimizeSvgs);

  const getSvgUrl = () => {
    let svgUrlToCopy;
    const dark = document.documentElement.classList.contains("dark");

    if (isWordmarkSvg) {
      const svgHasTheme = typeof svgInfo.wordmark !== "string";
      if (!svgHasTheme) {
        svgUrlToCopy =
          typeof svgInfo.wordmark === "string"
            ? svgInfo.wordmark
            : "Something went wrong. Couldn't copy the SVG.";
      }

      svgUrlToCopy =
        typeof svgInfo.wordmark !== "string"
          ? dark
            ? svgInfo.wordmark?.dark
            : svgInfo.wordmark?.light
          : svgInfo.wordmark;
    } else {
      const svgHasTheme = typeof svgInfo.route !== "string";
      if (!svgHasTheme) {
        svgUrlToCopy =
          typeof svgInfo.route === "string"
            ? svgInfo.route
            : "Something went wrong. Couldn't copy the SVG.";
      }
      svgUrlToCopy =
        typeof svgInfo.route !== "string"
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

    let content = await getSource({
      url: svgUrlToCopy,
      optimize,
    });

    if (svgUrlToCopy) {
      content = prefixSvgIds(content, getPrefixFromSvgUrl(svgUrlToCopy));
    }

    if (isInFigma) {
      figmaCopyToClipboard(content);
    }

    await clipboard(content);

    const category = Array.isArray(svgInfo.category)
      ? svgInfo.category.sort().join(" - ")
      : svgInfo.category;

    if (isInFigma) {
      toast.success("Ready to paste in Figma", {
        description: `${svgInfo.title} - ${category}`,
      });
      return;
    }

    if (isWordmarkSvg) {
      toast.success("Copied wordmark SVG to clipboard", {
        description: `${svgInfo.title} - ${category}`,
      });
      return;
    }

    toast.success("Copied to clipboard", {
      description: `${svgInfo.title} - ${category}`,
    });
  };

  // Convert SVG as React component:
  const convertSvgReactComponent = async (tsx: boolean) => {
    const svgUrlToCopy = getSvgUrl();
    optionsOpen = false;

    isLoading = true;

    const title = svgInfo.title.split(" ").join("");
    let content = await getSource({
      url: svgUrlToCopy,
      optimize,
    });

    if (svgUrlToCopy) {
      content = prefixSvgIds(content, getPrefixFromSvgUrl(svgUrlToCopy));
    }

    const dataComponent = {
      code: content,
      typescript: tsx,
      name: title,
      optimize,
    };
    const { data, error } = await getReactCode(dataComponent);

    if (error || !data) {
      toast.error("Failed to fetch React component", {
        description: `${error ?? ""}`,
        duration: 5000,
      });
      isLoading = false;
      return;
    }

    await clipboard(data);

    toast.success(`Copied as React ${tsx ? "TSX" : "JSX"} component`, {
      description: `${svgInfo.title} - ${svgInfo.category}`,
    });

    isLoading = false;
  };

  // Copy SVG as Vue Component:
  const convertSvgVueComponent = async (ts: boolean) => {
    try {
      const svgUrlToCopy = getSvgUrl();

      optionsOpen = false;

      let content = await getSource({
        url: svgUrlToCopy,
        optimize,
      });

      if (svgUrlToCopy) {
        content = prefixSvgIds(content, getPrefixFromSvgUrl(svgUrlToCopy));
      }

      const copyCode = getVueCode({
        content: content,
        lang: ts ? "ts" : "js",
      });

      if (copyCode) {
        await clipboard(copyCode);
      }

      const category = Array.isArray(svgInfo?.category)
        ? svgInfo.category.sort().join(" - ")
        : svgInfo.category;

      toast.success(`Copied as Vue ${ts ? "TS" : "JS"} component`, {
        description: `${svgInfo?.title} - ${category}`,
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

      let content = await getSource({
        url: svgUrlToCopy,
        optimize,
      });

      if (svgUrlToCopy) {
        content = prefixSvgIds(content, getPrefixFromSvgUrl(svgUrlToCopy));
      }

      const copyCode = getSvelteCode({
        content: content,
        lang: ts ? "ts" : "js",
      });

      if (copyCode) {
        await clipboard(copyCode);
      }

      const category = Array.isArray(svgInfo?.category)
        ? svgInfo.category.sort().join(" - ")
        : svgInfo.category;

      toast.success(`Copied as Svelte ${ts ? "TS" : "JS"} component`, {
        description: `${svgInfo?.title} - ${category}`,
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

    const title = svgInfo.title.split(" ").join("");
    const svgUrlToCopy = getSvgUrl();
    let content = await getSource({
      url: svgUrlToCopy,
      optimize,
    });

    if (svgUrlToCopy) {
      content = prefixSvgIds(content, getPrefixFromSvgUrl(svgUrlToCopy));
    }

    if (!content) {
      toast.error("Failed to fetch the SVG content", {
        duration: 5000,
      });
      isLoading = false;
      return;
    }

    const angularComponent = getAngularCode({
      componentName: title,
      svgContent: content,
    });

    await clipboard(angularComponent);

    toast.success(`Copied as Standalone Angular component`, {
      description: `${svgInfo.title} - ${svgInfo.category}`,
    });

    isLoading = false;
  };

  // Copy SVG as Web Component:
  const convertSvgWebComponent = async () => {
    isLoading = true;
    optionsOpen = false;

    const title = svgInfo.title.split(" ").join("");
    const svgUrlToCopy = getSvgUrl();
    let content = await getSource({
      url: svgUrlToCopy,
      optimize,
    });

    if (svgUrlToCopy) {
      content = prefixSvgIds(content, getPrefixFromSvgUrl(svgUrlToCopy));
    }

    if (!content) {
      toast.error("Failed to fetch the SVG content", {
        duration: 5000,
      });
      isLoading = false;
      return;
    }

    const webComponentCode = getWebComponent({
      name: title,
      content: content,
    });

    await clipboard(webComponentCode);

    toast.success(`Copied as Web Component`, {
      description: `${svgInfo.title} - ${svgInfo.category}`,
    });

    isLoading = false;
  };

  // Copy SVG as Astro component:
  const convertSvgAstroComponent = async () => {
    isLoading = true;
    optionsOpen = false;

    const svgUrlToCopy = getSvgUrl();
    let content = await getSource({
      url: svgUrlToCopy,
      optimize,
    });

    if (svgUrlToCopy) {
      content = prefixSvgIds(content, getPrefixFromSvgUrl(svgUrlToCopy));
    }

    if (!content) {
      toast.error("Failed to fetch the SVG content", {
        duration: 5000,
      });
      isLoading = false;
      return;
    }

    const astroComponentCode = getAstroCode({
      svgContent: content,
    });

    await clipboard(astroComponentCode);

    toast.success(`Copied as Astro Component`, {
      description: `${svgInfo.title} - ${svgInfo.category}`,
    });

    isLoading = false;
  };
</script>

<Popover.Root bind:open={optionsOpen}>
  <Popover.Trigger
    title="Copy SVG element as svg file, React TSX code, or React JSX code"
    class={cn(
      buttonVariants({
        variant: "ghost",
        size: "icon",
        class: "hover:bg-neutral-200",
      }),
    )}
  >
    {#if optionsOpen}
      <XIcon {size} strokeWidth={iconStroke} />
    {:else if isLoading}
      <LoaderIcon {size} strokeWidth={iconStroke} class="animate-spin" />
    {:else}
      <CopyIcon {size} strokeWidth={iconStroke} />
    {/if}
  </Popover.Trigger>
  <Popover.Content class="flex flex-col space-y-2 p-4" sideOffset={2}>
    <Tabs.Root value="source" class="flex w-full flex-col space-y-1">
      <Tabs.List
        class="flex h-auto w-auto flex-col space-y-2 space-x-0 border-0 md:h-9 md:flex-row md:space-y-0 md:space-x-1"
      >
        <div class="flex items-center space-x-1">
          <Tabs.Trigger value="source">Source</Tabs.Trigger>
          <Tabs.Trigger value="shadcn" title="shadcn/ui">
            <Shadcn size={18} />
          </Tabs.Trigger>
        </div>
        <div class="flex items-center space-x-1">
          <Tabs.Trigger value="web-component" title="Web Component">
            <WebComponents size={21} />
          </Tabs.Trigger>
          <Tabs.Trigger value="react" title="React">
            <React size={20} />
          </Tabs.Trigger>
          <Tabs.Trigger value="vue" title="Vue">
            <Vue size={20} />
          </Tabs.Trigger>
          <Tabs.Trigger value="svelte" title="Svelte">
            <Svelte size={20} />
          </Tabs.Trigger>
          <Tabs.Trigger value="angular" title="Angular">
            <Angular size={20} />
          </Tabs.Trigger>
          <Tabs.Trigger
            value="astro"
            title="Astro"
            class="text-black dark:text-white"
          >
            <Astro size={21} />
          </Tabs.Trigger>
        </div>
      </Tabs.List>
      <Separator class="block md:hidden" />
      <!-- Source -->
      <Tabs.Content value="source">
        <section class="flex flex-col space-y-2">
          <Button
            variant="outline"
            class="justify-start"
            title={isWordmarkSvg
              ? "Copy wordmark SVG to clipboard"
              : "Copy SVG to clipboard"}
            onclick={() => copyToClipboard()}
          >
            <ClipboardIcon size={16} strokeWidth={2} />
            <span>Copy SVG</span>
          </Button>
        </section>
      </Tabs.Content>
      <!-- CLI -->
      <Tabs.Content value="shadcn">
        <section class="flex flex-col space-y-2">
          <CopyShadcnCommand svgTitle={svgInfo.title} />
        </section>
      </Tabs.Content>
      <!-- React -->
      <Tabs.Content value="react">
        <section class="flex flex-col space-y-2">
          <Button
            variant="outline"
            class="justify-start"
            title="Copy as React component"
            disabled={isLoading}
            onclick={() => convertSvgReactComponent(true)}
          >
            <React size={18} />
            <span>Copy TSX</span>
          </Button>
          <Button
            variant="outline"
            class="justify-start"
            title="Copy as React component"
            disabled={isLoading}
            onclick={() => convertSvgReactComponent(false)}
          >
            <React size={18} />
            <span>Copy JSX</span>
          </Button>
        </section>
      </Tabs.Content>
      <!-- Svelte -->
      <Tabs.Content value="svelte">
        <section class="flex flex-col space-y-2">
          <Button
            variant="outline"
            class="justify-start"
            title="Copy as Svelte component"
            disabled={isLoading}
            onclick={() => convertSvgSvelteComponent(false)}
          >
            <Svelte size={18} />
            <span>Copy JS</span>
          </Button>

          <Button
            variant="outline"
            class="justify-start"
            title="Copy as Svelte component"
            disabled={isLoading}
            onclick={() => convertSvgSvelteComponent(true)}
          >
            <Svelte size={18} />
            <span>Copy TS</span>
          </Button>
        </section>
      </Tabs.Content>
      <!-- Vue -->
      <Tabs.Content value="vue">
        <section class="flex flex-col space-y-2">
          <Button
            variant="outline"
            class="justify-start"
            title="Copy as Vue component"
            disabled={isLoading}
            onclick={() => convertSvgVueComponent(false)}
          >
            <Vue size={18} />
            <span>Copy JS</span>
          </Button>
          <Button
            variant="outline"
            class="justify-start"
            title="Copy as Vue component"
            disabled={isLoading}
            onclick={() => convertSvgVueComponent(true)}
          >
            <Vue size={18} />
            <span>Copy TS</span>
          </Button>
        </section>
      </Tabs.Content>
      <!-- Angular -->
      <Tabs.Content value="angular">
        <section class="flex flex-col space-y-2">
          <Button
            variant="outline"
            class="justify-start"
            title="Copy as Standalone Component"
            disabled={isLoading}
            onclick={() => convertSvgAngularComponent()}
          >
            <Angular size={18} />
            <span>Copy Standalone Component</span>
          </Button>
        </section>
      </Tabs.Content>
      <!-- Web Component -->
      <Tabs.Content value="web-component">
        <section class="flex flex-col space-y-2">
          <Button
            variant="outline"
            class="justify-start"
            title="Copy as Web Component"
            disabled={isLoading}
            onclick={() => convertSvgWebComponent()}
          >
            <WebComponents size={18} />
            <span>Copy Web Component</span>
          </Button>
        </section>
      </Tabs.Content>
      <!-- Astro -->
      <Tabs.Content value="astro">
        <section class="flex flex-col space-y-2">
          <Button
            variant="outline"
            class="justify-start"
            title="Copy as Astro Component"
            disabled={isLoading}
            onclick={() => convertSvgAstroComponent()}
          >
            <Astro size={18} />
            <span>Copy Astro Component</span>
          </Button>
        </section>
      </Tabs.Content>
    </Tabs.Root>
    <div
      class="mt-1 flex w-full items-center text-center text-[12px] text-neutral-600 dark:text-neutral-400"
    >
      <p>
        Please ensure you have permission from the creators before using the
        SVG. Modifications are not permitted.
      </p>
    </div>
  </Popover.Content>
</Popover.Root>
