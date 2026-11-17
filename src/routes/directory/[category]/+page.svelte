<script lang="ts">
  import type { PageProps } from "./$types";

  import { cn } from "@/utils/cn";
  import { deleteParam } from "@/utils/searchParams";
  import { searchSvgsWithFuse } from "@/utils/searchWithFuse";
  import { getScrollParent } from "@/utils/getScrollParent";

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
        aria-label="Back to the SVGL home page"
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
    </div>
  </PageHeader>
  <Container className="my-6">
    <Grid>
      {#each displaySvgs as svg (svg.id)}
        <SvgCard svgInfo={svg} />
      {/each}
    </Grid>
    <div bind:this={sentinel} class="h-1"></div>
    {#if filteredSvgs.length === 0}
      <SvgNotFound svgTitle={searchTerm} category={data.category} />
    {/if}
  </Container>
</PageCard>
