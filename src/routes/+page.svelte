<script lang="ts">
  import type { iSVG } from '@/types/svg';
  import { cn } from '@/utils/cn';
  import { onMount } from 'svelte';
  import { queryParam } from 'sveltekit-search-params';
  import Fuse from 'fuse.js';

  // Get all svgs:
  import { svgsData } from '@/data';
  const allSvgs = JSON.parse(JSON.stringify(svgsData));

  // Cache sorted arrays
  const latestSorted = [...allSvgs].sort((a, b) => b.id! - a.id!);
  const alphabeticallySorted = [...allSvgs].sort((a, b) => a.title.localeCompare(b.title));

  // Fuzzy search setup:
  const fuse = new Fuse<iSVG>(allSvgs, {
    keys: ['title'],
    threshold: 0.35,
    ignoreLocation: true,
    isCaseSensitive: false,
    shouldSort: true
  });

  // Components:
  import Search from '@/components/search.svelte';
  import Container from '@/components/container.svelte';
  import SvgCard from '@/components/svgCard.svelte';
  import Grid from '@/components/grid.svelte';
  import NotFound from '@/components/notFound.svelte';

  // URL params
  const searchParam = queryParam('search');

  // Icons:
  import { ArrowDown, ArrowDownUpIcon, ArrowUpDownIcon, TrashIcon } from 'lucide-svelte';
  import { buttonStyles } from '@/ui/styles';

  let sorted: boolean = false;
  let showAll: boolean = false;

  // Search:
  let searchTerm = '';
  let filteredSvgs: iSVG[] = [];
  let displaySvgs: iSVG[] = [];
  let maxDisplay = 24;

  const updateDisplaySvgs = () => {
    displaySvgs = showAll ? filteredSvgs : filteredSvgs.slice(0, maxDisplay);
  };

  // Hybrid search strategy:
  // - Simple string matching for queries < 3 chars
  // - Fuzzy search for longer queries (handle typos and partial matches)
  const searchSvgs = () => {
    $searchParam = searchTerm || null;

    if (!searchTerm) {
      filteredSvgs = sorted ? alphabeticallySorted : latestSorted;
      updateDisplaySvgs();
      return;
    }

    if (searchTerm.length < 3) {
      filteredSvgs = allSvgs.filter((svg: iSVG) =>
        svg.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      filteredSvgs = fuse.search(searchTerm).map((result) => result.item);
    }

    updateDisplaySvgs();
  };

  // Clear search:
  const clearSearch = () => {
    searchTerm = '';
    // Use current sort state to determine order
    filteredSvgs = sorted ? alphabeticallySorted : latestSorted;
    updateDisplaySvgs();
  };

  // Sort:
  const sort = () => {
    sorted = !sorted;
    filteredSvgs = sorted ? alphabeticallySorted : latestSorted;
    updateDisplaySvgs();
  };

  onMount(() => {
    if ($searchParam) {
      searchTerm = $searchParam;
    }
    searchSvgs();
  });

  $: {
    if (showAll || filteredSvgs) {
      updateDisplaySvgs();
    }
  }
</script>

<svelte:head>
  <title>A beautiful library with SVG logos - Svgl</title>
</svelte:head>

<Search
  bind:searchTerm
  on:input={searchSvgs}
  clearSearch={() => clearSearch()}
  placeholder={`Search ${allSvgs.length} logos...`}
/>

<Container>
  <div class={cn('mb-4 flex items-center justify-end', searchTerm.length > 0 && 'justify-between')}>
    {#if searchTerm.length > 0}
      <button
        class={cn(
          'flex items-center justify-center space-x-1 rounded-md py-1.5 text-sm font-medium opacity-80 transition-opacity hover:opacity-100',
          filteredSvgs.length === 0 && 'hidden'
        )}
        on:click={() => clearSearch()}
      >
        <TrashIcon size={16} strokeWidth={2} class="mr-1" />
        <span>Clear results</span>
      </button>
    {/if}
    <button
      class={cn(
        'flex items-center justify-center space-x-1 rounded-md py-1.5 text-sm font-medium opacity-80 transition-opacity hover:opacity-100',
        filteredSvgs.length === 0 && 'hidden'
      )}
      on:click={() => sort()}
    >
      {#if sorted}
        <ArrowDownUpIcon size={16} strokeWidth={2} class="mr-1" />
      {:else}
        <ArrowUpDownIcon size={16} strokeWidth={2} class="mr-1" />
      {/if}
      <span>{sorted ? 'Sort by latest' : 'Sort A-Z'}</span>
    </button>
  </div>
  <Grid>
    {#each displaySvgs as svg}
      <SvgCard svgInfo={svg} {searchTerm} />
    {/each}
  </Grid>
  {#if filteredSvgs.length > maxDisplay && !showAll}
    <div class="mt-4 flex items-center justify-center">
      <button
        class={buttonStyles}
        on:click={() => {
          showAll = true;
          updateDisplaySvgs();
        }}
      >
        <div class="relative flex items-center space-x-2">
          <ArrowDown size={16} strokeWidth={2} />
          <span>Load All SVGs</span>
          <span class="opacity-70">
            ({filteredSvgs.length - maxDisplay} more)
          </span>
        </div>
      </button>
    </div>
  {/if}
  {#if filteredSvgs.length === 0}
    <NotFound notFoundTerm={searchTerm} />
  {/if}
</Container>
