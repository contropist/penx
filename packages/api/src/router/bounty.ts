import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'

export const bountyRouter = createTRPCRouter({
  byId: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.bounty.findUniqueOrThrow({
        where: { id: input.id },
      })
    }),
})
