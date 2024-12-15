import { Queue, Worker } from 'bullmq';
import {
  createTransport,
  type SentMessageInfo,
  type SendMailOptions,
} from 'nodemailer';
import { getRedisInstance } from './redis';
import { env } from '@/env.js';

const connection = getRedisInstance();

const transport = createTransport({
  pool: true,
  host: env.SMTP_HOST,
  port: parseInt(env.SMTP_PORT),
  secure: false,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
});

const mailerQuene = new Queue<SendMailOptions, SentMessageInfo, 'email'>(
  'mailerQuene',
  {
    connection,
    defaultJobOptions: {
      attempts: 2,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
      removeOnComplete: true,
      removeOnFail: {
        age: 24 * 3600, // keep up to 24 hours
      },
    },
  },
);

const mailerWorker = new Worker<SendMailOptions, SentMessageInfo, 'email'>(
  'mailerQuene',
  async (job) => {
    const { to, subject, text, html, attachments } = job.data;
    const info = await transport.sendMail({
      from: env.EMAIL_FROM,
      to,
      subject,
      text,
      html,
      attachments,
    });

    return info;
  },
  {
    connection,
    concurrency: 50,
  },
);

// completed event
mailerWorker.on('completed', ({ id, returnvalue }) => {
  console.log(`mailerWorker completed: ${id}`);
  console.log(returnvalue);
});

// failed event
mailerWorker.on('failed', (job, error) => {
  console.log(job);
  console.log(error);
});

export function sendMail({
  to,
  subject,
  text,
  html,
  attachments,
}: SendMailOptions) {
  return mailerQuene.add('email', {
    to,
    subject,
    text,
    html,
    attachments,
  });
}
