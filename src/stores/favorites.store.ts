import type { iSVG } from "@/types/svg";
import { svgs } from "@/data/svgs";

import { writable } from "svelte/store";
import { browser } from "$app/environment";

const localStorageKey = "svgl_favorites";

function createFavoritesStore() {
  // Check if the favorites exist in the SVGs array:
  const validateFavorites = (favorites: iSVG[]): iSVG[] => {
    return favorites.filter((favorite) => {
      const existsInSvgs = svgs.some((svg) => {
        return (
          svg.title === favorite.title &&
          JSON.stringify(svg.route) === JSON.stringify(favorite.route)
        );
      });

      if (!existsInSvgs) {
        console.warn(
          `🗑️ Favorito eliminado: "${favorite.title}" ya no existe en la colección de SVGs`,
        );
      }

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
        const exists = favorites.some((fav) =>
          typeof item === "object" && item.id
            ? fav.id === item.id
            : fav === item,
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
        const newFavorites = favorites.filter((fav) =>
          typeof item === "object" && item.id
            ? fav.id !== item.id
            : fav !== item,
        );
        saveFavorites(newFavorites);
        return newFavorites;
      }),

    // Toggle (add/remove) SVG from favorites:
    toggleFavorite: (item: iSVG) =>
      update((favorites) => {
        const exists = favorites.some((fav) =>
          typeof item === "object" && item.id
            ? fav.id === item.id
            : fav === item,
        );

        let newFavorites;
        if (exists) {
          newFavorites = favorites.filter((fav) =>
            typeof item === "object" && item.id
              ? fav.id !== item.id
              : fav !== item,
          );
        } else {
          newFavorites = [...favorites, item];
        }

        saveFavorites(newFavorites);
        return newFavorites;
      }),

    // Check if SVG is in favorites:
    isFavorite: (item: iSVG, currentFavorites: iSVG[]) => {
      return currentFavorites.some((fav) =>
        typeof item === "object" && item.id ? fav.id === item.id : fav === item,
      );
    },

    // Delete all favorites:
    clearFavorites: () => {
      set([]);
      saveFavorites([]);
    },

    // Get count of favorites:
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
