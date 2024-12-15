import { Prisma } from '@prisma/client';
import { db } from '@/server/db';
import { getServerActionSession } from '@/lib/session';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  MakeNextRedirectResponse,
} from '@/utils/http-exception';
import { SignUpInput } from '@/validates/user-validate';
import { fromError } from 'zod-validation-error';

export async function POST(req: Request) {
  const validate = await SignUpInput.spa(await req.json());
  if (!validate.success) {
    const error = fromError(validate.error);
    return BadRequestException(error.message);
  }

  const { name, email, password, remember } = validate.data;

  try {
    const user = await db.user.signUp({ name, email, password });
    const session = await getServerActionSession(
      remember ? undefined : { cookieOptions: { maxAge: undefined } },
    );
    session.user = user;
    await session.save();

    return MakeNextRedirectResponse(new URL('/', req.url));
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return ConflictException(
          'There is a unique constraint violation, a new user cannot be created with this account',
        );
      }
    }

    return InternalServerErrorException(error.message);
  }
}
