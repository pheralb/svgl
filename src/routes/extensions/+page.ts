import type { Load } from "@sveltejs/kit";

import { extensionsData } from "@/data";
import { searchExtensionsWithFuse } from "@/utils/searchWithFuse";

export const load: Load = ({ url }) => {
  const searchParam = url.searchParams.get("search") || "";
  let filteredExtensions = [...extensionsData];

  if (searchParam) {
    const fuseSearch = searchExtensionsWithFuse(extensionsData);
    filteredExtensions = fuseSearch
      .search(searchParam)
      .map((result) => result.item);
  }

  return {
    searchTerm: searchParam,
    initialExtensions: filteredExtensions,
    allExtensions: extensionsData,
  };
};
