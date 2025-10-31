import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { PostCreateOneInput } from '@/lib/validates';

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(PostCreateOneInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          userId: ctx.user.id,
          name: input.name,
          description: input.description,
        },
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    return post ?? null;
  }),
});
