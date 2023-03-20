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
  const svgsByCategory = svgs.filter((svg: iSVG) => svg.category.toLowerCase() === slug);

  return {
    props: {
      category: slug,
      svgs: svgsByCategory
    }
  };
}) satisfies PageLoad;
