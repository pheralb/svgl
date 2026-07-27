import type { Extension } from "@/types/extensions";
import type { iSVG } from "@/types/svg";
import Fuse from "fuse.js";

export const searchSvgsWithFuse = (svgsData: iSVG[]) => {
  return new Fuse<iSVG>(svgsData, {
    keys: ["title"],
    threshold: 0.35,
    ignoreLocation: true,
    isCaseSensitive: false,
    shouldSort: true,
  });
};

export const searchExtensionsWithFuse = (extensionsData: Extension[]) => {
  return new Fuse<Extension>(extensionsData, {
    keys: ["name", "description"],
    threshold: 0.35,
    ignoreLocation: true,
    isCaseSensitive: false,
    shouldSort: true,
  });
};
