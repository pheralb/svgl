import type { RequestEvent } from '../$types';

import { transform } from '@svgr/core';
import { json } from '@sveltejs/kit';

import { ratelimit } from '@/server/redis';

// SVGR Plugins:
import svgrJSX from '@svgr/plugin-jsx';

export const POST = async ({ request }: RequestEvent) => {
  const ip = request.headers.get('x-forwarded-for') ?? '';
  const { success, reset } = await ratelimit.limit(ip);

  // Error 429 | If rate limit is exceeded:
  if (!success) {
    const now = Date.now();
    const retryAfter = Math.floor((reset - now) / 500);
    return new Response('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': retryAfter.toString()
      }
    });
  }

  try {
    const body = await request.json();

    const svgCode = body.code;
    const typescript = body.typescript;
    const name = body.name;

    const jsCode = await transform(
      svgCode,
      {
        plugins: [svgrJSX],
        icon: true,
        typescript: typescript
      },
      { componentName: name }
    );

    return json({ data: jsCode }, { status: 200 });
  } catch (error) {
    return json(
      { error: `Error al transformar el SVG a componente React: ${error}` },
      { status: 500 }
    );
  }
};
