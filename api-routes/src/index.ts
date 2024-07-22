import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { addFullUrl } from './utils';

// 📦 Import data from main app:
import { svgsData } from '../../src/data';
import { iSVG } from '../../src/types/svg';
import { tCategory } from '../../src/types/categories';

const fullRouteSvgsData = svgsData.map((svg) => {
  return {
    ...svg,
    route: addFullUrl(svg.route),
    wordmark: svg.wordmark ? addFullUrl(svg.wordmark) : undefined
  };
}) as iSVG[];

// ⚙️ Create a new Hono instance:
const app = new Hono();
app.use('/api/*', cors());

// 🌱 GET: "/" - Returns all the SVGs data:
app.get('/', (c) => {
  return c.json(fullRouteSvgsData);
});

// 🌱 GET: "/:search" - Returns a single SVG data:
app.get('/search/:search', (c) => {
  const title = c.req.param('search') as string;
  const svg = fullRouteSvgsData.find((svg) =>
    svg.title.toLowerCase().includes(title.toLowerCase())
  );
  if (!svg) {
    return c.json({ error: 'not found' }, 404);
  }
  return c.json(svg);
});

// 🌱 GET: "/categories" - Return an array with categories:
app.get('/categories', (c) => {
  const categories = fullRouteSvgsData.reduce((acc, svg) => {
    if (typeof svg.category === 'string') {
      if (!acc.includes(svg.category)) {
        acc.push(svg.category);
      }
    }
    if (Array.isArray(svg.category)) {
      svg.category.forEach((category) => {
        if (!acc.includes(category)) {
          acc.push(category);
        }
      });
    }
    return acc;
  }, [] as string[]);
  return c.json(categories);
});

// 🌱 GET: "/category/:category - Return an list of svgs by specific category:
app.get('/category/:category', (c) => {
  const category = c.req.param('category') as string;
  const targetCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const categorySvgs = fullRouteSvgsData.filter((svg) => {
    if (typeof svg.category === 'string') {
      return svg.category === targetCategory;
    }
    if (Array.isArray(svg.category)) {
      return svg.category.includes(targetCategory as tCategory);
    }
    return false;
  });
  if (categorySvgs.length === 0) {
    return c.json({ error: 'not found' }, 404);
  }
  return c.json(categorySvgs);
});

export default app;
