import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { PostCreateOneInput } from '@/lib/validates';

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(PostCreateOneInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
          description: input.description,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: 'desc' },
      where: {
        createdBy: { id: ctx.session.user.id },
      },
    });

    return post ?? null;
  }),
});
