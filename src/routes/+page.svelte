<script lang="ts">
  import type { iSVG } from "@/types/svg";
  import type { PageProps } from "./$types";
  import { browser } from "$app/environment";

  import { cn } from "@/utils/cn";
  import { deleteParam } from "@/utils/searchParams";
  import { svgsData } from "@/data";
  import { searchSvgsWithFuse } from "@/utils/searchWithFuse";

  // Components:
  import Grid from "@/components/grid.svelte";
  import Search from "@/components/search.svelte";
  import SvgCard from "@/components/svgs/svgCard.svelte";
  import SortSvgs from "@/components/svgs/sortSvgs.svelte";
  import Container from "@/components/container.svelte";
  import SearchXIcon from "@lucide/svelte/icons/search-x";

  import PageCard from "@/components/pageCard.svelte";
  import FolderIcon from "@lucide/svelte/icons/folder";
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
  import ChevronUpIcon from "@lucide/svelte/icons/chevron-up";
  import PageHeader from "@/components/pageHeader.svelte";
  import Button from "@/components/ui/button/button.svelte";
  import SvgNotFound from "@/components/svgs/svgNotFound.svelte";
  import WarningMessage from "@/components/warningMessage.svelte";

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
    const baseData = sorted ? alphabeticallySorted : latestSorted;
    filteredSvgs = searchSvgsWithFuse(baseData)
      .search(searchTerm)
      .map((result) => result.item);
    updateDisplaySvgs();
  };

  const handleSearch = (value: string) => {
    searchTerm = value;
    searchSvgs();
  };

  const handleClearSearch = () => {
    searchTerm = "";
    filteredSvgs = sorted ? alphabeticallySorted : latestSorted;
    deleteParam("search");
    updateDisplaySvgs();
  };

  $effect(() => {
    updateDisplaySvgs();
  });
</script>

<svelte:head>
  <title>A beautiful library with SVG logos - Svgl</title>
</svelte:head>

<Search
  searchValue={searchTerm}
  onSearch={handleSearch}
  placeholder="Search..."
/>

<PageCard
  containerClass="mt-2"
  contentCardClass="max-h-[calc(100vh-7.6rem)] min-h-[calc(100vh-7.6rem)]"
>
  <PageHeader>
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
        <Button
          title="Clear Search"
          onclick={handleClearSearch}
          variant="ghost"
          size="icon"
        >
          <SearchXIcon size={18} strokeWidth={1.5} />
        </Button>
        <p>
          <span class="font-mono">{filteredSvgs.length}</span>
          <span>logos</span>
        </p>
      {/if}
    </div>
    <div class="flex items-center space-x-2">
      <SortSvgs
        className={cn(filteredSvgs.length === 0 && "hidden")}
        isSorted={sorted}
        onSortedChange={(value) => {
          sorted = value;
          searchSvgs();
        }}
      />
      {#if showAll && filteredSvgs.length > maxDisplay}
        <Button
          variant="ghost"
          class="px-2.5"
          onclick={() => (showAll = false)}
        >
          <span>Show Less</span>
          <ChevronUpIcon size={16} strokeWidth={2} />
        </Button>
      {/if}
    </div>
  </PageHeader>
  {#if browser}
    <WarningMessage />
  {/if}
  <Container className="my-6">
    <Grid>
      {#each displaySvgs as svg (svg.id)}
        <SvgCard svgInfo={svg} />
      {/each}
    </Grid>
    {#if !showAll && filteredSvgs.length > maxDisplay}
      <div class="mt-6 flex justify-center">
        <Button
          variant="outline"
          size="lg"
          class="px-2.5"
          onclick={() => (showAll = true)}
        >
          <span>Show All</span>
          <span class="text-neutral-600 dark:text-neutral-400">
            (+ {filteredSvgs.length - maxDisplay} SVGs)
          </span>
          <ChevronDownIcon size={16} strokeWidth={2} />
        </Button>
      </div>
    {/if}
    {#if filteredSvgs.length === 0}
      <SvgNotFound svgTitle={searchTerm} />
    {/if}
  </Container>
</PageCard>
