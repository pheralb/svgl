---
title: shadcn/ui
description: How to use shadcn/ui to add SVGs to your project.
---

## shadcn/ui

SVGL v5 support [shadcn/ui](https://ui.shadcn.com/) registry 🎉, so you can easily add SVGs to your project using [their CLI](https://ui.shadcn.com/docs/cli). Add the registry config once and you will be able to install any SVG in **`.tsx`** using `npm`, `yarn`, `bun` or `pnpm`.

## Add registry (optional)

> If you have already added shadcn/ui in your project, you can skip this step.

Add the SVGL registry to your `components.json` file:

```json
{
  "registries": {
    "@svgl": "https://svgl.app/r/{name}.json"
  }
}
```

[shadcn/ui Namespaces](https://ui.shadcn.com/docs/registry/namespace) documentation.

## Usage

Add SVGs using the [shadcn/ui CLI](https://ui.shadcn.com/docs/cli/installation):

```bash
npx shadcn@latest add @svgl/sanity
# or
pnpm dlx shadcn@latest add @svgl/sanity
# or
yarn dlx shadcn@latest add @svgl/sanity
# or
bunx shadcn@latest add @svgl/sanity
```

Add multiple SVGs at once:

```bash
pnpm dlx shadcn@latest add @svgl/sanity @svgl/github @svgl/supabase @svgl/vercel
```

## MCP Server

You can use the [shadcn MCP server](https://ui.shadcn.com/docs/mcp) to browse, search, and add React SVGs from SVGL registry:

### Prerequisites

You need to have `@svgl` in your `components.json` file:

```json
{
  "registries": {
    "@svgl": "https://svgl.app/r/{name}.json"
  }
}
```

### Quick Start

**With Claude Code**:

```bash
pnpm dlx shadcn@latest mcp init --client claude
```

Then, restart Claude Code. You can use `/mcp` command in Claude Code to debug the MCP server.

**With Cursor**:

```bash
pnpm dlx shadcn@latest mcp init --client cursor
```

Then, open Cursor Settings and Enable the MCP server for shadcn.

**With VSCode**:

```bash
pnpm dlx shadcn@latest mcp init --client vscode
```

Then, open `.vscode/mcp.json` and click Start next to the shadcn server.

### Example Prompts

Here are some example prompts you can use to add SVGs from SVGL registry:

```
Can you add the "GitHub" SVG from SVGL registry?
```

```
Please add React, Svelte and Vue SVGs from SVGL registry.
```
