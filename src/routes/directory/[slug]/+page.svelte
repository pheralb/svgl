<script lang="ts">
  import type { PageData } from './$types';
  import type { iSVG } from '@/types/svg';
  export let data: PageData;
  let svgsByCategory = data.props?.svgs || [];

  // Components:
  import Container from '@/components/container.svelte';
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

<Container>
  <Search bind:searchTerm on:input={searchSvgs} />
  <div class="mt-4 grid grid-cols-6 gap-4">
    {#each filteredSvgs as svg}
      <SvgCard svgInfo={svg} />
    {/each}
  </div>
</Container>
