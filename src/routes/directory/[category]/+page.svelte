<script lang="ts">
  import type { iSVG } from "@/types/svg";
  import type { PageProps } from "./$types";

  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import { SvelteURLSearchParams } from "svelte/reactivity";

  import { cn } from "@/utils/cn";
  import { searchWithFuse } from "@/utils/searchWithFuse";

  // Components:
  import Grid from "@/components/grid.svelte";
  import Search from "@/components/search.svelte";
  import SvgCard from "@/components/svgs/svgCard.svelte";
  import Container from "@/components/container.svelte";

  import PageCard from "@/components/pageCard.svelte";
  import PageHeader from "@/components/pageHeader.svelte";
  import FolderIcon from "@lucide/svelte/icons/folder-open";
  import ArrowLeftIcon from "@lucide/svelte/icons/arrow-left";
  import { buttonVariants } from "@/components/ui/button";

  // SSR Data:
  let { data }: PageProps = $props();
  const directoryData = $derived(data);

  // States:
  let searchTerm = $state<string>(data.searchTerm || "");
  let filteredSvgs = $derived<iSVG[]>(data.filteredSvgs);

  const searchSvgs = () => {
    if (!searchTerm) {
      filteredSvgs = data.svgs;
      return;
    }
    if (searchTerm.length < 3) {
      filteredSvgs = data.svgs.filter((svg: iSVG) =>
        svg.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    } else {
      filteredSvgs = searchWithFuse(data.svgs)
        .search(searchTerm)
        .map((result) => result.item);
    }
  };

  const handleSearch = (value: string) => {
    searchTerm = value;

    const params = new SvelteURLSearchParams(page.url.searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    goto(`?${params.toString()}`, {
      keepFocus: true,
      noScroll: true,
      replaceState: true,
    });

    searchSvgs();
  };

  const formatCategory = (category: string) =>
    category.charAt(0).toUpperCase() + category.slice(1);

  $effect(() => {
    filteredSvgs = data.svgs.filter((svg: iSVG) =>
      svg.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  });
</script>

<svelte:head>
  <title>{formatCategory(directoryData.category)} SVG logos - Svgl</title>
</svelte:head>

<Search
  searchValue={searchTerm}
  onSearch={handleSearch}
  placeholder="Search..."
/>

<PageCard>
  <PageHeader>
    <div
      class="flex items-center space-x-2 font-medium text-neutral-950 dark:text-neutral-50"
    >
      <a
        href="/"
        class={cn(
          buttonVariants({ class: "group", variant: "ghost", size: "icon" }),
        )}
      >
        <ArrowLeftIcon
          size={18}
          strokeWidth={1.5}
          class="transition-transform group-hover:translate-x-[-2px]"
        />
      </a>
      <FolderIcon size={18} strokeWidth={1.5} />
      <p>
        {formatCategory(directoryData.category)}
      </p>
      <span>-</span>
      {#if !searchTerm}
        <p>
          <span>{data.svgs.length} SVGs </span>
        </p>
      {:else}
        <p>
          <span class="font-mono">{filteredSvgs.length}</span>
          <span>search results</span>
        </p>
      {/if}
    </div>
  </PageHeader>
  <Container className="my-6">
    <Grid>
      {#each filteredSvgs as svg (svg.id)}
        <SvgCard svgInfo={svg} />
      {/each}
    </Grid>
  </Container>
</PageCard>
