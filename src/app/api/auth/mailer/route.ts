import { sealData } from 'iron-session';
import { db } from '@/server/db';
import { sendMail } from '@/lib/nodemailer';
import {
  BadRequestException,
  MakeNextJsonResponse,
  UnauthorizedException,
} from '@/utils/http-exception';
import { MailerInput } from '@/validates/user-validate';
import { env } from '@/env.js';

export async function POST(req: Request) {
  const validate = await MailerInput.spa(await req.json());
  if (!validate.success) {
    const [error] = validate.error.issues;
    return BadRequestException(error?.message!);
  }

  const { email, remember } = validate.data;
  const user = await db.user.mailer(email);

  if (user === null) return UnauthorizedException('Invalid email');

  const seal = await sealData(
    { ...user, remember },
    {
      password: env.APP_RANDOM_PASSWORD,
      ttl: 15 * 60,
    },
  );

  await sendMail({
    to: user.email,
    subject: '[next-temp-app]: Sign in with your email',
    html: `Hey there ${user.name}, <a href="http://192.168.0.8:3000/api/auth/login?seal=${seal}">click here to login</a>.`,
  });

  return MakeNextJsonResponse({
    code: 200,
    message: 'A sign in link has been send to your email address',
  });
}
