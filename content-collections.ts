import { z } from "zod";

// Content Collections:
import { compileMarkdown } from "@content-collections/markdown";
import { defineCollection, defineConfig } from "@content-collections/core";

// Plugings:
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeShiki from "@shikijs/rehype/core";
import { shikiHighlighter, rehypeShikiOptions } from "./src/utils/shiki";
import { rehypeCopyBtn } from "./src/markdown/rehypeCopyBtn";
import { rehypeExternalLinks } from "./src/markdown/rehypeExternalLinks";

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
      rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings,
        [rehypeShiki, highlighter, rehypeShikiOptions],
        rehypeExternalLinks,
        rehypeCopyBtn,
      ],
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
