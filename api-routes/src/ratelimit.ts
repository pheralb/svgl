import type { Request, Response, NextFunction } from "express";
import { logger } from "@/utils/logger";

const MAX_REQUESTS = 5;
const WINDOW_SECONDS = 10;
const RETRY_AFTER_SECONDS = 3 * 60;

interface RedisClient {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, options?: { EX?: number }): Promise<unknown>;
  incr(key: string): Promise<number>;
  expire(key: string, seconds: number): Promise<unknown>;
}

function tooManyRequests(res: Response, retryAfter: number) {
  res.setHeader("Retry-After", retryAfter.toString());
  res.status(429).json({ error: "🛑 (SVGL - API) Too many requests" });
}

export function createRateLimiter(redis: RedisClient) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const forwarded = req.headers["x-forwarded-for"];
    const ip =
      (typeof forwarded === "string"
        ? forwarded.split(",")[0]?.trim()
        : req.ip) ?? "anonymous";

    const lockKey = `lock:${ip}`;
    const rateKey = `ratelimit:${ip}`;

    try {
      const lockedUntil = await redis.get(lockKey);
      if (lockedUntil) {
        const remaining = Math.max(
          Math.ceil((Number(lockedUntil) - Date.now()) / 1000),
          1,
        );
        logger.warn(`${ip} is locked out — ${remaining}s left`);
        tooManyRequests(res, remaining);
        return;
      }

      const count = await redis.incr(rateKey);
      if (count === 1) {
        await redis.expire(rateKey, WINDOW_SECONDS);
      }

      if (count > MAX_REQUESTS) {
        await redis.set(
          lockKey,
          (Date.now() + RETRY_AFTER_SECONDS * 1000).toString(),
          { EX: RETRY_AFTER_SECONDS },
        );
        logger.warn(`Rate limit exceeded — locked out for ${RETRY_AFTER_SECONDS}s`);
        tooManyRequests(res, RETRY_AFTER_SECONDS);
        return;
      }

      next();
    } catch (err) {
      logger.error("Rate limiter error:", err);
      next();
    }
  };
}
