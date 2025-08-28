import { z } from "zod";

// Content Collections:
import { compileMarkdown } from "@content-collections/markdown";
import { defineCollection, defineConfig } from "@content-collections/core";

// Shiki:
import rehypeShiki from "@shikijs/rehype/core";
import { shikiHighlighter, rehypeShikiOptions } from "./src/utils/shiki";

const docs = defineCollection({
  name: "docs",
  directory: "src/docs",
  include: "**/*.md",
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
  transform: async (document, context) => {
    const highlighter = await shikiHighlighter();
    const html = await compileMarkdown(context, document, {
      rehypePlugins: [[rehypeShiki, highlighter, rehypeShikiOptions]],
    });
    return {
      ...document,
      html,
    };
  },
});

export default defineConfig({
  collections: [docs],
});
