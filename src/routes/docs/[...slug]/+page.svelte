<script lang="ts">
  import type { PageProps } from "./$types";
  import { cn } from "@/utils/cn";

  import PageCard from "@/components/pageCard.svelte";
  import Container from "@/components/container.svelte";
  import PageHeader from "@/components/pageHeader.svelte";
  import { buttonVariants } from "@/components/ui/button";
  import * as Collapsible from "@/components/ui/collapsible";
  import DocumentSettings from "@/components/documentSettings.svelte";
  import TableOfContents from "@/components/tableOfContents/tableOfContents.svelte";

  import FileText from "@lucide/svelte/icons/file-text";
  import ChevronDown from "@lucide/svelte/icons/chevron-down";

  // Markdown:
  import "@/styles/markdown.css";

  let { data }: PageProps = $props();
  let tocOpen = $state(false);
  const document = $derived(data.document);
</script>

<svelte:head>
  <title>{data.document.title} - Svgl</title>
  <meta name="description" content={data.document.description} />
</svelte:head>

<PageCard>
  <PageHeader>
    <div
      class="flex items-center space-x-2 font-medium text-neutral-950 dark:text-neutral-50"
    >
      <FileText size={18} strokeWidth={1.5} />
      <p>
        {document.title}
      </p>
    </div>
    <DocumentSettings
      rawUrl={document.rawUrl}
      documentContent={document.content}
      documentUrl={document.documentUrl}
    />
  </PageHeader>
  <Collapsible.Root class="block lg:hidden" bind:open={tocOpen}>
    <Collapsible.Trigger
      class={buttonVariants({
        variant: "outline",
        class: "mb-4 w-full rounded-none border-x-0 border-t-0",
      })}
    >
      <span>On this page</span>
      <ChevronDown
        size={14}
        class={cn(
          "transition-transform duration-200",
          tocOpen ? "rotate-180" : "rotate-0",
        )}
      />
    </Collapsible.Trigger>
    <Collapsible.Content class="px-4">
      <TableOfContents toc={document.tableOfContents} />
    </Collapsible.Content>
  </Collapsible.Root>
  <div class="flex min-h-screen gap-8 lg:gap-12">
    <Container
      className={cn(
        "flex-1 mt-8 mb-6 max-w-3xl",
        "animate-in duration-500 fill-mode-backwards fade-in slide-in-from-bottom-4",
      )}
    >
      <article class="markdown">{@html document.html}</article>
    </Container>
    <aside class="sticky top-20 hidden w-60 flex-shrink-0 self-start lg:block">
      <div
        class="mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-50"
      >
        On this page
      </div>
      <TableOfContents toc={document.tableOfContents} />
    </aside>
  </div>
</PageCard>
