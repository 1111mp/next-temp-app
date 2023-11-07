import { getIronSession, getServerActionIronSession } from "iron-session";
import { cookies } from "next/headers";
import { env } from "@/env.mjs";

import type { IronSessionData, IronSessionOptions } from "iron-session";
import type { User } from "@prisma/client";

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: Omit<User, "password">;
  }
}

const sessionOptions: IronSessionOptions = {
  password: env.APP_RANDOM_PASSWORD,
  cookieName: env.APP_AUTH_KEY,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};

const getSession = async (req: Request, res: Response) => {
  const session = getIronSession<IronSessionData>(req, res, sessionOptions);
  return session;
};

const getServerActionSession = async () => {
  const session = getServerActionIronSession<IronSessionData>(
    sessionOptions,
    cookies()
  );
  return session;
};

export { getSession, getServerActionSession };
