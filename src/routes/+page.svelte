<script lang="ts">
  import type { iSVG } from "@/types/svg";
  import type { PageProps } from "./$types";

  import { cn } from "@/utils/cn";
  import { svgsData } from "@/data";
  import { searchWithFuse } from "@/utils/searchWithFuse";

  // Components:
  import Grid from "@/components/grid.svelte";
  import Search from "@/components/search.svelte";
  import SvgCard from "@/components/svgs/svgCard.svelte";
  import SortSvgs from "@/components/svgs/sortSvgs.svelte";
  import Container from "@/components/container.svelte";

  import PageCard from "@/components/pageCard.svelte";
  import FolderIcon from "@lucide/svelte/icons/folder";
  import FolderSearchIcon from "@lucide/svelte/icons/folder-search";

  // SSR Data:
  let { data }: PageProps = $props();

  // States:
  let maxDisplay = 30;
  let showAll = $state<boolean>(false);
  let sorted = $state<boolean>(data.sorted);
  let searchTerm = $state<string>(data.searchTerm);
  let filteredSvgs = $state<iSVG[]>(data.initialSvgs);
  let displaySvgs = $state<iSVG[]>([]);

  const { latestSorted, alphabeticallySorted } = data;

  const updateDisplaySvgs = () => {
    displaySvgs = showAll ? filteredSvgs : filteredSvgs.slice(0, maxDisplay);
  };

  const searchSvgs = () => {
    if (!searchTerm) {
      filteredSvgs = sorted ? alphabeticallySorted : latestSorted;
      updateDisplaySvgs();
      return;
    }
    if (searchTerm.length < 3) {
      filteredSvgs = (sorted ? alphabeticallySorted : latestSorted).filter(
        (svg: iSVG) =>
          svg.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    } else {
      filteredSvgs = searchWithFuse(filteredSvgs)
        .search(searchTerm)
        .map((result) => result.item);
    }

    updateDisplaySvgs();
  };

  const handleSearch = (value: string) => {
    searchTerm = value;
    searchSvgs();
  };

  $effect(() => {
    updateDisplaySvgs();
  });
</script>

<Search
  searchValue={searchTerm}
  onSearch={handleSearch}
  placeholder="Search..."
/>

<PageCard>
  <div
    class={cn(
      "sticky top-0 z-50 flex h-12.5 items-center justify-between py-1.5 pr-2 pl-3",
      "border-b border-neutral-200 dark:border-neutral-800",
      "bg-white/80 backdrop-blur-sm dark:bg-neutral-900/40",
    )}
  >
    <div
      class="flex items-center space-x-2 text-neutral-500 dark:text-neutral-400"
    >
      {#if !searchTerm}
        <FolderIcon size={18} strokeWidth={1.5} />
        <p>
          <span class="font-mono">{svgsData.length}</span>
          <span>logos</span>
        </p>
      {:else}
        <FolderSearchIcon size={18} strokeWidth={1.5} />
        <p>
          <span class="font-mono">{filteredSvgs.length}</span>
          <span>logos</span>
        </p>
      {/if}
    </div>
    <SortSvgs
      className={cn(filteredSvgs.length === 0 && "hidden")}
      isSorted={sorted}
      onSortedChange={(value) => {
        sorted = value;
        searchSvgs();
      }}
    />
  </div>
  <Container className="my-6">
    <Grid>
      {#each displaySvgs as svg}
        <SvgCard svgInfo={svg} />
      {/each}
    </Grid>
  </Container>
</PageCard>
