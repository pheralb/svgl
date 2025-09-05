---
title: shadcn/ui Registry
description: How to use shadcn/ui to add SVGs to your project.
---

## shadcn/ui Registry

SVGL v5 support [shadcn/ui](https://ui.shadcn.com/) registry, so you can easily add SVGs to your project using their CLI. Add the registry config once and you will be able to install any SVG in `.tsx` using `npm`, `yarn`, `bun` or `pnpm`.

## Add registry

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
