import { NextResponse } from 'next/server';
import { getServerActionSession } from '@/lib/session';

import type { NextFetchEvent, NextRequest } from 'next/server';
import type { ProxyFactory } from './types';

export const withAuthorization: ProxyFactory = (next) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    if (!req.nextUrl.pathname.endsWith('/login')) {
      const session = await getServerActionSession();
      if (!session.user)
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return next(req, _next);
  };
};
