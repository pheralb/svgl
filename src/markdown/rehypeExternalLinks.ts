import type { UnistNode, UnistTree } from "@/types/unist";
import { visit } from "unist-util-visit";

const APP_DOMAIN = "svgl.app";

export const rehypeExternalLinks = () => {
  return (tree: UnistTree) => {
    visit(tree, "element", (node: UnistNode) => {
      if (node.tagName === "a" && node.properties?.href) {
        const href = String(node.properties.href);
        if (!href.includes(APP_DOMAIN)) {
          node.properties.target = "_blank";
          node.properties.rel = "noopener noreferrer";
        }
      }
    });
  };
};
