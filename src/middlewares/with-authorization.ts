import { NextResponse } from 'next/server';
import { getServerActionSession } from '@/lib/session';

import type { NextFetchEvent, NextRequest } from 'next/server';
import type { MiddlewareFactory } from './types';

export const withAuthorization: MiddlewareFactory = (next) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    if (!/\/login$/g.test(req.nextUrl.pathname)) {
      const session = await getServerActionSession();
      if (!session || !session.user)
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return next(req, _next);
  };
};
