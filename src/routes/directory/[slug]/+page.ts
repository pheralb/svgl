import type { PageLoad, EntryGenerator } from './$types';
import type { iSVG } from '@/types/svg';

import { error } from '@sveltejs/kit';
import { svgs } from '@/data/svgs';
import { getCategoriesForDirectory } from '@/data';

export const entries: EntryGenerator = () => {
  const categories = getCategoriesForDirectory();
  return categories;
};

export const prerender = true;

export const load = (async ({ params }) => {
  const { slug } = params;

  const svgsByCategory = svgs.filter((svg: iSVG) => {
    if (Array.isArray(svg.category)) {
      return svg.category.some((categoryItem) => categoryItem.toLowerCase() === slug.toLowerCase());
    } else {
      return svg.category.toLowerCase() === slug.toLowerCase();
    }
  });

  if (svgsByCategory.length === 0) {
    throw error(404, 'Category not found');
  }

  return {
    category: slug,
    svgs: svgsByCategory
  };
}) satisfies PageLoad;
