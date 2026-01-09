import type { iSVG, ThemeOptions } from "@/types/svg";
import type { Category } from "@/types/categories";
import type { Extension } from "@/types/extensions";

import { svgs } from "@/data/svgs";
import { extensions } from "@/data/extensions";

export const svgsData = svgs.map((svg: iSVG, index: number) => {
  return { id: index, ...svg };
}) as iSVG[];

export const extensionsData = extensions.map((extension, index) => {
  return { id: index, ...extension };
}) as Extension[];

export const getCategories = (): Category[] => {
  const categories = svgs
    .flatMap((svg) =>
      Array.isArray(svg.category) ? svg.category : [svg.category],
    )
    .filter((category, index, array) => array.indexOf(category) === index);
  return categories;
};

export const getSvgsByCategory = (category: string): iSVG[] =>
  svgsData.filter((svg: iSVG) => {
    if (Array.isArray(svg.category)) {
      return svg.category.some(
        (categoryItem) => categoryItem.toLowerCase() === category.toLowerCase(),
      );
    } else {
      return svg.category.toLowerCase() === category.toLowerCase();
    }
  });

interface GetSvgImgUrl {
  url: string | ThemeOptions;
  isDark: boolean;
}

export const getSvgImgUrl = ({ url, isDark }: GetSvgImgUrl) => {
  if (typeof url === "string") return url;
  return isDark ? url.dark : url.light;
};
