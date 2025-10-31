import { NextResponse, type NextProxy } from 'next/server';
import type { ProxyFactory } from './types';

export function stackMiddlewares(
  middlewares: ProxyFactory[] = [],
  index = 0,
): NextProxy {
  const middleware = middlewares[index];
  if (middleware) {
    const next = stackMiddlewares(middlewares, index + 1);
    return middleware(next);
  }
  return () => NextResponse.next();
}
