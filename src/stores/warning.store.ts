import { writable } from "svelte/store";
import { browser } from "$app/environment";

const localStorageKey = "svgl_warning";

function getInitialWarningState(): boolean {
  if (browser) {
    const stored = localStorage.getItem(localStorageKey);
    return stored === "true";
  }
  return false;
}

const warningStore = writable<boolean>(getInitialWarningState());

function acceptWarning() {
  warningStore.set(true);
  if (browser) {
    localStorage.setItem(localStorageKey, "true");
  }
}

export { warningStore, acceptWarning };
