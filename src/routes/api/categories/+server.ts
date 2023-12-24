import type { RequestEvent } from './$types';

import { json } from '@sveltejs/kit';
import { ratelimit } from '@/server/redis';

// Data:
import { svgs } from '@/data/svgs';

export const GET = async ({ request }: RequestEvent) => {
  const categories = svgs
    .map((svg) => svg.category)
    .filter((category, index, array) => array.indexOf(category) === index);
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

  // Status 200 | If limit is a number:
  return json(
    categories.map((category) => {
      return {
        category,
        total: svgs.filter((svg) => svg.category === category).length
      };
    }),
    { status: 200 }
  );
};
