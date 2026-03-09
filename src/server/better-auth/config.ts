import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { prismaAdapter } from '@better-auth/prisma-adapter';
import { magicLink } from 'better-auth/plugins';

import { env } from '@/env';
import { db } from '@/server/db';
import { sendMail } from '@/server/jobs';

export const auth = betterAuth({
  baseURL: 'http://localhost:3000',
  database: prismaAdapter(db, {
    provider: 'sqlite',
  }),
  plugins: [
    nextCookies(),
    magicLink({
      async sendMagicLink(data, ctx) {
        console.log('data', data);
        console.log('ctx', ctx);
        await sendMail({
          to: data.email,
          subject: '[next-temp-app]: Sign in with your email',
          html: `Hey there ${data.email}, <a href="${data.url}">click here to sign in</a>.`,
        });
      },
    }),
  ],
  emailAndPassword: {
    enabled: true,
  },
  secret: env.BETTER_AUTH_SECRET,
  socialProviders: {
    github: {
      clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
    },
  },
});
