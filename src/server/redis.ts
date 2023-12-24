import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { UPSTASH_REDIS_TOKEN, UPSTASH_REDIS_URL, SVGL_API_REQUESTS } from '$env/static/private';

const redis = new Redis({
  url: UPSTASH_REDIS_URL,
  token: UPSTASH_REDIS_TOKEN
});

export const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(Number(SVGL_API_REQUESTS), '60s'),
  analytics: true
});
