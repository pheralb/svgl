<script lang="ts">
  import type { PageProps } from "./$types";
  import { browser } from "$app/environment";

  import { cn } from "@/utils/cn";
  import { svgsData } from "@/data";
  import { deleteParam } from "@/utils/searchParams";
  import { searchSvgsWithFuse } from "@/utils/searchWithFuse";

  import Grid from "@/components/grid.svelte";
  import Search from "@/components/search.svelte";
  import SvgCard from "@/components/svgs/svgCard.svelte";
  import SortSvgs from "@/components/svgs/sortSvgs.svelte";
  import Container from "@/components/container.svelte";

  import PageCard from "@/components/pageCard.svelte";
  import PageHeader from "@/components/pageHeader.svelte";
  import Button from "@/components/ui/button/button.svelte";
  import SvgNotFound from "@/components/svgs/svgNotFound.svelte";
  import WarningMessage from "@/components/warningMessage.svelte";

  import Files from "@lucide/svelte/icons/files";
  import SearchXIcon from "@lucide/svelte/icons/search-x";

  // SSR Data:
  let { data }: PageProps = $props();

  // States:
  const INITIAL_DISPLAY = 30;
  const INCREMENT = 10;

  let maxDisplay = $state<number>(INITIAL_DISPLAY);
  let sortOverride = $state<boolean | null>(null);
  let searchOverride = $state<string | null>(null);
  let sentinel = $state<HTMLDivElement | null>(null);

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

  function getScrollParent(node: HTMLElement | null): HTMLElement | null {
    if (!node) return null;
    const { overflow, overflowY } = getComputedStyle(node);
    if (
      overflow.includes("scroll") ||
      overflow.includes("auto") ||
      overflowY.includes("scroll") ||
      overflowY.includes("auto")
    ) {
      return node;
    }
    return getScrollParent(node.parentElement);
  }

  $effect(() => {
    if (!sentinel) return;
    const root = getScrollParent(sentinel.parentElement);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && maxDisplay < filteredSvgs.length) {
          maxDisplay += INCREMENT;
        }
      },
      { root, rootMargin: "200px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
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
        <Files size={18} strokeWidth={1.5} />
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
        {isSorted}
        onSortedChange={(value) => {
          sortOverride = value;
          maxDisplay = INITIAL_DISPLAY;
        }}
      />
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
    <div bind:this={sentinel} class="h-1"></div>
    {#if filteredSvgs.length === 0}
      <SvgNotFound svgTitle={searchTerm} />
    {/if}
  </Container>
</PageCard>
