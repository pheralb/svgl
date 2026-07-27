import { optimize } from "svgo/browser";

export const getPrefixFromSvgUrl = (svgUrl: string) => {
  return svgUrl.split("/").pop()!.replace(".svg", "").split("-").join("_");
};

export const prefixSvgIds = (content: string, prefix: string): string => {
  const result = optimize(content, {
    plugins: [
      {
        name: "prefixIds",
        params: {
          prefix,
        },
      },
    ],
    multipass: false,
  });
  return (result as { data: string }).data;
};
