import type { iSVG } from "@/types/svg";
import type { Load } from "@sveltejs/kit";

import { svgsData } from "@/data";
import { searchSvgsWithFuse } from "@/utils/searchWithFuse";

export const load: Load = ({ url }) => {
  const searchParam = url.searchParams.get("search") || "";
  const sortParam = url.searchParams.get("sort") === "alphabetical";
  const latestSorted = [...svgsData].sort((a, b) => b.id! - a.id!);
  const alphabeticallySorted = [...svgsData].sort((a, b) =>
    a.title.localeCompare(b.title),
  );

  let filteredSvgs: iSVG[] = [];

  if (!searchParam) {
    filteredSvgs = sortParam ? alphabeticallySorted : latestSorted;
  } else {
    const baseData = sortParam ? alphabeticallySorted : latestSorted;
    filteredSvgs = searchSvgsWithFuse(baseData)
      .search(searchParam)
      .map((result) => result.item);
  }

  return {
    searchTerm: searchParam,
    sorted: sortParam,
    initialSvgs: filteredSvgs,
    latestSorted,
    alphabeticallySorted,
  };
};
