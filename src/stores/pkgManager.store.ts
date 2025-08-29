import { writable } from "svelte/store";
import { browser } from "$app/environment";

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

const localStorageKey = "svgl_package_manager";
const defaultValue: PackageManager = "npm";

function getInitialValue(): PackageManager {
  if (browser) {
    const stored = localStorage.getItem(localStorageKey);
    if (
      stored === "npm" ||
      stored === "pnpm" ||
      stored === "yarn" ||
      stored === "bun"
    ) {
      return stored;
    }
  }
  return defaultValue;
}

const pkgManager = writable<PackageManager>(getInitialValue());

pkgManager.subscribe((value) => {
  if (browser) {
    localStorage.setItem(localStorageKey, value);
  }
});

export { pkgManager, type PackageManager };
