import { optimizeSvg } from "@/utils/optimizeSvg";

interface SourceParams {
  url: string | undefined;
  optimize?: boolean;
}

export const getSource = async (params: SourceParams) => {
  const response = await fetch(params.url || "");
  const content = await response.text();
  if (!params.optimize) return content;
  const optimizedContent = optimizeSvg({ svgCode: content });
  return optimizedContent;
};
