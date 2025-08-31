import js from "@eslint/js";
import globals from "globals";
import { fileURLToPath } from "node:url";
import { includeIgnoreFile } from "@eslint/compat";

// Plugins:
import ts from "typescript-eslint";
import svelte from "eslint-plugin-svelte";
import prettier from "eslint-config-prettier";

// Svelte Config:
import svelteConfig from "./svelte.config.js";

// Ignore files:
const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));

export default ts.config(
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs.recommended,
  prettier,
  ...svelte.configs.prettier,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      "no-undef": "off",
    },
  },
  {
    files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: [".svelte"],
        parser: ts.parser,
        svelteConfig,
      },
    },
    rules: {
      "svelte/no-unused-svelte-ignore": "warn",
      "svelte/no-useless-mustaches": "warn",
      "svelte/require-each-key": "warn",
      "svelte/no-at-html-tags": "off",
    },
  },
);
