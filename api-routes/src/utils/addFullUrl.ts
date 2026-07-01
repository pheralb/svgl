import type { ThemeOptions } from "@/data/types/svg";

const fullUrl = "https://svgl.app";

export const addFullUrl = (
  value: string | ThemeOptions,
): string | ThemeOptions => {
  if (typeof value === "string") {
    return `${fullUrl}${value}`;
  }
  return {
    light: `${fullUrl}${value.light}`,
    dark: `${fullUrl}${value.dark}`,
  };
};
