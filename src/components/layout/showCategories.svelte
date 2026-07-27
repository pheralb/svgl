<script lang="ts">
  import type { Category } from "@/types/categories";
  import { page } from "$app/state";

  import { cn } from "@/utils/cn";
  import { svgs } from "@/data/svgs";
  import { getCategories } from "@/data";

  import InternalLink from "@/components/ui/links/internal-link.svelte";
  import { sidebarItemClasses } from "@/components/layout/sidebarItemClasses";
  import { sidebarBadgeClasses } from "@/components/layout/sidebarBadgeClasses";

  // Get category counts:
  const categories: Category[] = getCategories();
  let categoryCounts: Record<string, number> = {};
  categories.forEach((category) => {
    categoryCounts[category] = svgs.filter((svg) =>
      svg.category.includes(category),
    ).length;
  });
</script>

{#each categories.sort() as category (category)}
  <InternalLink
    href={`/directory/${category.toLowerCase()}`}
    preloadData={true}
    className={cn(
      sidebarItemClasses.base,
      page.url.pathname === `/directory/${category.toLowerCase()}` &&
        sidebarItemClasses.active,
      "pr-3",
    )}
  >
    <p class="truncate">{category}</p>
    <span
      class={cn(sidebarBadgeClasses, page.url.pathname && "border-transparent")}
    >
      {categoryCounts[category]}
    </span>
  </InternalLink>
{/each}
