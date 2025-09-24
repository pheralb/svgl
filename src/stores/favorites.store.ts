import type { iSVG } from "@/types/svg";
import { svgs } from "@/data/svgs";

import { writable } from "svelte/store";
import { browser } from "$app/environment";

const localStorageKey = "svgl_favorites";

function createFavoritesStore() {
  const validateFavorites = (favorites: iSVG[]): iSVG[] => {
    return favorites.filter((favorite) => {
      const existsInSvgs = svgs.some((svg) => {
        return (
          svg.title === favorite.title &&
          JSON.stringify(svg.route) === JSON.stringify(favorite.route)
        );
      });
      return existsInSvgs;
    });
  };

  const loadFavorites = (): iSVG[] => {
    if (browser) {
      try {
        const stored = localStorage.getItem(localStorageKey);
        if (stored) {
          const storedFavorites: iSVG[] = JSON.parse(stored);
          const validatedFavorites = validateFavorites(storedFavorites);
          if (validatedFavorites.length !== storedFavorites.length) {
            localStorage.setItem(
              localStorageKey,
              JSON.stringify(validatedFavorites),
            );
          }
          return validatedFavorites;
        }
        return [];
      } catch (error) {
        console.error("❌ stores/favorites - Error loading favorites:", error);
        return [];
      }
    }
    return [];
  };

  const saveFavorites = (favorites: iSVG[]) => {
    if (browser) {
      try {
        localStorage.setItem(localStorageKey, JSON.stringify(favorites));
      } catch (error) {
        console.error("❌ stores/favorites - Error saving favorites:", error);
      }
    }
  };

  const { subscribe, set, update } = writable<iSVG[]>(loadFavorites());

  return {
    subscribe,

    // Add SVG to favorites:
    addToFavorites: (item: iSVG) =>
      update((favorites) => {
        const exists = favorites.some(
          (fav) =>
            fav.title === item.title &&
            JSON.stringify(fav.route) === JSON.stringify(item.route),
        );
        if (!exists) {
          const newFavorites = [...favorites, item];
          saveFavorites(newFavorites);
          return newFavorites;
        }
        return favorites;
      }),

    // Delete SVG from favorites:
    removeFromFavorites: (item: iSVG) =>
      update((favorites) => {
        const newFavorites = favorites.filter(
          (fav) =>
            !(
              fav.title === item.title &&
              JSON.stringify(fav.route) === JSON.stringify(item.route)
            ),
        );
        saveFavorites(newFavorites);
        return newFavorites;
      }),

    // Toggle (add/remove) SVG from favorites:
    toggleFavorite: (item: iSVG) =>
      update((favorites) => {
        const exists = favorites.some(
          (fav) =>
            fav.title === item.title &&
            JSON.stringify(fav.route) === JSON.stringify(item.route),
        );

        let newFavorites;
        if (exists) {
          newFavorites = favorites.filter(
            (fav) =>
              !(
                fav.title === item.title &&
                JSON.stringify(fav.route) === JSON.stringify(item.route)
              ),
          );
        } else {
          newFavorites = [...favorites, item];
        }

        saveFavorites(newFavorites);
        return newFavorites;
      }),

    // Check if SVG is in favorites:
    isFavorite: (item: iSVG, currentFavorites: iSVG[]) => {
      return currentFavorites.some(
        (fav) =>
          fav.title === item.title &&
          JSON.stringify(fav.route) === JSON.stringify(item.route),
      );
    },

    // Clear favorites:
    clearFavorites: () => {
      set([]);
      saveFavorites([]);
    },

    getCount: (currentFavorites: iSVG[]) => currentFavorites.length,

    validateAndCleanup: () => {
      update((favorites) => {
        const validatedFavorites = validateFavorites(favorites);
        if (validatedFavorites.length !== favorites.length) {
          saveFavorites(validatedFavorites);
        }
        return validatedFavorites;
      });
    },
  };
}

const favoritesStore = createFavoritesStore();

export default favoritesStore;
