<script lang="ts">
  import type { iSVG } from '../types/svg';

  // Get all svgs:
  import svgData from '../data/svgs.json';
  const allSvgs = JSON.parse(JSON.stringify(svgData));

  // Components:
  import Search from '../components/search.svelte';
  import Container from '../components/container.svelte';
  import SvgCard from '../components/svgCard.svelte';

  // Search:
  let search = '';
  let filteredSvgs: iSVG[] = [];

  if (search.length === 0) {
    filteredSvgs = allSvgs.sort((a: iSVG, b: iSVG) => {
      return b.id - a.id;
    });
  }

  const searchSvgs = () => {
    return (filteredSvgs = allSvgs.filter((svg: iSVG) => {
      let svgTitle = svg.title.toLowerCase();
      return svgTitle.includes(search.toLowerCase());
    }));
  };
</script>

<Container>
  <Search searchTerm={search} on:input={searchSvgs} />
  <div class="mt-4 grid grid-cols-6 gap-4">
    {#each filteredSvgs as svg}
      <SvgCard svgInfo={svg} />
    {/each}
  </div>
</Container>
