import { Worker } from 'bullmq';

import { env } from '@/env';
import { redisClient } from '@/server/redis';
import { mailerTransport } from './mailer.transport';

import type { SendMailOptions, SentMessageInfo } from 'nodemailer';

const createMailerWorker = () =>
  new Worker<SendMailOptions, SentMessageInfo, 'mailer'>(
    'mailer',
    async (job) => {
      console.log('job', job);
      const { to, subject, text, html, attachments, ...opts } = job.data;
      const info = await mailerTransport.sendMail({
        from: env.EMAIL_FROM,
        to,
        subject,
        text,
        html,
        attachments,
        ...opts,
      });

      return info;
    },
    {
      connection: redisClient,
      concurrency: 50,
    },
  );

const globalForMailerWorker = globalThis as unknown as {
  mailerWorker: Worker<SendMailOptions, SentMessageInfo, 'mailer'> | undefined;
};

export const mailerWorker =
  globalForMailerWorker.mailerWorker ?? createMailerWorker();

if (env.NODE_ENV !== 'production') {
  globalForMailerWorker.mailerWorker = mailerWorker;
}
