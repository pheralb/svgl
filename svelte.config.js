import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// ☁️ Adapter:
import adapter from '@sveltejs/adapter-node';

// 📦 Extensions:
import { mdsvex } from 'mdsvex';

// 📄 Markdown Config:
import { mdsvexOptions } from './markdown.config.js';

// 🧡 Svelte config:
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
