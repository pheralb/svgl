import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// ☁️ Adapter:
import adapter from '@sveltejs/adapter-vercel';

// 📦 Extensions:
import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter, makeSingletonHighlighter } from 'shiki';

// 📄 Markdown config:
const getHighlighter = makeSingletonHighlighter(createHighlighter);

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: ['.md'],
  highlight: {
    highlighter: async (code, lang = 'text') => {
      const highlighter = await getHighlighter({
        themes: ['vitesse-dark'],
        langs: ['javascript', 'typescript', 'bash', 'json']
      });
      await highlighter.loadLanguage('javascript', 'typescript', 'bash');
      const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'vitesse-dark' }));
      return `{@html \`${html}\` }`;
    }
  }
};

// Svelte config:
/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
  kit: {
    adapter: adapter(),
    alias: {
      '@': './src/*'
    }
  }
};

export default config;
