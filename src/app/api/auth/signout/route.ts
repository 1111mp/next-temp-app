import { getServerActionSession } from "@/lib/session";
import {
  MakeNextRedirectResponse,
  UnauthorizedException,
} from "@/utils/http-exception";

export async function POST(req: Request) {
  const session = await getServerActionSession();

  if (!session || !session.user) {
    return UnauthorizedException("Unauthorized");
  }

  await session.destroy();

  return MakeNextRedirectResponse(new URL("/login", req.url), 303);
}
