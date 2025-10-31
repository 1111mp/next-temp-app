import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc';
import { sealData, unsealData } from 'iron-session';
import { TRPCError } from '@trpc/server';
import { getSessionOptions, type SessionUser } from '@/lib/session';
import {
  UserCreateOneInput,
  UserLoginByEmailInput,
  UserLoginBySealInput,
  UserLoginInput,
} from '@/lib/validates';
import { sendMail } from '@/lib/nodemailer';
import { env } from '@/env.js';

export const userRouter = createTRPCRouter({
  // user login
  login: publicProcedure
    .input(UserLoginInput)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.login(input);
      if (user === null) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Invalid account or password',
        });
      }

      if (input.remember) {
        ctx.session.updateConfig(
          getSessionOptions({ cookieOptions: { maxAge: undefined } }),
        );
      }

      ctx.session.user = user;
      await ctx.session.save();

      return user;
    }),
  // user login by email
  loginByEmail: publicProcedure
    .input(UserLoginByEmailInput)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.mailer(input.email);
      if (user === null) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Invalid email',
        });
      }

      const seal = await sealData(
        { remember: input.remember, user },
        {
          password: env.APP_RANDOM_PASSWORD,
          ttl: 15 * 69,
        },
      );

      await sendMail({
        to: user.email,
        subject: '[next-temp-app]: Sign in with your email',
        html: `Hey there ${user.name}, <a href="http://localhost:3000/api/auth/login?seal=${seal}">click here to login</a>.`,
      });

      return {
        code: 200,
        message: 'A sign in link has been send to your email address',
      };
    }),
  // user login by seal
  loginBySeal: publicProcedure
    .input(UserLoginBySealInput)
    .query(async ({ ctx, input }) => {
      const { remember = false, user } = await unsealData<{
        user: SessionUser;
        remember?: boolean;
      }>(input.seal, {
        password: env.APP_RANDOM_PASSWORD,
      });

      if (remember) {
        ctx.session.updateConfig(
          getSessionOptions({ cookieOptions: { maxAge: undefined } }),
        );
      }

      ctx.session.user = user;
      await ctx.session.save();

      return user;
    }),
  // create a new user
  create: publicProcedure
    .input(UserCreateOneInput)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.createOne(input);

      if (input.remember) {
        ctx.session.updateConfig(
          getSessionOptions({ cookieOptions: { maxAge: undefined } }),
        );
      }

      ctx.session.user = user;
      await ctx.session.save();

      return user;
    }),
  // user logout
  logout: protectedProcedure.mutation(async ({ ctx }) => {
    ctx.session.destroy();

    return {
      redirectTo: '/',
    };
  }),
});
