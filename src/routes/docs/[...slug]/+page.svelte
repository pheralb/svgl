<script lang="ts">
  import type { PageProps } from "./$types";

  import PageCard from "@/components/pageCard.svelte";
  import PageHeader from "@/components/pageHeader.svelte";

  import Container from "@/components/container.svelte";
  import FileText from "@lucide/svelte/icons/file-text";

  let { data }: PageProps = $props();
  const document = $derived(data.document);
</script>

<svelte:head>
  <title>{data.document.title} - Svgl</title>
  <meta name="description" content={data.document.description} />
</svelte:head>

<PageCard
  containerClass="mt-0"
  contentCardClass="max-h-[calc(100vh-5.2rem)] min-h-[calc(100vh-5.2rem)]"
>
  <PageHeader>
    <div
      class="flex items-center space-x-2 font-medium text-neutral-950 dark:text-neutral-50"
    >
      <FileText size={18} strokeWidth={1.5} />
      <p>
        {document.title}
      </p>
    </div>
  </PageHeader>
  <Container className="my-6">
    <article>{@html document.html}</article>
  </Container>
</PageCard>
