import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { PostCreationInput } from "@/validates/post-validate";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(PostCreationInput)
    .mutation(async ({ ctx, input }) => {
      console.log(ctx.session.user);
      return ctx.db.post.create({
        data: {
          userId: ctx.session.user.id,
          name: input.name,
          description: input.description,
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
