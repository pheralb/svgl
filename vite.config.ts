import { defineConfig } from "vite";

// Plugins:
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import contentCollections from "@content-collections/vite";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit(), contentCollections()],
});
