import type { iSVG } from "../../src/types/svg";
import type { Category } from "../../src/types/categories";

import { Hono } from "hono";
import { cors } from "hono/cors";

// 🌿 Utils:
import { addFullUrl } from "./utils";
import { optimizeSvg } from "../../src/utils/optimizeSvg";
import { apiRateLimiter, type Bindings } from "./ratelimit";

// 📦 Import data from SVGL src:
import { svgsData } from "../../src/data";

// ✨ Return the full route for each SVG:
const fullRouteSvgsData = svgsData.map((svg) => {
  return {
    ...svg,
    route: addFullUrl(svg.route),
    wordmark: svg.wordmark ? addFullUrl(svg.wordmark) : undefined,
  };
}) as iSVG[];

// ⚙️ Create a new Hono instance:
const app = new Hono<{ Bindings: Bindings }>();

app.use(apiRateLimiter);

app.use(cors());

// 🌱 GET: "/" - Returns all the SVGs data:
app.get("/", async (c) => {
  const limit = c.req.query("limit");
  const search = c.req.query("search");

  if (limit) {
    const limitNumber = parseInt(limit);
    if (limitNumber) {
      return c.json(fullRouteSvgsData.slice(0, limitNumber));
    }
  }

  if (search) {
    const searchResults = fullRouteSvgsData.filter((svg) =>
      svg.title.toLowerCase().includes(search.toLowerCase()),
    );
    if (searchResults.length === 0) {
      return c.json({ error: "❌ (SVGL - API) SVG not found" }, 404);
    }
    return c.json(searchResults);
  }

  return c.json(fullRouteSvgsData);
});

// 🌱 GET: "/categories" - Return an array with categories:
app.get("/categories", async (c) => {
  const categoryTotals: Record<string, number> = {};

  fullRouteSvgsData.forEach((svg) => {
    if (typeof svg.category === "string") {
      categoryTotals[svg.category] = (categoryTotals[svg.category] || 0) + 1;
    } else if (Array.isArray(svg.category)) {
      svg.category.forEach((category) => {
        categoryTotals[category] = (categoryTotals[category] || 0) + 1;
      });
    }
  });

  const categories = Object.entries(categoryTotals).map(
    ([category, total]) => ({
      category,
      total,
    }),
  );

  return c.json(categories);
});

// 🌱 GET: /category/:category - Return an list of svgs by specific category:
app.get("/category/:category", async (c) => {
  const category = c.req.param("category") as string;
  const targeCategory = category.charAt(0).toUpperCase() + category.slice(1);

  const categorySvgs = fullRouteSvgsData.filter((svg) => {
    if (typeof svg.category === "string") {
      return svg.category === targeCategory;
    }
    if (Array.isArray(svg.category)) {
      return svg.category.includes(targeCategory as Category);
    }
    return false;
  });
  if (categorySvgs.length === 0) {
    return c.json({ error: "❌ (SVGL - API) Category not found" }, 404);
  }
  return c.json(categorySvgs);
});

// 🌱 GET: "/svg/:filename" - Return the SVG code file by filename:
app.get("/svg/:filename", async (c) => {
  const fileName = c.req.param("filename") as string;
  const svgLibrary = "https://svgl.app/library/";

  const returnNoOptimized = c.req.query("no-optimize");

  try {
    const svg = await fetch(`${svgLibrary}${fileName}`).then((res) => {
      if (!res.ok)
        throw new Error("❌ (SVGL - API) Network response was not ok");
      return res.text();
    });

    if (returnNoOptimized) {
      return c.body(svg, 200, {
        "Content-Type": "image/svg+xml; charset=utf-8",
      });
    }

    const optimizedSvg = optimizeSvg({ svgCode: svg });
    return c.body(optimizedSvg, 200, {
      "Content-Type": "image/svg+xml; charset=utf-8",
    });
  } catch (err) {
    return c.json(
      { error: `❌ (SVGL - API) SVG file not found - ${err}` },
      404,
    );
  }
});

export default app;
