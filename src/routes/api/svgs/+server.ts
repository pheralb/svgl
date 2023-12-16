import type { RequestEvent } from './$types';

import { error, json } from '@sveltejs/kit';

// Data:
import { fullRouteSvgsData } from '@/data';

export const GET = ({ url }: RequestEvent) => {
  const getParams = url.searchParams.get('limit');

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
