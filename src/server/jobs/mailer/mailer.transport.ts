import { createTransport, type Transporter } from 'nodemailer';

import { env } from '@/env';

const createMailerTransport = () =>
  createTransport({
    pool: true,
    host: env.SMTP_HOST,
    port: parseInt(env.SMTP_PORT),
    secure: false,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD,
    },
  });

const globalForTransport = globalThis as unknown as {
  mailerTransport: Transporter | undefined;
};

export const mailerTransport =
  globalForTransport.mailerTransport ?? createMailerTransport();

if (process.env.NODE_ENV !== 'production') {
  globalForTransport.mailerTransport = mailerTransport;
}
