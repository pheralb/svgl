/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const prettierConfig = {
  plugins: ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/styles/globals.css",
  overrides: [
    {
      files: "*.svelte",
      options: {
        parser: "svelte",
      },
    },
  ],
};

export default prettierConfig;
