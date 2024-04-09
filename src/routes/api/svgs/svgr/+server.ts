import type { RequestEvent } from '../$types';

import { transform } from '@svgr/core';
import { json } from '@sveltejs/kit';

export const POST = async ({ request }: RequestEvent) => {
  try {
    const body = await request.json();

    const svgCode = body.code;
    const typescript = body.typescript;
    const name = body.name;

    const jsCode = await transform(
      svgCode,
      {
        plugins: ['@svgr/plugin-jsx'],
        icon: true,
        typescript: typescript
      },
      { componentName: name }
    );

    return json(jsCode, { status: 200 });
  } catch (error) {
    return json(
      { error: `Error al transformar el SVG a componente React: ${error}` },
      { status: 500 }
    );
  }
};
