import { page } from "$app/state";
import { goto } from "$app/navigation";
import { SvelteURLSearchParams } from "svelte/reactivity";

interface SearchParams {
  params: Record<string, string | null>;
}

const addParams = ({ params }: SearchParams) => {
  const searchParams = new SvelteURLSearchParams(page.url.searchParams);
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
  });
  goto(`?${searchParams.toString()}`, {
    keepFocus: true,
    noScroll: true,
    replaceState: true,
  });
};

const deleteParam = (key: string) => {
  const params = new SvelteURLSearchParams(page.url.searchParams);
  params.delete(key);
  goto(`?${params.toString()}`, {
    keepFocus: true,
    noScroll: true,
    replaceState: true,
  });
};

export { addParams, deleteParam };
