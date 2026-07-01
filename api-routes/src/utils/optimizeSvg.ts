import { optimize } from "svgo";

export const optimizeSvg = (svgCode: string): string => {
  const result = optimize(svgCode, {
    multipass: true,
    plugins: [
      "removeDimensions",
      "removeXMLNS",
      "removeDoctype",
      "removeComments",
      "removeStyleElement",
      "cleanupAttrs",
      "cleanupEnableBackground",
      "minifyStyles",
      "removeDesc",
      "removeEmptyAttrs",
      "removeEmptyText",
      "removeHiddenElems",
      "removeNonInheritableGroupAttrs",
      "removeUnknownsAndDefaults",
      "removeUselessDefs",
      "removeUselessStrokeAndFill",
      "removeXMLProcInst",
      {
        name: "removeAttrs",
        params: { attrs: "(data-name|class)" },
      },
    ],
  });
  return result.data;
};
