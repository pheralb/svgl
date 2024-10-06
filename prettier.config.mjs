/** @type {import("prettier").Config} */
const config = {
  useTabs: false,
  singleQuote: true,
  trailingComma: 'none',
  printWidth: 100,
  plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
  pluginSearchDirs: ['.'],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }]
};

export default config;
