<script lang="ts">
  import type { iSVG } from "@/types/svg";

  import { globals } from "@/globals";
  import { toast } from "svelte-sonner";
  import { refreshAll } from "$app/navigation";
  import { clipboard } from "@/utils/clipboard";

  import { getSource } from "@/templates/getSource";

  import Svgl from "@/components/logos/svgl.svelte";
  import Github from "@/components/logos/github.svelte";
  import * as ContextMenu from "@/components/ui/context-menu";

  import CopyIcon from "@lucide/svelte/icons/copy";
  import BugIcon from "@lucide/svelte/icons/bug";
  import BoxIcon from "@lucide/svelte/icons/box";
  import HeartHandshakeIcon from "@lucide/svelte/icons/heart-handshake";
  import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";

  const svgInfo = {
    title: "Svgl",
    category: "Library",
    route: `/library/svgl.svg`,
    url: "https://svgl.app",
  } as iSVG;

  const copySvgToClipboard = async () => {
    let content = await getSource({
      url: svgInfo.route as string,
      optimize: false,
    });

    await clipboard(content);

    const category = Array.isArray(svgInfo.category)
      ? svgInfo.category.sort().join(" - ")
      : svgInfo.category;

    toast.success("Copied SVG to clipboard", {
      description: `${svgInfo.title} - ${category}`,
    });
  };

  const gotoUrl = (url: string) => {
    window.open(url, "_blank");
  };
</script>

<ContextMenu.Root>
  <ContextMenu.Trigger>
    <a
      href="/"
      class="flex items-center space-x-2 transition-colors hover:text-neutral-700 dark:hover:text-neutral-300"
    >
      <Svgl size={28} />
      <h2 class="text-xl font-medium tracking-tight">svgl</h2>
    </a>
  </ContextMenu.Trigger>
  <ContextMenu.Content class="w-fit">
    <ContextMenu.Item onclick={() => copySvgToClipboard()}>
      <CopyIcon size={14} />
      <span>Copy SVG</span>
    </ContextMenu.Item>
    <ContextMenu.Item
      onclick={() => gotoUrl(`${globals.githubUrl}/issues/new/choose`)}
    >
      <BugIcon size={14} />
      <span>Create Issue</span>
      <ArrowUpRight size={10} />
    </ContextMenu.Item>
    <ContextMenu.Item onclick={() => gotoUrl(globals.submitUrl)}>
      <HeartHandshakeIcon size={14} />
      <span>Contribute</span>
      <ArrowUpRight size={10} />
    </ContextMenu.Item>
    <ContextMenu.Item onclick={() => gotoUrl(globals.githubUrl)}>
      <Github size={14} />
      <span>GitHub Repository</span>
      <ArrowUpRight size={10} />
    </ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu.Root>
