import { getSession } from "@/lib/session";
import { db } from "@/server/db";
import {
  MakeNextJsonResponse,
  UnauthorizedException,
} from "@/utils/http-exception";

type Params = {
  account: string;
  password: string;
};

export async function POST(req: Request) {
  const { account, password } = (await req.json()) as Params;

  const user = await db.user.signIn({ account, password });

  if (user === null)
    return UnauthorizedException("Invalid account or password");

  const resp = MakeNextJsonResponse({
    code: 200,
    data: user,
    message: "Successful",
  });
  const session = await getSession(req, resp);
  session.user = user;

  await session.save();

  return resp;
}
