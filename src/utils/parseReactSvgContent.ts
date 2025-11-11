import { format } from "prettier";

interface ParseReactSvgOptions {
  componentName: string;
  svgCode: string;
  typescript: boolean;
}

const convertStyleStringToObject = (styleString: string): string => {
  const styleObj: Record<string, string> = {};
  styleString.split(";").forEach((style) => {
    const [property, value] = style.split(":").map((s) => s.trim());
    if (property && value) {
      const camelCaseProperty = property.replace(/-([a-z])/g, (g) =>
        g[1].toUpperCase(),
      );
      styleObj[camelCaseProperty] = value;
    }
  });
  return JSON.stringify(styleObj);
};

export const parseReactSvgContent = async ({
  componentName,
  svgCode,
  typescript,
}: ParseReactSvgOptions) => {
  const processedSvg = svgCode.replace(/style="([^"]*)"/g, (_, styleString) => {
    return `style={${convertStyleStringToObject(styleString)}}`;
  });
  const reactifiedSvg = processedSvg
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
      `import type { SVGProps } from "react";\n\n` +
      `const ${componentName} = (props: SVGProps<SVGSVGElement>) => (\n  ${reactifiedSvg}\n);\n\n` +
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
