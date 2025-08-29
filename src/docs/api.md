---
title: API Reference
description: The API reference is a detailed documentation of all the endpoints available in the SVGL API.
---

## Introduction

SVGL API is a RESTFul API that allows you to get all the information of the SVGs that are in the repository.

## Limitations

The API is currently open to everyone and does not require any authentication. However, to prevent abusive use of the API, there is a limit to the number of requests.

Don't use the API for create the same product as SVGL. The API is intended to be used for extensions, plugins, or other tools that can help the community.

## Base URL

The base URL for the API is:

```bash
https://api.svgl.app
# or
https://api.svgl.app/categories
```

## Typescript usage

- For categories:

```ts
export interface Category {
  category: string;
  total: number;
}
```

- For SVGs:

```ts
export type ThemeOptions = {
  dark: string;
  light: string;
};

export interface iSVG {
  id?: number;
  title: string;
  category: tCategory | tCategory[];
  route: string | ThemeOptions;
  wordmark?: string | ThemeOptions;
  brandUrl?: string;
  url: string;
}
```

- `tCategory` is a large list of categories that can be found [here](https://github.com/pheralb/svgl/blob/main/src/types/categories.ts#L1).

## Endpoints

```bash
https://api.svgl.app
```

<p></p>

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

```bash
https://api.svgl.app?limit=10
```

<p></p>

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

```bash
https://api.svgl.app/category/software
```

<p></p>

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

The list of categories is available [here](https://github.com/pheralb/svgl/blob/main/src/types/categories.ts) (except for the _all_ category).

```bash
https://api.svgl.app/svg/adobe.svg
```

<p></p>

```html
// Returns:
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

```bash
https://api.svgl.app/categories
```

<p></p>

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
  },
  ...
]
```

```bash
https://api.svgl.app?search=axiom
```

<p></p>

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
