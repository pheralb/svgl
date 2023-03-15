<!-- <div align="center">
<a href="https://svgl.vercel.app">
<img src="public/images/screenshot.png">
</a>
<p></p>
</div> -->

<div align="center">
    <a href="https://svgl.vercel.app/" target="_blank">
        Discover
    </a>
    <span>&nbsp;●&nbsp;</span>
    <a href="#-getting-started">
        Submit logo
    </a>
    <span>&nbsp;●&nbsp;</span>
    <a href="#-team">
        Stack
    </a>
</div>

</p>

<div align="center">

[![GitHub actions](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fpheralb%2Fsvgl%2Fbadge%3Fref%3Dmain&style=flat)](https://actions-badge.atrox.dev/pheralb/svgl/goto?ref=main)
![GitHub stars](https://img.shields.io/github/stars/pheralb/svgl)
![GitHub issues](https://img.shields.io/github/issues/pheralb/svgl)
![GitHub forks](https://img.shields.io/github/forks/pheralb/svgl)
![GitHub license](https://img.shields.io/github/license/pheralb/svgl)

</div>

## 🛠️ Stack

- [Sveltekit](https://kit.svelte.dev/) - Web development, streamlined.
- [Typescript](https://www.typescriptlang.org/) - JavaScript with syntax for types.
- [Tailwindcss](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
- [Prettier](https://prettier.io/) + [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) - An opinionated code formatter.
- [phosphor-svelte](https://github.com/haruaki07/phosphor-svelte) - A clean and friendly icon family for Svelte.

## 🚀 Getting Started

You will need:

- [Node.js 16+ (recommended 18 LTS)](https://nodejs.org/en/).
- [Git](https://git-scm.com/).

1. Clone or [fork](https://github.com/pheralb/svgl/fork) this repository:

```bash
git clone git@github.com:pheralb/svgl.git
```

2. Install dependencies with your favorite package manager:

```bash
# with npm:
npm install

# or with pnpm:
pnpm install

# or with ultra:
ultra install

# or with yarn:
yarn install
```

3. Go to the [**`static/library`**](https://github.com/pheralb/svgl/tree/v3/static/library) folder and add your `.svg` logo. Remember to optimize SVG for web use, you can use [SVGOMG](https://jakearchibald.github.io/svgomg/).

4. Go to the [**`src/data/svgs.json`**](https://github.com/pheralb/svgl/blob/v3/src/data/svgs.json) and add the information about your logo, following the structure:

```json
{
  "id": 1,
  "title": "Title",
  "category": "Category",
  "route": "/library/your_logo.svg",
  "url": "Website"
},
```

And create a pull request with your logo 🚀.

## 🔑 License:

- [MIT](https://github.com/pheralb/svgl/blob/main/LICENSE).
