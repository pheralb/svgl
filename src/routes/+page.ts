import type { iSVG } from "@/types/svg";
import type { Load } from "@sveltejs/kit";

import Fuse from "fuse.js";
import { svgsData } from "@/data";

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
    const fuse = new Fuse<iSVG>(svgsData, {
      keys: ["title"],
      threshold: 0.35,
      ignoreLocation: true,
      isCaseSensitive: false,
      shouldSort: true,
    });

    if (searchParam.length < 3) {
      const baseData = sortParam ? alphabeticallySorted : latestSorted;
      filteredSvgs = baseData.filter((svg: iSVG) =>
        svg.title.toLowerCase().includes(searchParam.toLowerCase()),
      );
    } else {
      filteredSvgs = fuse.search(searchParam).map((result) => result.item);
    }
  }

  return {
    searchTerm: searchParam,
    sorted: sortParam,
    initialSvgs: filteredSvgs,
    latestSorted,
    alphabeticallySorted,
  };
};
