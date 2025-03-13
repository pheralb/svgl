<script lang="ts">
  import { toast } from 'svelte-sonner';

  import * as ContextMenu from '@/ui/context-menu';
  import { ArrowUpRightIcon, CopyIcon, StarsIcon } from 'lucide-svelte';
  import Logo from './icons/logo.svelte';

  import { clipboard } from '@/utils/clipboard';

  import GithubIcon from './icons/githubIcon.svelte';
  import { getSource } from '@/templates/getSource';

  const logoUrl = '/library/svgl.svg';

  const copyToClipboard = async () => {
    const content = await getSource({
      url: logoUrl
    });
    await clipboard(content);
    toast.success('Copied to clipboard', {
      description: `Svgl - Library`
    });
  };

  const openUrl = (url: string) => {
    window.open(url, '_blank');
  };
</script>

<ContextMenu.Root>
  <ContextMenu.Trigger class="flex items-center space-x-2">
    <a href="/" aria-label="Go to the SVGL v4.1 home page">
      <div class="flex items-center space-x-2 opacity-100 transition-opacity hover:opacity-80">
        <svelte:component this={Logo} />
        <span class="hidden text-xl font-medium tracking-tight md:block">svgl</span>
      </div>
    </a>
  </ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Item on:click={() => copyToClipboard()}>
      <CopyIcon size={16} strokeWidth={1.5} />
      <span>Copy as SVG</span>
    </ContextMenu.Item>
    <ContextMenu.Item on:click={() => openUrl('https://github.com/pheralb/svgl')}>
      <GithubIcon iconSize={16} />
      <span>Repository</span>
      <ArrowUpRightIcon class="text-neutral-400 dark:text-neutral-500" size={14} strokeWidth={2} />
    </ContextMenu.Item>
    <ContextMenu.Item disabled class="font-mono">
      <StarsIcon size={16} strokeWidth={1.5} />
      <span>v4.6</span>
    </ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu.Root>
