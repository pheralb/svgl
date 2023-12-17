import type { RequestEvent } from './$types';
import type { iSVG } from '@/types/svg';

import { error, json } from '@sveltejs/kit';
import { ratelimit } from '@/server/redis';

// Data:
import { svgsData } from '@/data';

export const GET = async ({ url, request }: RequestEvent) => {
  const fullUrl = url.origin ?? 'svgl.vercel.app';
  const ip = request.headers.get('x-forwarded-for') ?? '';
  const { success, reset } = await ratelimit.limit(ip);

  // Error 429 | If rate limit is exceeded:
  if (!success) {
    const now = Date.now();
    const retryAfter = Math.floor((reset - now) / 1000);
    return new Response('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': retryAfter.toString()
      }
    });
  }

  // Params:
  const getLimitParams = url.searchParams.get('limit');
  const getCategoryParams = url.searchParams.get('category');
  const getSearchParams = url.searchParams.get('search');

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
  if (!getLimitParams && !getCategoryParams && !getSearchParams) {
    return json(fullRouteSvgsData, { status: 200 });
  }

  const limit = Number(getLimitParams);
  const category = getCategoryParams;

  if (category) {
    const categorySvgs = fullRouteSvgsData.filter((svg) => {
      return svg.category === category.charAt(0).toUpperCase() + category.slice(1);
    });

    // Error 400 | If category does not exist:
    if (categorySvgs.length === 0) {
      error(400, {
        message: 'Category does not exist.'
      });
    }

    if (!getLimitParams) {
      return json(categorySvgs, { status: 200 });
    }

    return json(categorySvgs.slice(0, limit), { status: 200 });
  }

  if (getSearchParams) {
    const searchSvgs = fullRouteSvgsData.filter((svg) => {
      return svg.title.toLowerCase().includes(getSearchParams.toLowerCase());
    });

    // Error 400 | If search does not exist:
    if (searchSvgs.length === 0) {
      error(400, {
        message: 'Search does not exist.'
      });
    }

    if (!getLimitParams) {
      return json(searchSvgs, { status: 200 });
    }

    return json(searchSvgs.slice(0, limit), { status: 200 });
  }

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
