<script lang="ts">
  import type { iSVG } from "@/types/svg";
  import type { PageProps } from "./$types";

  import { cn } from "@/utils/cn";
  import { searchSvgsWithFuse } from "@/utils/searchWithFuse";

  // Components:
  import Grid from "@/components/grid.svelte";
  import Search from "@/components/search.svelte";
  import SvgCard from "@/components/svgs/svgCard.svelte";
  import Container from "@/components/container.svelte";
  import SearchXIcon from "@lucide/svelte/icons/search-x";

  import PageCard from "@/components/pageCard.svelte";
  import PageHeader from "@/components/pageHeader.svelte";
  import FolderIcon from "@lucide/svelte/icons/folder-open";
  import ArrowLeftIcon from "@lucide/svelte/icons/arrow-left";
  import { Button, buttonVariants } from "@/components/ui/button";
  import SortSvgs from "@/components/svgs/sortSvgs.svelte";
  import { deleteParam } from "@/utils/searchParams";
  import SvgNotFound from "@/components/svgs/svgNotFound.svelte";

  // SSR Data:
  let { data }: PageProps = $props();
  const directoryData = $derived(data);

  // States:
  let maxDisplay = 30;
  let searchTerm = $state<string>(data.searchTerm || "");
  let filteredSvgs = $derived<iSVG[]>(data.initialSvgs);
  let sorted = $state<boolean>(data.sorted);
  let showAll = $state<boolean>(false);

  const updateDisplaySvgs = () => {
    const data = showAll ? filteredSvgs : filteredSvgs.slice(0, maxDisplay);
    return data;
  };

  const searchSvgs = () => {
    if (!searchTerm) {
      filteredSvgs = sorted ? data.alphabeticallySorted : data.latestSorted;
      updateDisplaySvgs();
      return;
    }
    const baseData = sorted ? data.alphabeticallySorted : data.latestSorted;
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
    deleteParam("search");
    updateDisplaySvgs();
  };

  $effect(() => {
    updateDisplaySvgs();
  });
</script>

<svelte:head>
  <title>{directoryData.category} SVG logos - Svgl</title>
</svelte:head>

<Search
  searchValue={searchTerm}
  onSearch={handleSearch}
  placeholder={`Search ${directoryData.category}'s SVGs...`}
/>

<PageCard
  containerClass="mt-2"
  contentCardClass="max-h-[calc(100vh-7.6rem)] min-h-[calc(100vh-7.6rem)]"
>
  <PageHeader>
    <div
      class="flex items-center space-x-2 font-medium text-neutral-950 dark:text-neutral-50"
    >
      <a
        href="/"
        class={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
      >
        <ArrowLeftIcon size={18} strokeWidth={1.5} />
      </a>
      {#if searchTerm}
        <Button
          title="Clear Search"
          onclick={handleClearSearch}
          variant="ghost"
          size="icon"
        >
          <SearchXIcon size={18} strokeWidth={1.5} />
        </Button>
      {:else}
        <FolderIcon class="ml-1" size={18} strokeWidth={1.5} />
      {/if}
      <p>
        {directoryData.category}
      </p>
      <span>-</span>
      {#if !searchTerm}
        <p>
          <span>{data.initialSvgs.length} SVGs </span>
        </p>
      {:else}
        <p>
          <span class="font-mono">{filteredSvgs.length}</span>
          <span>search results</span>
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
  </PageHeader>
  <Container className="my-6">
    <Grid>
      {#each filteredSvgs as svg (svg.id)}
        <SvgCard svgInfo={svg} />
      {/each}
    </Grid>
    {#if filteredSvgs.length === 0}
      <SvgNotFound svgTitle={searchTerm} category={directoryData.category} />
    {/if}
  </Container>
</PageCard>
