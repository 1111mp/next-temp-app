import Redis, { type RedisOptions } from "ioredis";
import { env } from "@/env.mjs";

let redis: Redis | null = null;

export function getRedisInstance() {
  if (!redis) redis = createRedisInstance();
  return redis;
}

function createRedisInstance() {
  if (redis) throw new Error("[Redis] Cannot initialize more than once!");

  try {
    const options: RedisOptions = {
      host: env.REDIS_HOST,
      port: parseInt(env.REDIS_PORT),
      db: parseInt(env.REDIS_DB),
      // username: env.REDIS_USERNAME,
      // password: env.REDIS_PWD,
      lazyConnect: true,
      showFriendlyErrorStack: true,
      enableAutoPipelining: true,
      maxRetriesPerRequest: 0,
      retryStrategy(times) {
        if (times > 3) {
          throw new Error(`[Redis] Could not connect after ${times} attempts`);
        }

        return Math.min(times * 200, 1000);
      },
    };

    redis = new Redis(options);

    redis.on("error", (err) => {
      console.warn("[Redis] Error connecting", err);
    });

    redis.on("connect", () => {
      console.log(
        `[Redis] Connected to redis on ${env.REDIS_HOST}:${env.REDIS_PORT}/${env.REDIS_DB}`
      );
    });

    return redis;
  } catch (_err) {
    if (redis) redis.disconnect();
    throw new Error(`[Redis] Could not create a Redis instance`);
  }
}
