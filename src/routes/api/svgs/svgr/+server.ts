import type { RequestEvent } from "@sveltejs/kit";
import { json, redirect } from "@sveltejs/kit";

import { optimizeSvg } from "@/utils/optimizeSvg";
import { parseReactSvgContent } from "@/utils/parseReactSvgContent";

export const GET = async () => {
  return redirect(301, "https://svgl.app/api");
};

export const POST = async ({ request }: RequestEvent) => {
  try {
    const body = await request.json();

    let svgCode = body.code;
    const typescript = body.typescript;
    const name = body.name.replace(/[^a-zA-Z0-9]/g, "");
    const shouldOptimize = body.optimize !== false;

    if (shouldOptimize) {
      svgCode = optimizeSvg({ svgCode });
    }

    const code = await parseReactSvgContent({
      componentName: name,
      svgCode: svgCode,
      typescript,
    });

    return json({ data: code }, { status: 200 });
  } catch (error) {
    return json(
      { error: `⚠️ api/svgs/svgr - Error: ${error}` },
      { status: 500 },
    );
  }
};
