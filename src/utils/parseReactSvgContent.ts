import { format } from "prettier";

interface ParseReactSvgOptions {
  componentName: string;
  svgCode: string;
  typescript: boolean;
}

const Attributes: Record<string, string> = {
  class: "className",
  "clip-rule": "clipRule",
  "clip-path": "clipPath",
  "fill-rule": "fillRule",
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-dasharray": "strokeDasharray",
  "stroke-dashoffset": "strokeDashoffset",
  "stroke-miterlimit": "strokeMiterlimit",
  "xmlns:xlink": "xmlnsXlink",
  "text-anchor": "textAnchor",
  "xml:space": "xmlSpace",
  "stop-color": "stopColor",
  "color-interpolation-filters": "colorInterpolationFilters",
  "xlink:href": "xlinkHref",
};

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

  const reactifiedSvg = Object.entries(Attributes).reduce(
    (svg, [htmlAttr, reactAttr]) =>
      svg.replace(new RegExp(`${htmlAttr}="`, "g"), `${reactAttr}="`),
    processedSvg.replace("<svg", "<svg {...props}"),
  );

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
