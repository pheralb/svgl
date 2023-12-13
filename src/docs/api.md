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

The API is currently open to everyone and does not require any authentication. However, there is a limit of **50** requests per day per IP address. If you exceed this limit, you will receive a _429_ error.

## Base URL

The base URL for the API is:

```bash
https://svgl.vercel.app/api/svgs
```

## Endpoints

<div class="flex flex-col space-y-2">
<Endpoint title="Get all SVGs" method="GET" description="Returns all the SVGs in the repository.">

```
https://svgl.vercel.app/api/svgs
```

</Endpoint>

<Endpoint title="Get a limited number of SVGs" method="GET" description="Returns a limited number of SVGs in the repository.">

```
https://svgl.vercel.app/api/svgs?limit=10
```

</Endpoint>
</div>
