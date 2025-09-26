import { browser } from "$app/environment";
import { writable } from "svelte/store";

export function useHasPrimaryTouch() {
  const { subscribe, set } = writable(false);
  if (!browser) {
    return {
      subscribe,
      destroy: () => {},
    };
  }
  const controller = new AbortController();
  const { signal } = controller;

  const handleTouch = () => {
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersTouch = window.matchMedia("(pointer: coarse)").matches;
    set(hasTouch && prefersTouch);
  };

  const mq = window.matchMedia("(pointer: coarse)");
  mq.addEventListener("change", handleTouch, { signal });
  window.addEventListener("pointerdown", handleTouch, { signal });

  handleTouch();

  return {
    subscribe,
    destroy: () => controller.abort(),
  };
}
