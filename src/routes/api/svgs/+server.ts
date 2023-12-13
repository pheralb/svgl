import type { RequestEvent } from './$types';
import type { iSVG } from '@/types/svg';

import { error, json } from '@sveltejs/kit';

// Data:
import { svgs } from '@/data/svgs';

export const GET = ({ url }: RequestEvent) => {
  const getParams = url.searchParams.get('limit');

  // Modify svg route to add 'svgl.vercel.app' to the beginning:
  const fullSVGRoute: iSVG[] = svgs.map((svg) => ({
    ...svg,
    route: `https://svgl.vercel.app${svg.route}`
  }));

  // Status 200 | If no limit is provided, return all svgs:
  if (!getParams) {
    return json(fullSVGRoute, { status: 200 });
  }

  const limit = Number(getParams);

  // Error 400 | if limit is not a number:
  if (isNaN(limit)) {
    throw error(400, {
      message: 'Limit must be a number.'
    });
  }

  // Error 400 | If limit is not positive:
  if (limit < 1) {
    throw error(400, {
      message: 'Limit must be a positive number.'
    });
  }

  // Error 400 | If limit is greater than the number of svgs:
  if (limit > fullSVGRoute.length) {
    throw error(400, {
      message: 'Limit is greater than the number of svgs.'
    });
  }

  // Status 200 | If limit is a number:
  return json(fullSVGRoute.slice(0, limit), { status: 200 });
};
