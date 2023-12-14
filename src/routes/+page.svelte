<script lang="ts">
  import type { iSVG } from '@/types/svg';

  // Get all svgs:
  import { svgs } from '@/data/svgs';
  const allSvgs = JSON.parse(JSON.stringify(svgs));

  // Components:
  import Search from '@/components/search.svelte';
  import Container from '@/components/container.svelte';
  import SvgCard from '@/components/svgCard.svelte';
  import Grid from '@/components/grid.svelte';
  import NotFound from '@/components/notFound.svelte';

  // Icons:
  import ArrowsClockWise from 'phosphor-svelte/lib/ArrowsClockwise';
  import ArrowSquareOut from 'phosphor-svelte/lib/ArrowSquareOut';

  // Search:
  let searchTerm = '';
  let filteredSvgs: iSVG[] = [];

  if (searchTerm.length === 0) {
    filteredSvgs = allSvgs.sort((a: iSVG, b: iSVG) => {
      return b.id - a.id;
    });
  }

  const searchSvgs = () => {
    return (filteredSvgs = allSvgs.filter((svg: iSVG) => {
      let svgTitle = svg.title.toLowerCase();
      return svgTitle.includes(searchTerm.toLowerCase());
    }));
  };

  const clearSearch = () => {
    searchTerm = '';
    searchSvgs();
  };

  // Sort:
  let sorted: boolean = false;

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
    filteredSvgs = filteredSvgs.sort((a: iSVG, b: iSVG) => {
      return a.title.localeCompare(b.title);
    });
  };

  // Sort by latest:
  const sortByLatest = () => {
    filteredSvgs = filteredSvgs.sort((a: iSVG, b: iSVG) => {
      return b.id - a.id;
    });
  };
</script>

<svelte:head>
  <title>A beautiful library with SVG logos - Svgl</title>
</svelte:head>

<Container>
  <Search
    bind:searchTerm
    on:input={searchSvgs}
    clearSearch={() => clearSearch()}
    placeholder={`Search ${filteredSvgs.length} logos...`}
  />
  <div class={`flex items-center justify-between my-4 ${filteredSvgs.length === 0 && 'hidden'}`}>
    <button
      class="flex items-center justify-center space-x-2 rounded-md py-1.5 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-dark dark:hover:text-white duration-100 transition-colors"
      on:click={() => sort()}
    >
      <ArrowsClockWise size={14} />
      <span>{sorted ? 'Sort by latest' : 'Sort alphabetically'}</span>
    </button>
    <a
      class="flex items-center justify-center space-x-2 rounded-md py-1.5 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-dark dark:hover:text-white duration-100 transition-colors"
      href="https://github.com/pheralb/svgl?tab=readme-ov-file#-getting-started"
      target="_blank"
    >
      <span>Submit SVG</span>
      <ArrowSquareOut size={14} />
    </a>
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
