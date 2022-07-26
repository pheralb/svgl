<p align="center">
  <a href="https://svgl.vercel.app/" target="_blank">
    <img src="https://i.postimg.cc/1tzrP2rg/banner-corner.png" width="800px" alt="SVGL Banner" />
  </a>
</p>

## 📦 Packages:

- ⚡️ [Nextjs](https://nextjs.org/) - The React Framework for Production.
- ⚒️ [React 18](https://reactjs.org/) - A JavaScript library for building user interfaces.
- 💙 [Typescript](https://www.typescriptlang.org/) - A superset of JavaScript.
- ✅ [Vitest](https://vitest.dev/) - A blazing fast unit test framework.
- 💅 [Chakra UI](https://chakra-ui.com/) - Create accessible React apps with speed.
- 💥 [Framer Motion](https://www.framer.com/motion/) - Production-ready motion library.
- 💖 [Phosphor Icons](https://phosphoricons.com/) - A flexible icon family for everyone.
- ⬇️ [Next-PWA](https://github.com/shadowwalker/next-pwa) - Zero config PWA plugin for Next.js, with workbox.

## 🚀 Getting started:

You need:

- [Node.js 16+ (recommend: 16.15.1 LTS)](https://nodejs.org/en/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

1. Clone the repository:

```bash
git@github.com:pheralb/svgl.git
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run:

```bash
npm run dev
# or
yarn dev
```

4. Test & Build:

```bash
npm run ready
# or
yarn ready
```

Open [localhost:3000](localhost:3000) with your browser to see the result.

## 🤔 Can I add my logo?

Yes! Here is a guide for you 🥳:

1. [Fork the repository](https://github.com/pheralb/svgl/fork).

2. Clone the forked repository:

```bash
git@github.com:YOUR_USERNAME/svgl.git
```

3. Add the **.svg** logo here: [`/public/library`](https://github.com/pheralb/svgl/tree/main/public/library).

4. Add your logo information here following the structure: [`/data/svgs.json`](https://github.com/pheralb/svgl/blob/main/data/svgs.json).

```json
{
  "id": 1,
  "slug": "/library/your_logo.svg",
  "title": "Logo Title",
  "category": "Logo Category",
  "url": "Your Website / app url"
}
```

5. Create a commit and push:

```bash
git add .
git commit -m "🥰 Added my logo"
git push origin main
```

6. Create a pull request with your changes and 🥳 ready.

## 🚂 Api endpoints:

```bash
- /api/all: returns all the logos.
- /api/search?id=2: returns the logo with id 2.
- /api/search?q=logo: returns the logo with query.
```

## ⚒️ Shortcuts:

- ⭐ SVG Library: [/public/library/](https://github.com/pheralb/svgl/tree/main/public/library).
- ✍️ SVG JSON logos: [/data/](https://github.com/pheralb/svgl/tree/main/data).

## 🔑 License:

- [MIT](https://github.com/pheralb/svgl/blob/main/LICENSE).
