import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import { getServerActionSession } from "@/lib/session";

import type { MiddlewareFactory } from "./types";
import { redirect } from "@/navigation";

export const withAuthorization: MiddlewareFactory = (next) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    if (!req.nextUrl.pathname.endsWith("/login")) {
      const session = await getServerActionSession();

      if (!session || !session.user)
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return next(req, _next);
  };
};
