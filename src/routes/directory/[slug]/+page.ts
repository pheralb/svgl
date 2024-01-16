import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import { svgs } from '@/data/svgs';
import type { iSVG } from '@/types/svg';

export const load = (async ({ params }) => {
  const { slug } = params;

  // Check if slug is valid:
  if (!slug) {
    return error(404, 'Not found');
  }

  // Filter out the svg with the matching slug:
  const svgsByCategory = svgs.filter((svg: iSVG) => {
    if (Array.isArray(svg.category)) {
      return svg.category.some(categoryItem => categoryItem.toLowerCase() === slug);
    } else {
      return svg.category.toLowerCase() === slug;
    }
  });

  return {
    category: slug as string,
    svgs: svgsByCategory
  };
}) satisfies PageLoad;
