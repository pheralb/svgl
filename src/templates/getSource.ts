import { optimizeSvg } from "@/utils/optimizeSvg";

interface SourceParams {
  url: string | undefined;
}

export const getSource = async (params: SourceParams) => {
  const response = await fetch(params.url || "");
  const content = await response.text();
  const optimizedContent = optimizeSvg({ svgCode: content });
  return optimizedContent;
};
