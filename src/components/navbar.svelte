<script>
  import { cn } from '@/utils/cn';
  import Logo from './logo.svelte';
  import { ArrowUpRight, CloudyIcon, GithubIcon, TwitterIcon } from 'lucide-svelte';
  import Theme from './theme.svelte';

  const socials = [
    {
      name: 'Twitter',
      url: 'https://twitter.com/pheralb_',
      icon: GithubIcon
    },
    {
      name: 'GitHub',
      url: 'https://github.com/pheralb/svgl',
      icon: TwitterIcon
    }
  ];

  const links = [
    {
      name: 'API',
      url: '/api',
      icon: CloudyIcon,
      external: false
    },
    {
      name: 'Submit logo',
      url: 'https://github.com/pheralb/svgl#-getting-started',
      icon: ArrowUpRight,
      external: true
    }
  ];
</script>

<nav
  class={cn(
    'dark:bg-neutral-900 bg-neutral-100',
    'w-full px-5 py-4 border-b border-neutral-200 dark:border-neutral-800',
    'sticky top-0 z-50',
    'backdrop-blur-md opacity-95'
  )}
>
  <div class="flex items-center justify-between mx-auto">
    <div class="flex items-center space-x-2">
      <a href="/">
        <div class="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <svelte:component this={Logo} />
          <span class="text-[19px] font-medium tracking-wide">svgl</span>
          <p class="text-neutral-500">v4.0.0</p>
        </div>
      </a>
    </div>
    <div class="flex items-center space-x-7">
      <div class="flex items-center space-x-4 divide-x divide-neutral-300 dark:divide-neutral-700">
        {#each links as link}
          <a
            href={link.url}
            target={link.external ? '_blank' : '_self'}
            class="flex items-center hover:opacity-80 transition-opacity text-[15px] pl-3"
          >
            {#if !link.external}
              <svelte:component this={link.icon} size={16} strokeWidth={1.5} class="mr-2" />
            {/if}
            <span>{link.name}</span>
            {#if link.external}
              <svelte:component this={link.icon} size={16} strokeWidth={1.5} class="ml-1" />
            {/if}
          </a>
        {/each}
      </div>
      <div class="flex items-center space-x-3">
        {#each socials as social}
          <a
            href={social.url}
            target="_blank"
            class="flex items-center space-x-1 hover:opacity-80 transition-opacity"
          >
            <svelte:component this={social.icon} size={20} strokeWidth={1.5} />
          </a>
        {/each}
        <Theme />
      </div>
    </div>
  </div>
</nav>
