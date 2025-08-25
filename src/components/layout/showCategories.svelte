<script lang="ts">
  import type { tCategory } from "@/types/categories";

  import { cn } from "@/utils/cn";
  import { svgs } from "@/data/svgs";
  import { page } from "$app/state";
  import { getCategories } from "@/data";
  import { sidebarItemClasses } from "./sidebarItemClasses";

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
      class={cn(
        "dark:bg-dark rounded-lg border border-neutral-200 bg-white px-2 py-0.5 font-mono text-xs font-medium text-neutral-600 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400",
        page.url.pathname && "border-transparent",
      )}
    >
      {categoryCounts[category]}
    </span>
  </a>
{/each}
