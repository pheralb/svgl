<script lang="ts">
  import type { tCategory } from "@/types/categories";

  import { cn } from "@/utils/cn";
  import { svgs } from "@/data/svgs";
  import { page } from "$app/state";
  import { getCategories } from "@/data";

  import { sidebarItemClasses } from "./sidebarItemClasses";
  import { sidebarBadgeClasses } from "./sidebarBadgeClasses";

  // Get category counts:
  const categories: tCategory[] = getCategories();
  let categoryCounts: Record<string, number> = {};
  categories.forEach((category) => {
    categoryCounts[category] = svgs.filter((svg) =>
      svg.category.includes(category),
    ).length;
  });
</script>

{#each categories.sort() as category}
  <a
    href={`/directory/${category.toLowerCase()}`}
    data-sveltekit-preload-data
    class={cn(
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
  </a>
{/each}
