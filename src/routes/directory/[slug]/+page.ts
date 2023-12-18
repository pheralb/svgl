import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import { svgs } from '@/data/svgs';
import type { iSVG } from '@/types/svg';
import type { tCategory } from '@/types/categories';

export const load = (async ({ params }) => {
  const { slug } = params;

  // Check if slug is valid:
  if (!slug) {
    return error(404, 'Not found');
  }

  // Filter out the svg with the matching slug:
  const svgsByCategory = svgs.filter((svg: iSVG) => {
    return svg.category.map((category) => category.toLowerCase()).includes(slug as tCategory);
  });



  return {
    category: slug as string,
    svgs: svgsByCategory
  };
}) satisfies PageLoad;
