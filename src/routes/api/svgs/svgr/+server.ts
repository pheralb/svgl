import type { RequestEvent } from '../$types';

import { transform } from '@svgr/core';
import { json, redirect } from '@sveltejs/kit';

import { ratelimit } from '@/server/redis';

// SVGR Plugins:
import svgrJSX from '@svgr/plugin-jsx';

export const GET = async () => {
  return redirect(301, 'https://svgl.app/api');
};

export const POST = async ({ request }: RequestEvent) => {
  try {
    const body = await request.json();

    const svgCode = body.code;
    const typescript = body.typescript;
    const name = body.name.replace(/[^a-zA-Z0-9]/g, '');

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
    return json({ error: `⚠️ api/svgs/svgr - Error: ${error}` }, { status: 500 });
  }
};
