---
title: API Reference
description: The API reference is a detailed documentation of all the endpoints available in the SVGL API.
---

## Introduction

SVGL API is a RESTFul API that allows you to get all the information of the SVGs that are in the repository.

## Limitations

The API is currently open to everyone and does not require any authentication. However, to prevent abusive use of the API, there is a limit to the number of requests.

> Don't use the API for create the same product as SVGL. The API is intended to be used for extensions, plugins, or other tools that can help the community.

## Base URLs

SVGs URL:

```bash
https://api.svgl.app
```

Categories URL:

```bash
https://api.svgl.app/categories
```

## Typescript

You can use the following types for the SVG responses:

```ts
export type ThemeOptions = {
  dark: string;
  light: string;
};

export interface SVG {
  id: number;
  title: string;
  category: string | string[];
  route: string | ThemeOptions;
  url: string;
  wordmark?: string | ThemeOptions;
  brandUrl?: string;
}
```

> If you need types for the `category`, you can find them [here](https://github.com/pheralb/svgl/blob/main/src/types/categories.ts). Change the type of `category` to `Category | Category[]`.

## Endpoints

### Get all SVGs

```bash
https://api.svgl.app
```

```json
// Returns:
[
  {
    "id": 0,
    "title": "Discord",
    "category": "Software",
    "route": "https://svgl.app/discord.svg",
    "url": "https://discord.com/"
  },
  ...
]
```

### Get all SVGs with limit

```bash
https://api.svgl.app?limit=10
```

```json
// Returns:
[
  {
    "id": 0,
    "title": "Discord",
    "category": "Software",
    "route": "https://svgl.app/discord.svg",
    "url": "https://discord.com/"
  },
  ...
]
```

### Get SVGs by category

```bash
https://api.svgl.app/category/software
```

```json
// Returns:
[
  {
    "id": 0,
    "title": "Discord",
    "category": "Software",
    "route": "https://svgl.app/discord.svg",
    "url": "https://discord.com/"
  },
  ...
]
```

> The list of categories is available [here](https://github.com/pheralb/svgl/blob/main/src/types/categories.ts).

### Get the SVG code

Optimized SVG using [svgo](https://github.com/svg/svgo):

```bash
https://api.svgl.app/svg/adobe.svg
```

No optimized SVG:

```bash
https://api.svgl.app/svg/adobe.svg?no-optimize
```

```html
<!-- Returns: -->
<svg
  width="91"
  height="80"
  viewBox="0 0 91 80"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <g clip-path="url(#clip0_906_1839)">
    <path d="M56.9686 0H90.4318V80L56.9686 0Z" fill="#EB1000" />
    <path d="M33.4632 0H0V80L33.4632 0Z" fill="#EB1000" />
    <path
      d="M45.1821 29.4668L66.5199 80.0002H52.5657L46.1982 63.9461H30.6182L45.1821 29.4668Z"
      fill="#EB1000"
    />
  </g>
  <defs>
    <clipPath id="clip0_906_1839">
      <rect width="90.4318" height="80" fill="white" />
    </clipPath>
  </defs>
</svg>
```

### Search SVG by title

```bash
https://api.svgl.app?search=axiom
```

```json
// Returns:
[
  {
    "id": 267,
    "title": "Axiom",
    "category": "Software",
    "route": {
      "light": "https://svgl.app/axiom-light.svg",
      "dark": "https://svgl.app/axiom-dark.svg"
    },
    "url": "https://axiom.co/"
  }
]
```

### Get the list of categories

```bash
https://api.svgl.app/categories
```

```json
// Returns:
[
  {
    "category": "Software",
    "total": 97
  },
  {
    "category": "Library",
    "total": 25
  }
  //...
]
```
