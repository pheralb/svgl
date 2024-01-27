<script lang="ts">
  import type { PageData } from './$types';
  import type { iSVG } from '@/types/svg';
  import { queryParam } from 'sveltekit-search-params';

  export let data: PageData;
  let svgsByCategory = data.svgs || [];
  let category = data.category || '';

  // Components:
  import Container from '@/components/container.svelte';
  import Grid from '@/components/grid.svelte';
  import Search from '@/components/search.svelte';
  import SvgCard from '@/components/svgCard.svelte';
  import NotFound from '@/components/notFound.svelte';

  // URL params
  const searchParam = queryParam('search');

  // Search:
  let searchTerm = $searchParam || '';
  let filteredSvgs: iSVG[] = [];

  if (searchTerm.length === 0) {
    filteredSvgs = svgsByCategory.sort((a: iSVG, b: iSVG) => {
      return a.title.localeCompare(b.title);
    });
  }

  const searchSvgs = () => {
    $searchParam = searchTerm || null;
    return (filteredSvgs = svgsByCategory.filter((svg: iSVG) => {
      let svgTitle = svg.title.toLowerCase();
      return svgTitle.includes(searchTerm.toLowerCase());
    }));
  };

  const clearSearch = () => {
    searchTerm = '';
    searchSvgs();
  };

  if ($searchParam) {
    searchSvgs();
  }
</script>

<svelte:head>
  <title>{category} logos - Svgl</title>
</svelte:head>

<Container>
  <Search
    bind:searchTerm
    on:input={searchSvgs}
    clearSearch={() => clearSearch()}
    placeholder={`Search ${filteredSvgs.length} ${category} logos...`}
  />
  <Grid>
    {#each filteredSvgs as svg}
      <SvgCard svgInfo={svg} />
    {/each}
  </Grid>
  {#if filteredSvgs.length === 0}
    <NotFound notFoundTerm={searchTerm} />
  {/if}
</Container>
