<script lang="ts">
  import type { iSVG } from "@/types/svg";
  import type { PageProps } from "./$types";

  import Fuse from "fuse.js";
  import { cn } from "@/utils/cn";
  import { svgsData } from "@/data";

  // Components:
  import Grid from "@/components/grid.svelte";
  import Search from "@/components/search.svelte";
  import SvgCard from "@/components/svgCard.svelte";
  import Container from "@/components/container.svelte";
  import { buttonVariants } from "@/components/ui/button";

  import FolderIcon from "@lucide/svelte/icons/folder";
  import FolderSearchIcon from "@lucide/svelte/icons/folder-search";
  import ArrowUpDownIcon from "@lucide/svelte/icons/arrow-up-down";
  import ArrowDownUpIcon from "@lucide/svelte/icons/arrow-down-up";

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

  // Fuse.js Search (solo para búsquedas del lado cliente):
  const fuse = new Fuse<iSVG>(svgsData, {
    keys: ["title"],
    threshold: 0.35,
    ignoreLocation: true,
    isCaseSensitive: false,
    shouldSort: true,
  });

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
      filteredSvgs = fuse.search(searchTerm).map((result) => result.item);
    }

    updateDisplaySvgs();
  };

  const sort = () => {
    sorted = !sorted;
    searchSvgs();
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

<div
  class={cn(
    "mt-2.5 overflow-hidden",
    "rounded-md border border-neutral-200 dark:border-neutral-800",
    "bg-white dark:bg-neutral-900/40",
  )}
>
  <div
    class={cn(
      "max-h-[calc(100vh-8.6rem)] min-h-[calc(100vh-8.6rem)] overflow-y-auto",
    )}
  >
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
      <button
        class={cn(
          buttonVariants({ variant: "ghost", class: "px-2.5" }),
          filteredSvgs.length === 0 && "hidden",
        )}
        onclick={() => sort()}
      >
        {#if sorted}
          <ArrowDownUpIcon size={16} strokeWidth={2} />
        {:else}
          <ArrowUpDownIcon size={16} strokeWidth={2} />
        {/if}
        <span>{sorted ? "Sort by latest" : "Sort A-Z"}</span>
      </button>
    </div>
    <Container className="my-6">
      <Grid
        className="animate-in fill-mode-backwards fade-in slide-in-from-bottom-4 duration-500"
      >
        {#each displaySvgs as svg}
          <SvgCard svgInfo={svg} />
        {/each}
      </Grid>
    </Container>
  </div>
</div>
