<script lang="ts">
  import type { iSVG } from "@/types/svg";
  import type { PageProps } from "./$types";

  import { cn } from "@/utils/cn";
  import { searchWithFuse } from "@/utils/searchWithFuse";

  // Components:
  import Grid from "@/components/grid.svelte";
  import Search from "@/components/search.svelte";
  import SvgCard from "@/components/svgCard.svelte";
  import Container from "@/components/container.svelte";

  import PageCard from "@/components/pageCard.svelte";
  import FolderIcon from "@lucide/svelte/icons/folder-open";
  import ArrowLeftIcon from "@lucide/svelte/icons/arrow-left";

  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import { SvelteURLSearchParams } from "svelte/reactivity";
  import { buttonVariants } from "@/components/ui/button";

  // SSR Data:
  let { data }: PageProps = $props();

  // States:
  let searchTerm = $state<string>(data.searchTerm || "");
  let filteredSvgs = $state<iSVG[]>(data.filteredSvgs);

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

  $effect(() => {
    filteredSvgs = data.svgs.filter((svg: iSVG) =>
      svg.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
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
      "sticky top-0 z-50 flex h-12.5 items-center justify-between py-1.5 pr-2 pl-2",
      "border-b border-neutral-200 dark:border-neutral-800",
      "bg-white/80 backdrop-blur-sm dark:bg-neutral-900/40",
    )}
  >
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
        {data.category.slice(0, 1).toUpperCase() + data.category.slice(1)}
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
  </div>
  <Container className="my-6">
    <Grid
      className="animate-in fill-mode-backwards fade-in slide-in-from-bottom-4 duration-500"
    >
      {#each filteredSvgs as svg}
        <SvgCard svgInfo={svg} />
      {/each}
    </Grid>
  </Container>
</PageCard>
