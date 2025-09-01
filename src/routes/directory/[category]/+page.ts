import type { PageLoad } from "./$types";
import type { iSVG } from "@/types/svg";

import { error } from "@sveltejs/kit";
import { getSvgsByCategory } from "@/data";
import { searchWithFuse } from "@/utils/searchWithFuse";

export const load: PageLoad = (async ({ params, url }) => {
  const { category } = params;
  const searchParam = url.searchParams.get("search") || "";
  const sortParam = url.searchParams.get("sort") === "alphabetical";

  const svgsByCategory = getSvgsByCategory(category);

  if (!svgsByCategory.length) {
    throw error(404, "Category not found");
  }

  let filteredSvgs: iSVG[] = [];
  const latestSorted = [...svgsByCategory].sort((a, b) => b.id! - a.id!);
  const alphabeticallySorted = [...svgsByCategory].sort((a, b) =>
    a.title.localeCompare(b.title),
  );
  const formatCategory = category.charAt(0).toUpperCase() + category.slice(1);

  if (!searchParam) {
    filteredSvgs = sortParam ? alphabeticallySorted : latestSorted;
  } else {
    if (searchParam.length < 3) {
      const baseData = sortParam ? alphabeticallySorted : latestSorted;
      filteredSvgs = baseData.filter((svg: iSVG) =>
        svg.title.toLowerCase().includes(searchParam.toLowerCase()),
      );
    } else {
      const baseData = sortParam ? alphabeticallySorted : latestSorted;
      filteredSvgs = searchWithFuse(baseData)
        .search(searchParam)
        .map((result) => result.item);
    }
  }

  return {
    category: formatCategory,
    searchTerm: searchParam,
    sorted: sortParam,
    initialSvgs: filteredSvgs,
    latestSorted,
    alphabeticallySorted,
  };
}) satisfies PageLoad;
