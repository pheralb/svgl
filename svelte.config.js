import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".svx"],
  preprocess: [vitePreprocess()],
  kit: {
    adapter: adapter(),
    alias: {
      "@/*": "./src/*",
      "@/lib/*": "./src/lib/*",
      "content-collections": "./.content-collections/generated",
    },
  },
};

export default config;
