import { getSession } from "@/lib/session";
import { db } from "@/server/db";
import { env } from "@/env.mjs";
import {
  MakeNextJsonResponse,
  BadRequestException,
  UnauthorizedException,
  BadGatewayException,
  MakeNextRedirectResponse,
} from "@/utils/http-exception";
import { SignInInput } from "@/utils/user-validate";
import { unsealData } from "iron-session";

import type { NextRequest } from "next/server";
import type { User } from "@prisma/client";

export async function POST(req: Request) {
  const validate = await SignInInput.spa(await req.json());

  if (!validate.success) {
    const [error] = validate.error.issues;
    return BadRequestException(error?.message!);
  }

  const { email, password, remember } = validate.data;

  const user = await db.user.signIn({ email, password });

  if (user === null)
    return UnauthorizedException("Invalid account or password");

  const resp = MakeNextJsonResponse({
    code: 200,
    data: user,
    message: "Successful",
  });
  const session = await getSession(
    req,
    resp,
    remember ? undefined : { cookieOptions: { maxAge: undefined } },
  );
  session.user = user;
  await session.save();

  return resp;
}

export async function GET(req: NextRequest) {
  const seal = req.nextUrl.searchParams.get("seal");

  if (!seal) return BadGatewayException("Invalid seal");

  const { remember = false, ...user } = await unsealData<
    Omit<User, "password"> & { remember?: boolean }
  >(seal, {
    password: env.APP_RANDOM_PASSWORD,
  });

  const resp = MakeNextRedirectResponse(new URL("/", req.nextUrl));
  const session = await getSession(
    req,
    resp,
    remember ? undefined : { cookieOptions: { maxAge: undefined } },
  );
  session.user = user;
  await session.save();

  return resp;
}
