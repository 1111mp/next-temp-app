import { Prisma } from "@prisma/client";
import { db } from "@/server/db";
import { getSession } from "@/lib/session";
import {
  ConflictException,
  InternalServerErrorException,
  MakeNextJsonResponse,
} from "@/utils/http-exception";

type Params = {
  account: string;
  password: string;
};

export async function POST(req: Request) {
  const { account, password } = (await req.json()) as Params;

  try {
    const user = await db.user.signUp({ account, password });
    const resp = MakeNextJsonResponse({
      code: 200,
      data: user,
      message: "successful",
    });
    const session = await getSession(req, resp);
    session.user = user;
    await session.save();

    return resp;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return ConflictException(
          "There is a unique constraint violation, a new user cannot be created with this account"
        );
      }
    }

    return InternalServerErrorException(error.message);
  }
}
