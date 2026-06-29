import type { MiddlewareHandler } from "hono";

export type Bindings = {
  SVGL_RATE_LIMITER: RateLimit;
  SVGL_RATE_LIMIT_LOCKS: KVNamespace;
};

const RETRY_AFTER_SECONDS = 3 * 60;

const tooManyRequests = (
  c: Parameters<MiddlewareHandler>[0],
  retryAfter: number,
) => {
  c.header("Retry-After", retryAfter.toString());
  return c.json({ error: "🛑 (SVGL - API) Too many request" }, 429);
};

export const apiRateLimiter: MiddlewareHandler<{ Bindings: Bindings }> = async (
  c,
  next,
) => {
  const key = c.req.header("CF-Connecting-IP") ?? "anonymous";
  const lockKey = `lock:${key}`;

  const lockedUntil = await c.env.SVGL_RATE_LIMIT_LOCKS.get(lockKey);
  if (lockedUntil) {
    const remaining = Math.max(
      Math.ceil((Number(lockedUntil) - Date.now()) / 1000),
      1,
    );
    console.log(`🛑 (SVGL - API) ${key} is locked out — ${remaining}s left`);
    return tooManyRequests(c, remaining);
  }

  const { success } = await c.env.SVGL_RATE_LIMITER.limit({ key });
  if (!success) {
    await c.env.SVGL_RATE_LIMIT_LOCKS.put(
      lockKey,
      (Date.now() + RETRY_AFTER_SECONDS * 1000).toString(),
      { expirationTtl: RETRY_AFTER_SECONDS },
    );
    console.log(
      `🛑 (SVGL - API) Rate limit — locked out for ${RETRY_AFTER_SECONDS}s`,
    );
    return tooManyRequests(c, RETRY_AFTER_SECONDS);
  }

  await next();
};
