import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// ☁️ Adapter:
import adapter from '@sveltejs/adapter-node';

// 📦 Extensions:
import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter, makeSingletonHighlighter } from 'shiki';

// 🎨 Markdown Plugins:
import remarkGfm from 'remark-gfm';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

// 📄 Markdown config:
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
        themes: ['vesper'],
        langs: ['javascript', 'typescript', 'bash', 'json']
      });
      await highlighter.loadLanguage('javascript', 'typescript', 'bash');
      const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'vesper' }));
      return `{@html \`${html}\` }`;
    }
  }
};

// 🧡 Svelte config:
/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
  kit: {
    adapter: adapter(),
    alias: {
      '@': './src/*',
      'svg-to': './utils/svg-to/src/*'
    }
  }
};

export default config;
