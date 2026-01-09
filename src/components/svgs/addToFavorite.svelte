<script lang="ts">
  import type { iSVG } from "@/types/svg";

  import { cn } from "@/utils/cn";
  import favoritesStore from "@/stores/favorites.store";
  import HeartIcon from "@lucide/svelte/icons/heart";

  interface Props {
    svg: iSVG;
  }

  let { svg }: Props = $props();

  let favorites = $derived($favoritesStore);
  let isFavorite = $derived(favoritesStore.isFavorite(svg, favorites));

  const toggleFavorite = () => {
    favoritesStore.toggleFavorite(svg);
  };
</script>

<button
  class={cn(
    "cursor-pointer transition-colors hover:animate-pulse",
    "text-neutral-500 hover:text-red-700 dark:text-neutral-400 dark:hover:text-red-600",
    isFavorite && "text-red-500",
  )}
  onclick={toggleFavorite}
  title={isFavorite
    ? `Delete ${svg.title} from favorites`
    : `Add ${svg.title} to favorites`}
  aria-label={isFavorite
    ? `Delete ${svg.title} from favorites`
    : `Add ${svg.title} to favorites`}
>
  <HeartIcon
    size={16}
    strokeWidth={1.8}
    class={cn(
      isFavorite &&
        "fill-red-500 text-red-600 dark:fill-red-600 dark:text-red-400",
    )}
  />
</button>
