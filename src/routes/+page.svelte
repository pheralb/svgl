<script lang="ts">
  import type { iSVG } from '@/types/svg';
  import { cn } from '@/utils/cn';

  // Get all svgs:
  import { svgsData } from '@/data';
  const allSvgs = JSON.parse(JSON.stringify(svgsData));

  // Components:
  import Search from '@/components/search.svelte';
  import Container from '@/components/container.svelte';
  import SvgCard from '@/components/svgCard.svelte';
  import Grid from '@/components/grid.svelte';
  import NotFound from '@/components/notFound.svelte';
  import { ArrowDownUpIcon, ArrowUpDownIcon } from 'lucide-svelte';

  let sorted: boolean = false;

  // Search:
  let searchTerm = '';
  let filteredSvgs: iSVG[] = [];

  // Order by last added:

  if (searchTerm.length === 0) {
    filteredSvgs = allSvgs.sort((a: iSVG, b: iSVG) => {
      return b.id! - a.id!;
    });
  }

  // Search svgs:
  const searchSvgs = () => {
    return (filteredSvgs = allSvgs.filter((svg: iSVG) => {
      let svgTitle = svg.title.toLowerCase();
      return svgTitle.includes(searchTerm.toLowerCase());
    }));
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
    filteredSvgs = allSvgs.sort((a: iSVG, b: iSVG) => {
      return b.id! - a.id!;
    });
  };
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
        'flex items-center justify-center space-x-1 rounded-md px-3 py-1.5 text-sm font-medium',
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
    {#each filteredSvgs as svg}
      <SvgCard svgInfo={svg} />
    {/each}
  </Grid>
  {#if filteredSvgs.length === 0}
    <NotFound notFoundTerm={searchTerm} />
  {/if}
</Container>
