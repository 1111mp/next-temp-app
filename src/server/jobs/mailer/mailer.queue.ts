import { Queue } from 'bullmq';

import { env } from '@/env';
import { redisClient } from '@/server/redis';

import type { SendMailOptions, SentMessageInfo } from 'nodemailer';

const createMailerQueue = () => {
  return new Queue<SendMailOptions, SentMessageInfo, 'mailer'>('mailer', {
    connection: redisClient,
    defaultJobOptions: {
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
      removeOnComplete: true,
      removeOnFail: {
        age: 6 * 3600, // keep up to 6 hours
      },
    },
  });
};

const globalForQueue = globalThis as unknown as {
  mailerQueue: Queue<SendMailOptions, SentMessageInfo, 'mailer'> | undefined;
};

export const mailerQueue = globalForQueue.mailerQueue ?? createMailerQueue();

if (env.NODE_ENV !== 'production') {
  globalForQueue.mailerQueue = mailerQueue;
}
