<script lang="ts">
  import { toast } from 'svelte-sonner';

  import * as ContextMenu from '@/ui/context-menu';
  import { CopyIcon } from 'lucide-svelte';
  import Logo from './icons/logo.svelte';
  import ReactIcon from './icons/reactIcon.svelte';

  import { clipboard } from '@/utils/clipboard';
  import { getSvgContent } from '@/utils/getSvgContent';
  import { getReactComponentCode } from '@/utils/getReactComponentCode';

  const logoUrl = '/library/svgl.svg';

  const copyToClipboard = async () => {
    const content = await getSvgContent(logoUrl);
    await clipboard(content);
    toast.success('Copied to clipboard', {
      description: `Svgl - Library`
    });
  };

  let isLoading = false;

  const convertSvgReactComponent = async (tsx: boolean) => {
    isLoading = true;

    const title = 'svgl';
    const content = await getSvgContent(logoUrl);
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
      description: `Svgl - Library`
    });

    isLoading = false;
  };
</script>

<ContextMenu.Root>
  <ContextMenu.Trigger class="flex items-center space-x-2">
    <a href="/" aria-label="Go to the SVGL v4.1 home page">
      <div class="flex items-center space-x-2 opacity-100 transition-opacity hover:opacity-80">
        <svelte:component this={Logo} />
        <span class="hidden text-[19px] font-medium tracking-wide md:block">svgl</span>
        <p class="hidden font-mono tracking-tight text-neutral-400 md:block">4.4</p>
      </div>
    </a>
  </ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Item on:click={() => copyToClipboard()}>
      <CopyIcon size={16} strokeWidth={2} />
      <span>Copy as SVG</span>
    </ContextMenu.Item>
    <ContextMenu.Item on:click={() => convertSvgReactComponent(false)}>
      <ReactIcon iconSize={18} color="#60a5fa" />
      <span>Copy as React JSX Component</span>
    </ContextMenu.Item>
    <ContextMenu.Item on:click={() => convertSvgReactComponent(true)}>
      <ReactIcon iconSize={18} color="#2563eb" />
      <span>Copy as React TSX Component</span>
    </ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu.Root>
