import type { RequestEvent } from './$types';

import { json } from '@sveltejs/kit';
import { ratelimit } from '@/server/redis';

// Data:
import { svgs } from '@/data/svgs';

export const GET = async ({ request }: RequestEvent) => {
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

  const categoryTotals: Record<string, number> = {};

  svgs.forEach((svg) => {
    if (typeof svg.category === 'string') {
      categoryTotals[svg.category] = (categoryTotals[svg.category] || 0) + 1;
    } else if (Array.isArray(svg.category)) {
      svg.category.forEach((category) => {
        categoryTotals[category] = (categoryTotals[category] || 0) + 1;
      });
    }
  });

  const categories = Object.entries(categoryTotals).map(([category, total]) => ({
    category,
    total
  }));

  // Status 200 | If limit is a number:
  return json(categories, { status: 200 });
};
