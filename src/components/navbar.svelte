<script lang="ts">
  export let currentPath: string;

  import { cn } from '@/utils/cn';
  import Logo from './icons/logo.svelte';
  import Theme from './theme.svelte';

  import { ArrowUpRight, CloudyIcon } from 'lucide-svelte';
  import XIcon from './icons/xIcon.svelte';
  import GithubIcon from './icons/githubIcon.svelte';
  import HeaderLogoLink from './headerLogoLink.svelte';

  const externalLinks = [
    {
      name: 'API',
      url: '/api',
      icon: CloudyIcon,
      external: false,
      label: "Go to the SVGL's API section"
    },
    {
      name: 'Extensions',
      url: 'https://github.com/pheralb/svgl?tab=readme-ov-file#-extensions',
      icon: ArrowUpRight,
      external: true,
      label: "Go to the SVGL's extensions section"
    },
    {
      name: 'Submit logo',
      url: 'https://github.com/pheralb/svgl#-getting-started',
      icon: ArrowUpRight,
      external: true,
      label: "Submit logo and go to the SVGL's getting started section"
    }
  ];
</script>

<nav
  class={cn(
    'dark:bg-neutral-900 bg-white',
    'w-full px-5 py-4 border-b border-neutral-200 dark:border-neutral-800',
    'sticky top-0 z-50',
    'backdrop-blur-md dark:bg-neutral-900/90 bg-white/90'
  )}
>
  <div class="flex items-center justify-between mx-auto">
    <HeaderLogoLink />
    <div class="flex items-center space-x-0 md:space-x-7">
      <div
        class="flex items-center md:space-x-4 divide-x divide-neutral-300 dark:divide-neutral-700"
      >
        {#each externalLinks as link}
          <a
            href={link.url}
            target={link.external ? '_blank' : ''}
            aria-label={link.label ?? link.name}
            class={cn(
              'flex items-center opacity-80 hover:opacity-100 transition-opacity text-[15px] pl-2 md:pl-3 group',
              currentPath === link.url &&
                'underline underline-offset-8 decoration-dotted decoration-neutral-500'
            )}
          >
            {#if !link.external}
              <svelte:component
                this={link.icon}
                size={16}
                strokeWidth={1.5}
                class="mr-2"
                name={link.name}
              />
            {/if}
            <span class={cn('hidden md:block', !link.external && 'block')}>{link.name}</span>
            {#if link.external}
              <svelte:component
                this={link.icon}
                size={16}
                name="External link"
                strokeWidth={1.5}
                class="ml-1 transition-transform duration-300 group-hover:-translate-y-[1px] group-hover:translate-x-[1px] hidden md:block"
              />
            {/if}
          </a>
        {/each}
      </div>
      <div class="flex items-center space-x-4">
        <a
          href="https://twitter.com/pheralb_"
          target="_blank"
          class="flex items-center space-x-1 opacity-80 hover:opacity-100 transition-opacity"
          title="Twitter"
        >
          <XIcon iconSize={16} />
        </a>
        <a
          href="https://github.com/pheralb/svgl"
          target="_blank"
          class="flex items-center space-x-1 opacity-80 hover:opacity-100 transition-opacity"
          title="GitHub"
        >
          <GithubIcon iconSize={19} />
        </a>
        <Theme />
      </div>
    </div>
  </div>
</nav>
