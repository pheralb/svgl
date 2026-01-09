<script lang="ts">
  import type { LinkProps } from "@/components/ui/links/links.types";
  import { cn } from "@/utils/cn";

  const { href, label, title, className, children }: LinkProps = $props();
</script>

<a
  {href}
  {title}
  target="_blank"
  aria-label={label}
  rel="noopener noreferrer"
  class={cn(className)}
>
  {#if children}
    {@render children()}
  {/if}
</a>
