<script lang="ts">
  import type { iSVG } from '@/types/svg';
  import { cn } from '@/utils/cn';
  import { queryParam } from 'sveltekit-search-params';

  // Get all svgs:
  import { svgsData } from '@/data';
  const allSvgs = JSON.parse(JSON.stringify(svgsData));

  // Components:
  import Search from '@/components/search.svelte';
  import Container from '@/components/container.svelte';
  import SvgCard from '@/components/svgCard.svelte';
  import Grid from '@/components/grid.svelte';
  import NotFound from '@/components/notFound.svelte';

  // URL params
  const searchParam = queryParam('search');

  // Icons:
  import { ArrowDown, ArrowDownUpIcon, ArrowUpDownIcon } from 'lucide-svelte';
  import { buttonStyles } from '@/ui/styles';

  let sorted: boolean = false;
  let isFirstLoad: boolean = true;
  let showAll: boolean = false;

  // Search:
  let searchTerm = $searchParam || '';
  let filteredSvgs: iSVG[] = [];

  // Order by last added:
  if (searchTerm.length === 0) {
    filteredSvgs = allSvgs.sort((a: iSVG, b: iSVG) => {
      return b.id! - a.id!;
    });
  }

  const loadSvgs = () => {
    if (isFirstLoad || showAll) {
      filteredSvgs = allSvgs;
      isFirstLoad = false;
    } else {
      filteredSvgs = allSvgs.slice(0, 30);
    }
  };

  // Search svgs:
  const searchSvgs = () => {
    $searchParam = searchTerm || null;
    loadSvgs();
    filteredSvgs = allSvgs.filter((svg: iSVG) => {
      let svgTitle = svg.title.toLowerCase();
      return svgTitle.includes(searchTerm.toLowerCase());
    });
  };

  // Clear search:
  const clearSearch = () => {
    searchTerm = '';
    searchSvgs();
  };

  // Sort:
  const sort = () => {
    if (sorted) {
      sortByLatest();
    } else {
      sortAlphabetically();
    }
    sorted = !sorted;
  };

  // Sort alphabetically:
  const sortAlphabetically = () => {
    filteredSvgs = allSvgs.sort((a: iSVG, b: iSVG) => {
      return a.title.localeCompare(b.title);
    });
  };

  // Sort by latest:
  const sortByLatest = () => {
    filteredSvgs = filteredSvgs.sort((a: iSVG, b: iSVG) => {
      return b.id! - a.id!;
    });
  };

  if ($searchParam) {
    searchSvgs();
  } else {
    loadSvgs();
  }
</script>

<svelte:head>
  <title>A beautiful library with SVG logos - Svgl</title>
</svelte:head>

<Search
  bind:searchTerm
  on:input={searchSvgs}
  clearSearch={() => clearSearch()}
  placeholder={`Search ${filteredSvgs.length} logos...`}
/>

<Container>
  <div class="flex items-center justify-end mb-4">
    <button
      class={cn(
        'flex items-center justify-center space-x-1 rounded-md px-3 py-1.5 text-sm font-medium opacity-80 hover:opacity-100 transition-opacity',
        filteredSvgs.length === 0 && 'hidden'
      )}
      on:click={() => sort()}
    >
      {#if sorted}
        <ArrowDownUpIcon size={16} strokeWidth={2} class="mr-1" />
      {:else}
        <ArrowUpDownIcon size={16} strokeWidth={2} class="mr-1" />
      {/if}
      <span>{sorted ? 'Sort by latest' : 'Sort alphabetically'}</span>
    </button>
  </div>
  <Grid>
    {#each filteredSvgs.slice(0, showAll ? undefined : 30) as svg}
      <SvgCard svgInfo={svg} />
    {/each}
  </Grid>
  {#if filteredSvgs.length > 30 && !showAll}
    <div class="flex items-center justify-center mt-4">
      <button class={buttonStyles} on:click={() => (showAll = true)}>
        <div class="flex items-center space-x-2 relative">
          <ArrowDown size={16} strokeWidth={2} />
          <span>Load All SVGs</span>
          <span class="opacity-70">
            ({filteredSvgs.length - 30} more)
          </span>
        </div>
      </button>
    </div>
  {/if}
  {#if filteredSvgs.length === 0}
    <NotFound notFoundTerm={searchTerm} />
  {/if}
</Container>
