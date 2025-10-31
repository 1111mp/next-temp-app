import { NextRequest } from 'next/server';
import { unsealData } from 'iron-session';
import { env } from '@/env.js';
import { BadGatewayException, MakeNextRedirectResponse } from '@/lib/utils';
import { getServerActionSession, SessionUser } from '@/lib/session';

// Magic links: log the user in through a link
export async function GET(req: NextRequest) {
  const seal = req.nextUrl.searchParams.get('seal');
  if (!seal) return BadGatewayException('Invalid seal');

  const { remember = false, user } = await unsealData<{
    remember?: boolean;
    user: SessionUser;
  }>(seal, {
    password: env.APP_RANDOM_PASSWORD,
  });
  const session = await getServerActionSession(
    remember ? undefined : { cookieOptions: { maxAge: undefined } },
  );
  session.user = user;
  await session.save();

  return MakeNextRedirectResponse(new URL('/', req.url), 303);
}
