import type { RequestEvent } from './$types';
import type { iSVG } from '@/types/svg';

import { error, json } from '@sveltejs/kit';

// Data:
import { svgsData } from '@/data';

export const GET = ({ url }: RequestEvent) => {
  const getParams = url.searchParams.get('limit');
  const fullUrl = url.origin ?? 'svgl.vercel.app';

  // Add full route to svgs:
  const fullRouteSvgsData: iSVG[] = svgsData.map((svg) => {
    if (typeof svg.route === 'object' && svg.route !== null) {
      return {
        ...svg,
        route: {
          light: `${fullUrl}${svg.route.light}`,
          dark: `${fullUrl}${svg.route.dark}`
        }
      };
    } else if (typeof svg.route === 'string') {
      return {
        ...svg,
        route: `${fullUrl}${svg.route}`
      };
    }
    return svg;
  });

  // Status 200 | If no limit is provided, return all svgs:
  if (!getParams) {
    return json(fullRouteSvgsData, { status: 200 });
  }

  const limit = Number(getParams);

  // Error 400 | if limit is not a number:
  if (isNaN(limit)) {
    error(400, {
      message: 'Limit must be a number.'
    });
  }

  // Error 400 | If limit is not positive:
  if (limit < 1) {
    error(400, {
      message: 'Limit must be a positive number.'
    });
  }

  // Error 400 | If limit is greater than the number of svgs:
  if (limit > fullRouteSvgsData.length) {
    error(400, {
      message: 'Limit is greater than the number of svgs.'
    });
  }

  // Status 200 | If limit is a number:
  return json(fullRouteSvgsData.slice(0, limit), { status: 200 });
};
