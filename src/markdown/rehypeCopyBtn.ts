import type { UnistNode, UnistTree } from "@/types/unist";

import { visit } from "unist-util-visit";
import { cn } from "@/utils/cn";

export const rehypeCopyBtn = () => {
  return (tree: UnistTree) => {
    visit(tree, "element", (node: UnistNode, index, parent) => {
      if (node.tagName === "pre" && parent && typeof index === "number") {
        const iconSize = 14;
        const copyIcon = {
          type: "element",
          tagName: "svg",
          properties: {
            xmlns: "http://www.w3.org/2000/svg",
            width: iconSize,
            height: iconSize,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            style: "display: inline;",
          },
          children: [
            {
              type: "element",
              tagName: "rect",
              properties: {
                width: iconSize,
                height: iconSize,
                x: "8",
                y: "8",
                rx: "2",
                ry: "2",
              },
              children: [],
            },
            {
              type: "element",
              tagName: "path",
              properties: {
                d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
              },
              children: [],
            },
          ],
        };
        const successIcon = {
          type: "element",
          tagName: "svg",
          properties: {
            xmlns: "http://www.w3.org/2000/svg",
            width: iconSize,
            height: iconSize,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            class: "hidden",
          },
          children: [
            {
              type: "element",
              tagName: "path",
              properties: {
                d: "M18 6 7 17l-5-5",
              },
              children: [],
            },
            {
              type: "element",
              tagName: "path",
              properties: {
                d: "m22 10-7.5 7.5L13 16",
              },
              children: [],
            },
          ],
        };
        const copyButton = {
          type: "element",
          tagName: "button",
          title: "Copy code to clipboard",
          "aria-label": "Copy code to clipboard",
          properties: {
            type: "button",
            title: "Copy code to clipboard",
            class: cn(
              "cursor-pointer z-40 absolute top-[1px] right-[1px] px-1.5 py-0.5 rounded-bl-md",
              "border-b border-l border-neutral-200 dark:border-neutral-800",
              "transition-colors text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white",
            ),
            onclick: `
            const button = this;
            const copyIcon = button.querySelector('svg:first-child');
            const successIcon = button.querySelector('svg:last-child');
            const codeBlock = button.nextElementSibling;
            navigator.clipboard.writeText(codeBlock.innerText).then(() => {
              copyIcon.style.display = 'none';
              successIcon.style.display = 'inline';
              setTimeout(() => {
                copyIcon.style.display = 'inline';
                successIcon.style.display = 'none';
              }, 2000);
            }).catch((err) => {
              console.error('Error copying:', err);
            });
          `,
          },
          children: [copyIcon, successIcon],
        };
        const wrapper = {
          type: "element",
          tagName: "div",
          properties: { class: "relative" },
          children: [copyButton, node],
        };
        parent.children[index] = wrapper;
      }
    });
  };
};
