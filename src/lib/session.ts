import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { env } from '@/env.js';

import type { IronSessionData, SessionOptions } from 'iron-session';
import type { User } from '@prisma/client';

export type SessionUser = Omit<User, 'password'>;

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user?: SessionUser;
  }
}

const sessionOptions: SessionOptions = {
  password: env.APP_RANDOM_PASSWORD,
  cookieName: env.APP_AUTH_KEY,
  cookieOptions: {
    httpOnly: true,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    secure: env.NODE_ENV === 'production',
  },
};

const getSession = async (
  req: Request,
  res: Response,
  options?: Partial<SessionOptions>,
) => {
  const session = getIronSession<IronSessionData>(req, res, {
    ...sessionOptions,
    ...options,
  });
  return session;
};

const getServerActionSession = async (options?: Partial<SessionOptions>) => {
  const session = getIronSession<IronSessionData>(await cookies(), {
    ...sessionOptions,
    ...options,
  });
  return session;
};

const getSessionOptions = (options?: Partial<SessionOptions>) => {
  return {
    ...sessionOptions,
    ...options,
  };
};

export { getSession, getServerActionSession, getSessionOptions };
