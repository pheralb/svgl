import type { PageLoad } from "./$types";
import type { iSVG } from "@/types/svg";

import { svgs } from "@/data/svgs";
import { error } from "@sveltejs/kit";
import { searchWithFuse } from "@/utils/searchWithFuse";

export const load: PageLoad = (async ({ params, url }) => {
  const { category } = params;
  const searchParam = url.searchParams.get("search") || "";

  const svgsByCategory = svgs.filter((svg: iSVG) => {
    if (Array.isArray(svg.category)) {
      return svg.category.some(
        (categoryItem) => categoryItem.toLowerCase() === category.toLowerCase(),
      );
    } else {
      return svg.category.toLowerCase() === category.toLowerCase();
    }
  });

  if (svgsByCategory.length === 0) {
    throw error(404, "Category not found");
  }

  let filteredSvgs: iSVG[] = [];

  if (!searchParam) {
    filteredSvgs = svgsByCategory;
  } else {
    if (searchParam.length < 3) {
      filteredSvgs = svgsByCategory.filter((svg: iSVG) =>
        svg.title.toLowerCase().includes(searchParam.toLowerCase()),
      );
    } else {
      filteredSvgs = searchWithFuse(svgsByCategory)
        .search(searchParam)
        .map((result) => result.item);
    }
  }

  return {
    category: category,
    searchTerm: searchParam,
    svgs: svgsByCategory,
    filteredSvgs: filteredSvgs,
  };
}) satisfies PageLoad;
