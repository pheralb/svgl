<script lang="ts">
  import type { iSVG } from "@/types/svg";

  import { searchSvgsWithFuse } from "@/utils/searchWithFuse";
  import { deleteParam, getParamValue } from "@/utils/searchParams";

  // Store:
  import favoritesStore from "@/stores/favorites.store";

  // Components:
  import { buttonVariants } from "@/components/ui/button";
  import { Button } from "@/components/ui/button";
  import PageCard from "@/components/pageCard.svelte";
  import PageHeader from "@/components/pageHeader.svelte";
  import Grid from "@/components/grid.svelte";
  import Container from "@/components/container.svelte";

  // Svgs:
  import Search from "@/components/search.svelte";
  import SvgCard from "@/components/svgs/svgCard.svelte";
  import SvgNotFound from "@/components/svgs/svgNotFound.svelte";

  import SearchIcon from "@lucide/svelte/icons/search";
  import SearchXIcon from "@lucide/svelte/icons/search-x";
  import TrashIcon from "@lucide/svelte/icons/trash";
  import FolderHeart from "@lucide/svelte/icons/folder-heart";

  // States:
  let searchTerm = $state<string>(getParamValue("search") || "");

  let allFavorites = $derived($favoritesStore);
  let filteredFavorites = $state<Array<iSVG>>([]);
  let favoritesCount = $derived(favoritesStore.getCount(allFavorites));

  const searchFavorites = () => {
    if (!searchTerm) {
      filteredFavorites = allFavorites;
      return;
    }
    filteredFavorites = searchSvgsWithFuse(allFavorites)
      .search(searchTerm)
      .map((result) => result.item);
  };

  const handleSearch = (value: string) => {
    searchTerm = value;
    searchFavorites();
  };

  const handleClearSearch = () => {
    searchTerm = "";
    deleteParam("search");
    filteredFavorites = allFavorites;
  };

  const handleClearFavorites = () => {
    favoritesStore.clearFavorites();
  };

  $effect(() => {
    searchFavorites();
  });
</script>

<svelte:head>
  <title>Favorites - Svgl</title>
  <meta name="description" content="Your favorite SVGs." />
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
      class="flex items-center space-x-2 font-medium text-neutral-950 dark:text-neutral-50"
    >
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
        <FolderHeart size={18} strokeWidth={1.5} />
      {/if}
      <p>Favorites</p>
      {#if favoritesCount > 0}
        <span>-</span>
        {#if !searchTerm}
          <span>{favoritesCount} SVGs</span>
        {:else}
          <p>
            <span class="font-mono">{filteredFavorites.length}</span>
            <span>search results</span>
          </p>
        {/if}
      {/if}
    </div>
    {#if favoritesCount > 0}
      <Button variant="ghost" onclick={handleClearFavorites}>
        <TrashIcon size={14} strokeWidth={1.5} />
        <span>Clear All</span>
      </Button>
    {/if}
  </PageHeader>
  <Container className="my-6">
    <Grid>
      {#each filteredFavorites as svg (svg.id)}
        <SvgCard svgInfo={svg} />
      {/each}
    </Grid>
    {#if filteredFavorites.length === 0 && searchTerm}
      <SvgNotFound svgTitle={searchTerm} searchGlobally={true} />
    {/if}
    {#if filteredFavorites.length === 0 && !searchTerm && favoritesCount === 0}
      <div
        class="flex w-full flex-col items-center justify-center space-y-4 py-6"
      >
        <FolderHeart size={48} strokeWidth={1} />
        <h2 class="text-xl font-semibold">No favorites yet</h2>
        <p class="text-center text-neutral-600 dark:text-neutral-400">
          Start adding SVGs to your favorites by clicking the heart icon on any
          SVG.
        </p>
        <a href="/" class={buttonVariants({ variant: "outline" })}>
          <SearchIcon size={14} strokeWidth={1.5} />
          <span>Browse SVGs</span>
        </a>
      </div>
    {/if}
  </Container>
</PageCard>
