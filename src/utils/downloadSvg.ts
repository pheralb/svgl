import type { iSVG } from "@/types/svg";

import JSZip from "jszip";
import { download } from "@/utils/download";
import { getSource } from "@/templates/getSource";
import { getPrefixFromSvgUrl, prefixSvgIds } from "@/utils/prefixSvgIds";

interface DownloadResult {
  success: boolean;
  message: string;
}

interface DownloadSvg {
  url: string;
}

interface DownloadAllVariants {
  svgInfo: iSVG;
  lightRoute: string;
  darkRoute: string;
  isWordmark?: boolean;
}

export const downloadSvg = async ({
  url,
}: DownloadSvg): Promise<DownloadResult> => {
  try {
    let content = await getSource({
      url: url,
    });
    if (url) {
      content = prefixSvgIds(content, getPrefixFromSvgUrl(url));
    }
    download({
      content: content || "",
      filename: url?.split("/").pop() || "",
      mimeType: "image/svg+xml",
    });
    return {
      success: true,
      message: "SVG downloaded successfully",
    };
  } catch (error) {
    console.error("❌ utils/downloadSvg - Error downloading SVG:", error);
    return {
      success: false,
      message: "Error downloading SVG",
    };
  }
};

export const downloadAllVariants = async ({
  svgInfo,
  lightRoute,
  darkRoute,
  isWordmark,
}: DownloadAllVariants): Promise<boolean> => {
  try {
    const zip = new JSZip();

    let lightSvg = await getSource({
      url: lightRoute,
    });
    let darkSvg = await getSource({
      url: darkRoute,
    });

    lightSvg = prefixSvgIds(
      lightSvg,
      svgInfo.title.toLowerCase() + (isWordmark ? "_wordmark_light" : "_light"),
    );
    darkSvg = prefixSvgIds(
      darkSvg,
      svgInfo.title.toLowerCase() + (isWordmark ? "_wordmark_dark" : "_dark"),
    );

    if (isWordmark) {
      zip.file(`${svgInfo.title}_wordmark_light.svg`, lightSvg);
      zip.file(`${svgInfo.title}_wordmark_dark.svg`, darkSvg);
    } else {
      zip.file(`${svgInfo.title}_light.svg`, lightSvg);
      zip.file(`${svgInfo.title}_dark.svg`, darkSvg);
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
      download({
        content,
        filename: isWordmark
          ? `${svgInfo.title}_wordmark_light_dark.zip`
          : `${svgInfo.title}_light_dark.zip`,
        mimeType: "application/zip",
      });
    });
    return true;
  } catch (error) {
    console.error(
      "❌ utils/downloadSvg - Error downloading all variants:",
      error,
    );
    return false;
  }
};
