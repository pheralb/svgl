import type { RehypeShikiOptions } from "@shikijs/rehype";
import {
  type HighlighterCore,
  type RegexEngine,
  createHighlighterCore,
} from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

// Themes:
import githubLight from "@shikijs/themes/github-light";
import githubDark from "@shikijs/themes/github-dark";

// Languages:
import html from "@shikijs/langs/html";
import ts from "@shikijs/langs/ts";
import bash from "@shikijs/langs/bash";
import json from "@shikijs/langs/json";

let jsEngine: RegexEngine | null = null;
let highlighter: Promise<HighlighterCore> | null = null;

// Engine:
const getShikiEngine = (): RegexEngine => {
  jsEngine ??= createJavaScriptRegexEngine();
  return jsEngine;
};

// Rehype options for Shiki:
const rehypeShikiOptions: RehypeShikiOptions = {
  themes: {
    light: "github-light",
    dark: "github-dark",
  },
  langs: [bash, ts, json, html],
};

const shikiHighlighter = async (): Promise<HighlighterCore> => {
  highlighter ??= createHighlighterCore({
    themes: [githubLight, githubDark],
    langs: [bash, ts, json, html],
    engine: getShikiEngine(),
  });
  return highlighter;
};

export { shikiHighlighter, rehypeShikiOptions };
