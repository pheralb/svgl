import { optimize } from "svgo/browser";

interface OptimizeSvg {
  svgCode: string;
}

export const optimizeSvg = ({ svgCode }: OptimizeSvg) => {
  const svgo = optimize(svgCode, {
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
      "removeDoctype",
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
  return svgo.data;
};
