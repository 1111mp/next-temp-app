import { Redis } from 'ioredis';

import { env } from '@/env';

const createRedisClient = () => {
  const client = new Redis(env.REDIS_URL, {
    lazyConnect: true,
    enableAutoPipelining: true,
    showFriendlyErrorStack: process.env.NODE_ENV !== 'production',

    maxRetriesPerRequest: null,

    retryStrategy(times) {
      if (times > 10) {
        console.error(`[Redis] reconnect failed after ${times} attempts`);
        return null; // stop retry
      }

      const delay = Math.min(times * 200, 2000);
      console.warn(`[Redis] reconnect attempt ${times}, delay ${delay}ms`);

      return delay;
    },
  });

  client.on('connect', () => {
    console.log('[Redis] connecting...');
  });

  client.on('ready', () => {
    console.log('[Redis] connected');
  });

  client.on('reconnecting', () => {
    console.warn('[Redis] reconnecting...');
  });

  client.on('error', (err) => {
    console.error('[Redis] error', err);
  });

  client.on('close', () => {
    console.warn('[Redis] connection closed');
  });

  return client;
};

const globalForRedis = globalThis as unknown as {
  redisClient: Redis | undefined;
};

export const redisClient = globalForRedis.redisClient ?? createRedisClient();

if (process.env.NODE_ENV !== 'production') {
  globalForRedis.redisClient = redisClient;
}
