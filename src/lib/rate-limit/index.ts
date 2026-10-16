import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { ApiValidationError } from "@/lib/validation/errors";

let loggedMissingRedisInProduction = false;

function isRateLimitBypassed() {
  if (process.env.NODE_ENV === "production") {
    return false;
  }

  return process.env.SMOKE_TEST_BYPASS_RATE_LIMIT === "true";
}

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (!url || !token) {
    if (
      process.env.NODE_ENV === "production" &&
      !loggedMissingRedisInProduction
    ) {
      loggedMissingRedisInProduction = true;
      console.error(
        "[rate-limit] UPSTASH_REDIS_REST_URL/TOKEN missing in production. Rate limits are disabled.",
      );
    }

    return null;
  }

  return new Redis({ url, token });
}

function createLimiter(tokens: number, window: `${number} m` | `${number} d`) {
  const redis = getRedis();

  if (!redis) {
    return null;
  }

  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(tokens, window),
    prefix: "kids-ecom-store",
  });
}

const metaEventsIpLimiter = createLimiter(60, "1 m");

export function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip")?.trim() ?? "unknown";
}

async function assertLimitFailOpen(limiter: Ratelimit | null, key: string) {
  if (!limiter || isRateLimitBypassed()) {
    return;
  }

  try {
    const result = await limiter.limit(key);

    if (!result.success) {
      throw new ApiValidationError(
        "RATE_LIMITED",
        "Too many requests. Please wait a moment and try again.",
        429,
      );
    }
  } catch (error) {
    if (error instanceof ApiValidationError) {
      throw error;
    }

    console.error("[rate-limit] Limiter failed open:", error);
  }
}

export async function assertMetaEventsRateLimits(request: Request) {
  const ip = getClientIp(request);
  await assertLimitFailOpen(metaEventsIpLimiter, `meta:events:ip:${ip}`);
}

