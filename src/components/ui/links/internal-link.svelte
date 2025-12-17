<script lang="ts">
  import type { LinkProps } from "@/components/ui/links/links.types";
  import { cn } from "@/utils/cn";

  interface InternalLinkProps extends LinkProps {
    preloadData?: boolean;
  }

  const {
    href,
    label,
    title,
    className,
    children,
    preloadData,
  }: InternalLinkProps = $props();
</script>

<a
  {href}
  {title}
  aria-label={label}
  class={cn(className)}
  data-sveltekit-preload-data={preloadData ? "" : "off"}
>
  {#if children}
    {@render children()}
  {/if}
</a>
