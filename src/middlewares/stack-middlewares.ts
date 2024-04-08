import { NextMiddleware, NextResponse } from "next/server";
import { MiddlewareFactory } from "./types";

export function stackMiddlewares(
  middlewares: MiddlewareFactory[] = [],
  index = 0,
): NextMiddleware {
  const middleware = middlewares[index];
  if (middleware) {
    const next = stackMiddlewares(middlewares, index + 1);
    return middleware(next);
  }
  return () => NextResponse.next();
}
