import "dotenv/config";

import cors from "cors";
import express from "express";
import { createClient } from "redis";

// Data Generated:
// Use `pnpm run build:data` to regenerate the /data files.
import { svgsData } from "@/data";
import type { iSVG } from "@/data/types/svg";
import type { Category } from "@/data/types/categories";

// Utils
import { addFullUrl } from "@/utils/addFullUrl";
import { optimizeSvg } from "@/utils/optimizeSvg";
import { logger } from "@/utils/logger";

import { env } from "./env";
import { createRateLimiter } from "./ratelimit";

const fullRouteSvgsData = svgsData.map((svg) => ({
  ...svg,
  route: addFullUrl(svg.route),
  wordmark: svg.wordmark ? addFullUrl(svg.wordmark) : undefined,
})) as iSVG[];

const redis = createClient({
  url: env.REDIS_URL,
  socket: { tls: true, rejectUnauthorized: false },
});
redis.on("error", (err) => logger.error("Redis error:", err));
await redis.connect();
logger.info("Redis connected");

const app = express();

app.set("trust proxy", 1);
app.use(cors({ origin: env.CORS_ORIGIN, methods: ["GET", "OPTIONS"] }));
app.use(express.json());
app.use((_req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});
app.use(createRateLimiter(redis));

// 🌱 GET / — all SVGs with optional limit and search
app.get("/", (req, res) => {
  const limit = req.query["limit"] as string | undefined;
  const search = req.query["search"] as string | undefined;

  if (limit) {
    const n = parseInt(limit);
    if (!isNaN(n)) {
      res.json(fullRouteSvgsData.slice(0, n));
      return;
    }
  }

  if (search) {
    const results = fullRouteSvgsData.filter((svg) =>
      svg.title.toLowerCase().includes(search.toLowerCase()),
    );
    if (results.length === 0) {
      res.status(404).json({ error: "❌ (SVGL - API) SVG not found" });
      return;
    }
    res.json(results);
    return;
  }

  res.json(fullRouteSvgsData);
});

// 🌱 GET /categories — category list with totals
app.get("/categories", (_req, res) => {
  const totals: Record<string, number> = {};

  for (const svg of fullRouteSvgsData) {
    const cats = Array.isArray(svg.category) ? svg.category : [svg.category];
    for (const cat of cats) {
      totals[cat] = (totals[cat] ?? 0) + 1;
    }
  }

  res.json(
    Object.entries(totals).map(([category, total]) => ({ category, total })),
  );
});

// 🌱 GET /category/:category — SVGs filtered by category
app.get("/category/:category", (req, res) => {
  const raw = req.params["category"] as string;
  const target = raw.charAt(0).toUpperCase() + raw.slice(1);

  const results = fullRouteSvgsData.filter((svg) => {
    if (typeof svg.category === "string") return svg.category === target;
    if (Array.isArray(svg.category))
      return svg.category.includes(target as Category);
    return false;
  });

  if (results.length === 0) {
    res.status(404).json({ error: "❌ (SVGL - API) Category not found" });
    return;
  }
  res.json(results);
});

// 🌱 GET /svg/:filename — fetch SVG file with optional optimization
app.get("/svg/:filename", async (req, res) => {
  const fileName = req.params["filename"] as string;
  const noOptimize = req.query["no-optimize"];

  try {
    const response = await fetch(`https://svgl.app/library/${fileName}`);
    if (!response.ok) throw new Error("Network response was not ok");
    const svg = await response.text();

    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    res.send(noOptimize !== undefined ? svg : optimizeSvg(svg));
  } catch (err: unknown) {
    res
      .status(404)
      .json({ error: `❌ (SVGL - API) SVG file not found - ${err}` });
  }
});

const port = env.PORT ?? 3000;
app.listen(port, () => {
  logger.ready(`Server running on ${env.CORS_ORIGIN}:${port}`);
});
