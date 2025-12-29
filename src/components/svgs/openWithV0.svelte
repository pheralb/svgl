<script lang="ts">
  import { globals } from "@/globals";
  import V0 from "@/components/logos/v0.svelte";

  import { buttonVariants } from "@/components/ui/button";
  import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";
  import ExternalLink from "@/components/ui/links/external-link.svelte";

  interface OpenWithV0Props {
    svgTitle: string;
  }
  let { svgTitle }: OpenWithV0Props = $props();
</script>

<ExternalLink
  href={`${globals.v0Url}${globals.registryUrl}${svgTitle}.json`}
  className={buttonVariants({ variant: "outline", class: "w-full" })}
>
  <span>Open with</span>
  <V0 size={20} />
  <ArrowUpRightIcon size={14} class="text-neutral-500 dark:text-neutral-400" />
</ExternalLink>
