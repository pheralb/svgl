<script lang="ts">
  import { globals } from "@/globals";

  import { buttonVariants } from "@/components/ui/button";
  import SearchIcon from "@lucide/svelte/icons/search";
  import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";

  import BoxesIcon from "@/components/ui/moving-icons/boxes-icon.svelte";
  import InternalLink from "@/components/ui/links/internal-link.svelte";
  import ExternalLink from "@/components/ui/links/external-link.svelte";

  interface Props {
    svgTitle: string;
    category?: string;
    searchGlobally?: boolean;
  }

  let { svgTitle, category, searchGlobally }: Props = $props();
</script>

<div class="flex w-full flex-col items-center justify-center space-y-4 py-6">
  <BoxesIcon size={48} strokeWidth={1} />
  <h2 class="text-xl font-semibold">SVG not found</h2>
  {#if category}
    <p class="text-neutral-600 dark:text-neutral-400">
      "{svgTitle}" not found in "{category}" category
    </p>
  {:else}
    <p class="text-neutral-600 dark:text-neutral-400">
      "{svgTitle}" not found
    </p>
  {/if}
  <div class="flex items-center justify-center space-x-2">
    {#if category || searchGlobally}
      <InternalLink
        href={`/?search=${svgTitle}`}
        className={buttonVariants({ variant: "outline" })}
      >
        <SearchIcon size={14} strokeWidth={1.5} />
        <span>Search globally</span>
      </InternalLink>
    {/if}
    <ExternalLink
      href={globals.requestSvgUrl}
      className={buttonVariants({ variant: "outline" })}
    >
      <span>Request SVG</span>
      <ArrowUpRight size={14} strokeWidth={1.5} />
    </ExternalLink>
    <ExternalLink
      href={globals.submitUrl}
      className={buttonVariants({ variant: "outline" })}
    >
      <span>Submit SVG</span>
      <ArrowUpRight size={14} strokeWidth={1.5} />
    </ExternalLink>
  </div>
</div>
