import { optimizeSvg } from "@/utils/optimizeSvg";

interface SourceParams {
  url: string | undefined;
  optimize?: boolean;
}

export const getSource = async (params: SourceParams) => {
  if (!params.url) return "";
  const response = await fetch(params.url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch SVG: ${response.status} ${response.statusText}`,
    );
  }
  const content = await response.text();
  if (!params.optimize) return content;
  const optimizedContent = optimizeSvg({ svgCode: content });
  return optimizedContent;
};
