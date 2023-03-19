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
</script>

<Container>
  <Search
    bind:searchTerm
    on:input={searchSvgs}
    placeholder={`Search ${filteredSvgs.length} logos...`}
  />
  <Grid>
    {#each filteredSvgs as svg}
      <SvgCard svgInfo={svg} />
    {/each}
  </Grid>
</Container>
