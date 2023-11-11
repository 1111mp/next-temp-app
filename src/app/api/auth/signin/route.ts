import { getSession } from "@/lib/session";
import { db } from "@/server/db";
import {
  MakeNextJsonResponse,
  BadRequestException,
  UnauthorizedException,
} from "@/utils/http-exception";
import { SignInInput } from "@/utils/user-validate";

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
