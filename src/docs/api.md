---
title: API Reference
description: The API reference is a detailed documentation of all the endpoints available in the SVGL API.
---

<script>
  import Endpoint from '../components/endpoints.svelte';
</script>

## Introduction

SVGL API is a RESTFul API that allows you to get all the information of the SVGs that are in the repository.

## Limitations

The API is currently open to everyone and does not require any authentication. However, there is a limit of **30** requests per day. If you exceed this limit, you will receive a _429_ error.

## Base URL

The base URL for the API is:

```bash
https://svgl.app/api/svgs
# or
https://svgl.app/api/categories
```

## Typescript usage

- For SVGs:

```ts
export interface svg {
  id: number;
  title: string;
  category: string;
  route:
    | string
    | {
        dark: string;
        light: string;
      };
  url: string;
}
```

- For categories:

```ts
export interface category {
  category: string;
  total: number;
}
```

## Endpoints

<Endpoint title="Get all SVGs" method="GET" description="Returns all the SVGs in the repository.">

```bash
/api/svgs
```

<p></p>

```json
// Returns:
[
  {
    "id": 0,
    "title": "Discord",
    "category": "Software",
    "route": "https://svgl.app/library/discord.svg",
    "url": "https://discord.com/"
  },
  ...
]
```

</Endpoint>

<Endpoint title="Get a limited number of SVGs" method="GET" description="Returns a limited number of SVGs in the repository. Start from the first SVG.">

```bash
/api/svgs?limit=10
```

<p></p>

```json
// Returns:
[
  {
    "id": 0,
    "title": "Discord",
    "category": "Software",
    "route": "https://svgl.app/library/discord.svg",
    "url": "https://discord.com/"
  },
  ...
]
```

</Endpoint>

<Endpoint title="Filter SVGs by category" method="GET" description="Returns all the SVGs in the repository that match the category.">

```bash
/api/svgs?category=software
```

<p></p>

```json
// Returns:
[
  {
    "id": 0,
    "title": "Discord",
    "category": "Software",
    "route": "https://svgl.app/library/discord.svg",
    "url": "https://discord.com/"
  },
  ...
]
```

The list of categories is available [here](https://github.com/pheralb/svgl/blob/main/src/types/categories.ts) (except for the _all_ category).

</Endpoint>

<Endpoint title="Get only categories" method="GET" description="Returns only categories with the number of SVGs in each category.">

```bash
/api/categories
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

</Endpoint>

<Endpoint title="Search SVGs by name" method="GET" description="Returns all the SVGs in the repository that match the name.">

```bash
/api/svgs?search=axiom
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
      "light": "https://svgl.app/library/axiom-light.svg",
      "dark": "https://svgl.app/library/axiom-dark.svg"
    },
    "url": "https://axiom.co/"
  }
]
```

</Endpoint>
