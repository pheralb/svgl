import { defineConfig } from "vite";

// Plugins:
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import devtoolsJson from "vite-plugin-devtools-json";
import contentCollections from "@content-collections/vite";

export default defineConfig({
  plugins: [devtoolsJson(), tailwindcss(), sveltekit(), contentCollections()],
});
