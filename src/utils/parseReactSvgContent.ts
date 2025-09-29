import { format } from "prettier";

interface ParseReactSvgOptions {
  componentName: string;
  svgCode: string;
  typescript: boolean;
}

export const parseReactSvgContent = async ({
  componentName,
  svgCode,
  typescript,
}: ParseReactSvgOptions) => {
  const reactifiedSvg = svgCode
    .replace("<svg", "<svg {...props}")
    .replace(/class="/g, 'className="')
    .replace(/clip-rule="/g, 'clipRule="')
    .replace(/clip-path="/g, 'clipPath="')
    .replace(/fill-rule="/g, 'fillRule="')
    .replace(/stroke-width="/g, 'strokeWidth="')
    .replace(/stroke-linecap="/g, 'strokeLinecap="')
    .replace(/stroke-linejoin="/g, 'strokeLinejoin="')
    .replace(/stroke-dasharray="/g, 'strokeDasharray="')
    .replace(/stroke-dashoffset="/g, 'strokeDashoffset="')
    .replace(/stroke-miterlimit="/g, 'strokeMiterlimit="')
    .replace(/text-anchor="/g, 'textAnchor="')
    .replace(/xml:space="/g, 'xmlSpace="');

  let structuredCode = "";
  if (typescript) {
    structuredCode =
      `import * as React from 'react';\n\n` +
      `const ${componentName} = (props: React.SVGProps<SVGSVGElement>) => (\n  ${reactifiedSvg}\n);\n\n` +
      `export { ${componentName} };`;
  } else {
    structuredCode = `const ${componentName} = (props) => (\n  ${reactifiedSvg}\n);\n\nexport { ${componentName} };`;
  }

  const formatted = await format(structuredCode, {
    parser: typescript ? "typescript" : "babel",
    semi: true,
    singleQuote: false,
    trailingComma: "es5",
  });

  return formatted;
};
