import { Prisma } from "@prisma/client";
import { db } from "@/server/db";
import { getSession } from "@/lib/session";
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  MakeNextJsonResponse,
} from "@/utils/http-exception";
import { SignUpInput } from "@/utils/user-validate";

export async function POST(req: Request) {
  const validate = await SignUpInput.spa(await req.json());

  if (!validate.success) {
    const [error] = validate.error.issues;
    return BadRequestException(error?.message!);
  }

  const { name, email, password, remember } = validate.data;

  try {
    const user = await db.user.signUp({ name, email, password });
    const resp = MakeNextJsonResponse({
      code: 200,
      data: user,
      message: "successful",
    });
    const session = await getSession(
      req,
      resp,
      remember ? undefined : { cookieOptions: { maxAge: undefined } },
    );
    session.user = user;
    await session.save();

    return resp;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return ConflictException(
          "There is a unique constraint violation, a new user cannot be created with this account",
        );
      }
    }

    return InternalServerErrorException(error.message);
  }
}
