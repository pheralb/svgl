import { Context, Hono } from 'hono';
import { env } from 'hono/adapter';
import { cors } from 'hono/cors';
import { BlankInput, Env } from 'hono/types';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis/cloudflare';

// 🌿 Import utils:
import { addFullUrl } from './utils';

// 📦 Import data from main app:
import { svgsData } from '../../src/data';
import { iSVG } from '../../src/types/svg';
import { tCategory } from '../../src/types/categories';

declare module 'hono' {
  interface ContextVariableMap {
    ratelimit: Ratelimit;
  }
}

// ✨ Return the full route for each SVG:
const fullRouteSvgsData = svgsData.map((svg) => {
  return {
    ...svg,
    route: addFullUrl(svg.route),
    wordmark: svg.wordmark ? addFullUrl(svg.wordmark) : undefined
  };
}) as iSVG[];

// ⚙️ Create a new Hono & Cache instance:
const app = new Hono();
const cache = new Map();

class RedisRateLimiter {
  static instance: Ratelimit;
  static getInstance(c: Context<Env, '/api/*', BlankInput>) {
    if (!this.instance) {
      const { UPSTASH_REDIS_URL, UPSTASH_REDIS_TOKEN } = env<{
        UPSTASH_REDIS_URL: string;
        UPSTASH_REDIS_TOKEN: string;
      }>(c);
      const redisClient = new Redis({
        token: UPSTASH_REDIS_TOKEN,
        url: UPSTASH_REDIS_URL
      });
      const ratelimit = new Ratelimit({
        redis: redisClient,
        limiter: Ratelimit.slidingWindow(5, '5 s'),
        ephemeralCache: cache
      });
      this.instance = ratelimit;
      return this.instance;
    } else {
      return this.instance;
    }
  }
}

app.use(async (c, next) => {
  const ratelimit = RedisRateLimiter.getInstance(c);
  c.set('ratelimit', ratelimit);
  await next();
});

app.use('/api/*', cors());

// 🌱 GET: "/" - Returns all the SVGs data:
app.get('/', async (c) => {
  const limit = c.req.query('limit');
  const search = c.req.query('search');
  const ratelimit = c.get('ratelimit');
  const ip = c.req.raw.headers.get('CF-Connecting-IP');
  const { success } = await ratelimit.limit(ip ?? 'anonymous');

  if (!success) {
    return c.json({ error: '🛑 Too many request' }, 429);
  }

  if (limit) {
    const limitNumber = parseInt(limit);
    if (limitNumber) {
      return c.json(fullRouteSvgsData.slice(0, limitNumber));
    }
  }

  if (search) {
    const searchResults = fullRouteSvgsData.filter((svg) =>
      svg.title.toLowerCase().includes(search.toLowerCase())
    );
    if (searchResults.length === 0) {
      return c.json({ error: 'not found' }, 404);
    }
    return c.json(searchResults);
  }

  return c.json(fullRouteSvgsData);
});

// 🌱 GET: "/categories" - Return an array with categories:
app.get('/categories', async (c) => {
  const ratelimit = c.get('ratelimit');
  const ip = c.req.raw.headers.get('CF-Connecting-IP');
  const { success } = await ratelimit.limit(ip ?? 'anonymous');

  if (!success) {
    return c.json({ error: '🛑 Too many request' }, 429);
  }

  const categoryTotals: Record<string, number> = {};

  fullRouteSvgsData.forEach((svg) => {
    if (typeof svg.category === 'string') {
      categoryTotals[svg.category] = (categoryTotals[svg.category] || 0) + 1;
    } else if (Array.isArray(svg.category)) {
      svg.category.forEach((category) => {
        categoryTotals[category] = (categoryTotals[category] || 0) + 1;
      });
    }
  });

  const categories = Object.entries(categoryTotals).map(([category, total]) => ({
    category,
    total
  }));

  return c.json(categories);
});

// 🌱 GET: /category/:category - Return an list of svgs by specific category:
app.get('/category/:category', async (c) => {
  const category = c.req.param('category') as string;
  const targetCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const ratelimit = c.get('ratelimit');
  const ip = c.req.raw.headers.get('CF-Connecting-IP');
  const { success } = await ratelimit.limit(ip ?? 'anonymous');

  if (!success) {
    return c.json({ error: '🛑 Too many request' }, 429);
  }

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
