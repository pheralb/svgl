<script lang="ts">
  import type { PageProps } from "./$types";

  import { cn } from "@/utils/cn";
  import { deleteParam } from "@/utils/searchParams";
  import { searchSvgsWithFuse } from "@/utils/searchWithFuse";

  // Components:
  import Grid from "@/components/grid.svelte";
  import Search from "@/components/search.svelte";
  import PageCard from "@/components/pageCard.svelte";
  import SvgCard from "@/components/svgs/svgCard.svelte";
  import Container from "@/components/container.svelte";
  import PageHeader from "@/components/pageHeader.svelte";
  import SortSvgs from "@/components/svgs/sortSvgs.svelte";
  import SvgNotFound from "@/components/svgs/svgNotFound.svelte";
  import { Button, buttonVariants } from "@/components/ui/button";

  import SearchXIcon from "@lucide/svelte/icons/search-x";
  import FolderIcon from "@lucide/svelte/icons/folder-open";
  import ArrowLeftIcon from "@lucide/svelte/icons/arrow-left";
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
  import ChevronUpIcon from "@lucide/svelte/icons/chevron-up";

  // SSR Data:
  let { data }: PageProps = $props();

  // States:
  const INITIAL_DISPLAY = 30;
  const INCREMENT = 10;

  let maxDisplay = $state<number>(INITIAL_DISPLAY);
  let sortOverride = $state<boolean | null>(null);
  let searchOverride = $state<string | null>(null);

  const isSorted = $derived(sortOverride !== null ? sortOverride : data.sorted);
  const searchTerm = $derived(
    searchOverride !== null ? searchOverride : data.searchTerm,
  );

  const filteredSvgs = $derived.by(() => {
    if (!searchTerm) {
      return isSorted ? data.alphabeticallySorted : data.latestSorted;
    }
    const baseData = isSorted ? data.alphabeticallySorted : data.latestSorted;
    return searchSvgsWithFuse(baseData)
      .search(searchTerm)
      .map((result) => result.item);
  });

  const displaySvgs = $derived(filteredSvgs.slice(0, maxDisplay));

  const handleSearch = (value: string) => {
    searchOverride = value;
    maxDisplay = INITIAL_DISPLAY;
  };

  const handleClearSearch = () => {
    searchOverride = "";
    maxDisplay = INITIAL_DISPLAY;
    deleteParam("search");
  };

  const handleShowMore = () => {
    maxDisplay += INCREMENT;
  };

  const handleShowLess = () => {
    maxDisplay = INITIAL_DISPLAY;
  };

  const handleShowAll = () => {
    maxDisplay = filteredSvgs.length;
  };
</script>

<svelte:head>
  <title>{data.category} SVG logos - Svgl</title>
</svelte:head>

<Search
  searchValue={searchTerm}
  onSearch={handleSearch}
  placeholder={`Search ${data.category}'s SVGs...`}
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
        {data.category}
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
    <div class="flex items-center space-x-2">
      <SortSvgs
        className={cn(filteredSvgs.length === 0 && "hidden")}
        {isSorted}
        onSortedChange={(value) => {
          sortOverride = value;
          maxDisplay = INITIAL_DISPLAY;
        }}
      />
      {#if filteredSvgs.length > maxDisplay}
        <Button variant="ghost" class="px-2.5" onclick={handleShowAll}>
          <span>Show All</span>
        </Button>
      {/if}
      {#if maxDisplay > INITIAL_DISPLAY && filteredSvgs.length > INITIAL_DISPLAY}
        <Button variant="ghost" class="px-2.5" onclick={handleShowLess}>
          <span>Show Less</span>
          <ChevronUpIcon size={16} strokeWidth={2} />
        </Button>
      {/if}
    </div>
  </PageHeader>
  <Container className="my-6">
    <Grid>
      {#each displaySvgs as svg (svg.id)}
        <SvgCard svgInfo={svg} />
      {/each}
    </Grid>
    {#if filteredSvgs.length > maxDisplay}
      <div class="mt-6 flex justify-center">
        <Button
          variant="outline"
          size="lg"
          class="px-2.5"
          onclick={handleShowMore}
        >
          <span>Show More</span>
          <span class="text-neutral-600 dark:text-neutral-400">
            (+ {Math.min(INCREMENT, filteredSvgs.length - maxDisplay)} SVGs)
          </span>
          <ChevronDownIcon size={16} strokeWidth={2} />
        </Button>
      </div>
    {/if}
    {#if filteredSvgs.length === 0}
      <SvgNotFound svgTitle={searchTerm} category={data.category} />
    {/if}
  </Container>
</PageCard>
