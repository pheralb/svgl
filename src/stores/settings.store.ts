import { writable } from "svelte/store";
import { browser } from "$app/environment";

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

interface Settings {
  packageManager: PackageManager;
  optimizeSvgs: boolean;
}

const localStorageKey = "svgl_settings";
const defaultSettings: Settings = {
  packageManager: "pnpm",
  optimizeSvgs: true,
};

function getInitialSettings(): Settings {
  if (browser) {
    try {
      const stored = localStorage.getItem(localStorageKey);
      if (stored) {
        const parsedSettings = JSON.parse(stored) as Partial<Settings>;
        return {
          packageManager: parsedSettings.packageManager
            ? parsedSettings.packageManager
            : defaultSettings.packageManager,
          optimizeSvgs:
            typeof parsedSettings.optimizeSvgs === "boolean"
              ? parsedSettings.optimizeSvgs
              : defaultSettings.optimizeSvgs,
        };
      }
    } catch (error) {
      console.error("Error parsing settings from localStorage:", error);
    }
  }
  return defaultSettings;
}

function createSettingsStore() {
  const { subscribe, set, update } = writable<Settings>(getInitialSettings());

  return {
    subscribe,

    // Update package manager
    setPackageManager: (packageManager: PackageManager) => {
      update((settings) => {
        const newSettings = { ...settings, packageManager };
        if (browser) {
          localStorage.setItem(localStorageKey, JSON.stringify(newSettings));
        }
        return newSettings;
      });
    },

    // Update optimize SVGs setting
    setOptimizeSvgs: (optimizeSvgs: boolean) => {
      update((settings) => {
        const newSettings = { ...settings, optimizeSvgs };
        if (browser) {
          localStorage.setItem(localStorageKey, JSON.stringify(newSettings));
        }
        return newSettings;
      });
    },

    // Update multiple settings at once
    updateSettings: (newSettings: Partial<Settings>) => {
      update((settings) => {
        const updatedSettings = { ...settings, ...newSettings };
        if (browser) {
          localStorage.setItem(
            localStorageKey,
            JSON.stringify(updatedSettings),
          );
        }
        return updatedSettings;
      });
    },

    // Reset to default settings
    reset: () => {
      set(defaultSettings);
      if (browser) {
        localStorage.setItem(localStorageKey, JSON.stringify(defaultSettings));
      }
    },
  };
}

const settingsStore = createSettingsStore();

export { settingsStore, type PackageManager, type Settings };
