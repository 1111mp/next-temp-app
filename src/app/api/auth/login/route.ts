import { getSession, getServerActionSession } from '@/lib/session';
import { db } from '@/server/db';
import { env } from '@/env.js';
import {
  BadRequestException,
  UnauthorizedException,
  BadGatewayException,
  MakeNextRedirectResponse,
} from '@/utils/http-exception';
import { LoginInput } from '@/validates/user-validate';
import { fromError } from 'zod-validation-error';
import { unsealData } from 'iron-session';
import { NextRequest } from 'next/server';
import { User } from '@prisma/client';

export async function POST(req: NextRequest) {
  const validate = await LoginInput.spa(await req.json());
  if (!validate.success) {
    const error = fromError(validate.error);
    return BadRequestException(error.message);
  }

  const { email, password, remember } = validate.data;
  const user = await db.user.signIn({ email, password });
  if (!user) return UnauthorizedException('Invalid account or password');

  const session = await getServerActionSession(
    remember ? undefined : { cookieOptions: { maxAge: undefined } },
  );
  session.user = user;
  await session.save();

  return MakeNextRedirectResponse(new URL('/', req.url), 303);
}

// Magic links: log the user in through a link
export async function GET(req: NextRequest) {
  const seal = req.nextUrl.searchParams.get('seal');
  if (!seal) return BadGatewayException('Invalid seal');

  const { remember = false, ...user } = await unsealData<
    Omit<User, 'password'> & { remember?: boolean }
  >(seal, {
    password: env.APP_RANDOM_PASSWORD,
  });
  const resp = MakeNextRedirectResponse(new URL('/', req.nextUrl));
  const session = await getSession(
    req,
    resp,
    remember ? undefined : { cookieOptions: { maxAge: undefined } },
  );
  session.user = user;
  await session.save();

  return resp;
}
