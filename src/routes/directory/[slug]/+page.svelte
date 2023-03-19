<script lang="ts">
  import type { PageData } from './$types';
  import type { iSVG } from '@/types/svg';
  export let data: PageData;
  let svgsByCategory = data.props?.svgs || [];
  let category = data.props?.category || '';

  // Components:
  import Container from '@/components/container.svelte';
  import Grid from '@/components/grid.svelte';
  import Search from '@/components/search.svelte';
  import SvgCard from '@/components/svgCard.svelte';

  // Search:
  let searchTerm = '';
  let filteredSvgs: iSVG[] = [];

  if (searchTerm.length === 0) {
    filteredSvgs = svgsByCategory.sort((a: iSVG, b: iSVG) => {
      return b.id - a.id;
    });
  }

  const searchSvgs = () => {
    return (filteredSvgs = svgsByCategory.filter((svg: iSVG) => {
      let svgTitle = svg.title.toLowerCase();
      return svgTitle.includes(searchTerm.toLowerCase());
    }));
  };
</script>

<svelte:head>
  <title>{category} logos - Svgl</title>
</svelte:head>

<Container>
  <Search
    bind:searchTerm
    on:input={searchSvgs}
    placeholder={`Search ${filteredSvgs.length} ${category} logos...`}
  />
  <Grid>
    {#each filteredSvgs as svg}
      <SvgCard svgInfo={svg} />
    {/each}
  </Grid>
</Container>
