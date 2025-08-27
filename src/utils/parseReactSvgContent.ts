import { parse, print, type Module } from "@swc/core";

interface ParseReactSvgOptions {
  componentName: string;
  svgCode: string;
  typescript: boolean;
  minify?: boolean;
}

export const parseReactSvgContent = async ({
  componentName,
  svgCode,
  typescript,
  minify = false,
}: ParseReactSvgOptions) => {
  let structuredCode = "";

  if (typescript) {
    structuredCode =
      `import * as React from 'react';\n\n` +
      `const ${componentName} = (props: React.SVGProps<SVGSVGElement>) => (\n  ${svgCode.replace("<svg", "<svg {...props}")}\n);\n\n` +
      `export { ${componentName} };`;
  } else {
    structuredCode = `const ${componentName} = (props) => (\n  ${svgCode.replace("<svg", "<svg {...props}")}\n);\n\nexport { ${componentName} };`;
  }

  const ast: Module = await parse(structuredCode, {
    syntax: typescript ? "typescript" : "ecmascript",
    ...(typescript ? { tsx: true } : { jsx: true }),
  });
  const { code } = await print(ast, { minify });
  return code;
};
