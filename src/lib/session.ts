import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { env } from "@/env.mjs";

import type { IronSessionData, SessionOptions } from "iron-session";
import type { User } from "@prisma/client";

export type SessionUser = Omit<User, "password">;

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: SessionUser;
  }
}

const sessionOptions: SessionOptions = {
  password: env.APP_RANDOM_PASSWORD,
  cookieName: env.APP_AUTH_KEY,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
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

const getServerActionSession = async () => {
  const session = getIronSession<IronSessionData>(cookies(), sessionOptions);
  return session;
};

export { getSession, getServerActionSession };
