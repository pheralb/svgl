import type { iSVG } from "@/types/svg";
import Fuse from "fuse.js";

export const searchWithFuse = (svgsData: iSVG[]) => {
  return new Fuse<iSVG>(svgsData, {
    keys: ["title"],
    threshold: 0.35,
    ignoreLocation: true,
    isCaseSensitive: false,
    shouldSort: true,
  });
};
