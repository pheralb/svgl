import { z } from "zod";
import path from "node:path";
import fs from "node:fs/promises";

// Content Collections:
import { compileMarkdown } from "@content-collections/markdown";
import { defineCollection, defineConfig } from "@content-collections/core";

// Plugins:
import rehypeSlug from "rehype-slug";
import rehypeShiki from "@shikijs/rehype/core";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// Custom Plugins:
import { rehypeCopyBtn } from "./src/markdown/rehypeCopyBtn";
import { getTableOfContents } from "./src/markdown/generateToC";
import { rehypeExternalLinks } from "./src/markdown/rehypeExternalLinks";
import { shikiHighlighter, rehypeShikiOptions } from "./src/utils/shiki";

const docs = defineCollection({
  name: "docs",
  directory: "src/docs",
  include: "**/*.md",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const highlighter = await shikiHighlighter();
    const filePath = path.join(
      context.collection.directory,
      document._meta.filePath,
    );
    const { mtimeMs, birthtimeMs } = await fs.stat(filePath);
    const html = await compileMarkdown(context, document, {
      rehypePlugins: [
        [rehypeShiki, highlighter, rehypeShikiOptions],
        rehypeExternalLinks,
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeCopyBtn,
      ],
    });
    const tableOfContents = getTableOfContents(document.content);
    return {
      ...document,
      html,
      createdAt: new Date(birthtimeMs),
      updatedAt: new Date(mtimeMs),
      tableOfContents,
      rawUrl: `https://svgl.app/api/docs/${document._meta.path}`,
      documentUrl: `https://svgl.app/docs/${document._meta.path}`,
    };
  },
});

export default defineConfig({
  collections: [docs],
});
