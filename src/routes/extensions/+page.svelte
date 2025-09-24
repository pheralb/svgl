<script lang="ts">
  import type { PageProps } from "./$types";
  import type { Extension } from "@/types/extensions";

  // Utils:
  import { cn } from "@/utils/cn";
  import { searchExtensionsWithFuse } from "@/utils/searchWithFuse";

  // UI Components:
  import { buttonVariants } from "@/components/ui/button";

  // Page components:
  import PageCard from "@/components/pageCard.svelte";
  import PageHeader from "@/components/pageHeader.svelte";
  import Grid from "@/components/grid.svelte";
  import Container from "@/components/container.svelte";
  import ExtensionItem from "@/components/extension.svelte";

  // Svgs:
  import RocketIcon from "@lucide/svelte/icons/rocket";
  import PackageOpen from "@lucide/svelte/icons/package-open";
  import PlusIcon from "@lucide/svelte/icons/plus";
  import Search from "@/components/search.svelte";

  // SSR Data:
  let { data }: PageProps = $props();

  // States:
  let searchTerm = $state<string>(data.searchTerm || "");
  let filteredExtensions = $state<Extension[]>(data.initialExtensions);

  const searchExtensions = () => {
    if (!searchTerm) {
      filteredExtensions = data.allExtensions;
      return;
    }
    filteredExtensions = searchExtensionsWithFuse(data.allExtensions)
      .search(searchTerm)
      .map((result) => result.item);
  };

  const handleSearch = (value: string) => {
    searchTerm = value;
    searchExtensions();
  };
</script>

<svelte:head>
  <title>Extensions - Svgl</title>
  <meta
    name="description"
    content="Integrate SVGL with your favorite tools and apps to streamline your workflow. Created by the community."
  />
</svelte:head>

<PageCard>
  <PageHeader>
    <div
      class="flex items-center space-x-2 font-medium text-neutral-950 dark:text-neutral-50"
    >
      <PackageOpen size={18} strokeWidth={1.5} />
      <p>Extensions</p>
    </div>
  </PageHeader>
  <section class="flex flex-col px-4 py-12">
    <h2
      class={cn(
        "mb-4 text-center",
        "text-4xl font-semibold",
        "animate-in delay-100 duration-500 fill-mode-backwards fade-in slide-in-from-bottom-4",
      )}
    >
      Extensions
    </h2>
    <div
      class={cn(
        "flex w-full flex-col items-center justify-center space-y-4",
        "animate-in delay-300 duration-500 fill-mode-backwards fade-in slide-in-from-bottom-4",
      )}
    >
      <p>
        Integrate SVGL with your favorite tools and apps to streamline your
        workflow. Created by the community.
      </p>
      <div class="flex items-center space-x-2">
        <a href="/docs/api" class={cn(buttonVariants({ variant: "radial" }))}>
          <RocketIcon size={16} strokeWidth={2} />
          <span>Start Building</span>
        </a>
        <a
          target="_blank"
          href="https://github.com/pheralb/svgl/issues/new/choose"
          class={cn(buttonVariants({ variant: "outline" }))}
        >
          <PlusIcon size={16} strokeWidth={2} />
          <span>Add your extension</span>
        </a>
      </div>
    </div>
  </section>
  <Container
    className={cn(
      "max-w-4xl",
      "animate-in delay-500 duration-500 fill-mode-backwards fade-in slide-in-from-bottom-4",
    )}
  >
    <div
      class="sticky top-12 z-10 bg-white/80 pt-4 backdrop-blur-sm dark:bg-transparent"
    >
      <Search
        iconSize={18}
        searchValue={searchTerm}
        onSearch={handleSearch}
        placeholder="Search..."
        inputClass="text-md"
      />
    </div>
    <Grid columns="2" className="mt-5 mb-7">
      {#each filteredExtensions as extension (extension.id)}
        <ExtensionItem data={extension} />
      {/each}
    </Grid>
  </Container>
</PageCard>
