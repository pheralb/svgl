import { escapeSvelte } from 'mdsvex';
import { createHighlighter, makeSingletonHighlighter } from 'shiki';

// Markdown Plugins
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// Highlighter
const getHighlighter = makeSingletonHighlighter(createHighlighter);

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  remarkPlugins: [[remarkGfm]],
  rehypePlugins: [
    [rehypeSlug],
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'wrap',
        properties: {
          className: [
            `before:content-['#'] before:absolute before:-ml-[1em] before:text-neutral-100/0 hover:before:text-neutral-200/50 pl-[1em] -ml-[1em]`
          ]
        }
      }
    ]
  ],
  extensions: ['.md'],
  highlight: {
    highlighter: async (code, lang = 'text') => {
      const highlighter = await getHighlighter({
        themes: ['github-light', 'github-dark'],
        langs: ['javascript', 'typescript', 'bash', 'json']
      });
      await highlighter.loadLanguage('javascript', 'typescript', 'bash');
      const html = escapeSvelte(
        highlighter.codeToHtml(code, {
          lang,
          themes: {
            light: 'github-light',
            dark: 'github-dark'
          }
        })
      );
      return `{@html \`${html}\` }`;
    }
  }
};

export { mdsvexOptions };
