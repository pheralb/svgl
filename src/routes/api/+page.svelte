<script>
  import { cn } from '@/utils/cn';
  export let data;
</script>

<svelte:head>
  <title>{data.meta.title} - SVGL</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
  <meta property="og:description" content={data.meta.description} />
</svelte:head>

<section
  class="bg-white dark:bg-neutral-900 bg-[url('/images/hero-pattern_light.svg')] dark:bg-[url('/images/hero-pattern_dark.svg')]"
>
  <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-20 z-10 relative">
    <div class="flex items-center space-x-4 text-center justify-center">
      <h1
        class="mb-4 text-4xl font-bold tracking-tight leading-none text-neutral-900 md:text-5xl lg:text-6xl dark:text-white"
      >
        API Reference
      </h1>
      <span class="relative inline-block overflow-hidden rounded-full p-[1px] shadow-sm">
        <span
          class="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#f4f4f5_0%,#f4f4f5_50%,#737373_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#121212_0%,#121212_50%,#737373_100%)]"
        />
        <div
          class="inline-flex h-full w-full cursor-default items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900 px-3 py-1 text-xs font-medium dark:text-white backdrop-blur-3xl border border-neutral-100 dark:border-neutral-800 font-mono"
        >
          beta
        </div>
      </span>
    </div>
    <p class="text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
      The API reference is a detailed documentation of all the endpoints available in the API.
    </p>
  </div>
</section>

<article
  class={cn(
    'prose dark:prose-invert',
    'mx-auto py-10 px-4 max-w-3xl',
    'prose-h2:font-medium',
    'prose-pre:m-0'
  )}
>
  <svelte:component this={data.content} />
</article>
