import { TRPCError } from '@trpc/server'
import Redis from 'ioredis'
import { z } from 'zod'
import { RedisKeys } from '@penx/constants'
import { prisma } from '@penx/db'
import { GithubInfo } from '@penx/model'
import { getMe } from '../libs/getMe'
import { hashPassword } from '../libs/hashPassword'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

const redis = new Redis(process.env.REDIS_URL!)

const isHosted = process.env.NEXT_PUBLIC_DEPLOY_MODE === 'SELF_HOSTED'

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    return getMe(ctx.token.uid)
  }),

  firstUser: publicProcedure.query(async ({ ctx }) => {
    if (!isHosted) return null
    return ctx.prisma.user.findFirst()
  }),

  // TODO: mode is not support MySQL
  // search: protectedProcedure
  //   .input(z.object({ q: z.string() }))
  //   .query(async ({ ctx, input }) => {
  //     let { q } = input
  //     if (!q) return []
  //     const users = await ctx.prisma.user.findMany({
  //       where: {
  //         OR: [
  //           {
  //             email: { contains: q, mode: 'insensitive' },
  //           },
  //           { name: { contains: q, mode: 'insensitive' } },
  //         ],
  //       },
  //       take: 5,
  //     })

  //     return users
  //   }),

  updatePublicKey: protectedProcedure
    .input(z.object({ publicKey: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { publicKey } = input
      return ctx.prisma.user.update({
        where: { id: ctx.token.uid },
        data: { publicKey },
        select: { publicKey: true },
      })
    }),

  updateConnectedSyncServerId: protectedProcedure
    .input(z.object({ syncServerId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: { id: ctx.token.uid },
        data: { connectedSyncServerId: input.syncServerId },
      })
    }),

  loginByPersonalToken: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const token = await ctx.prisma.personalToken.findUnique({
      where: { value: input },
    })
    if (!token) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Invalid personal token',
      })
    }

    return getMe(ctx.token.uid, true)
  }),

  loginDesktop: protectedProcedure.mutation(async ({ ctx }) => {
    return getMe(ctx.token.uid, true)
  }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        address: z.string(),
        displayName: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        avatarURL: z.string().min(1).optional(),
        color: z.string().min(1).optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const { id, ...data } = input
      return ctx.prisma.user.update({ where: { id }, data })
    }),

  deleteAccount: protectedProcedure.mutation(async ({ ctx, input }) => {
    const userId = ctx.token.uid
    return prisma.$transaction(
      async (tx) => {
        console.log('=========deleteAccount:', userId)

        // await tx.space.deleteMany({ where: { userId } })
        await tx.personalToken.deleteMany({ where: { userId } })
        await tx.syncServer.deleteMany({ where: { userId } })
        await tx.user.delete({ where: { id: userId } })
        return true
      },
      {
        maxWait: 5000, // default: 2000
        timeout: 10000, // default: 5000
      },
    )
  }),

  connectRepo: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        repo: z.string(),
        installationId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = input
      const user = await ctx.prisma.user.findFirstOrThrow({
        where: { id: userId },
      })

      const github = (user.github || {}) as GithubInfo

      github.installationId = input.installationId
      github.repo = input.repo

      return ctx.prisma.user.update({
        where: { id: userId },
        data: { github },
      })
    }),

  disconnectRepo: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = input
      const user = await ctx.prisma.user.findFirstOrThrow({
        where: { id: userId },
      })

      const github = (user.github || {}) as GithubInfo

      github.installationId = null as any
      github.repo = ''

      return ctx.prisma.user.update({
        where: { id: userId },
        data: { github },
      })
    }),

  updateMnemonicBackupStatus: protectedProcedure
    .input(z.boolean())
    .mutation(async ({ ctx, input }) => {
      const redisKey = RedisKeys.user(ctx.token.uid)

      const user = await ctx.prisma.user.update({
        where: { id: ctx.token.uid },
        data: { isMnemonicBackedUp: input },
      })

      await redis.set(redisKey, JSON.stringify(user))
      return user
    }),

  isEarlyAccessCodeValid: protectedProcedure
    .input(
      z.object({
        code: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { id: ctx.token.uid, earlyAccessCode: input.code },
      })
      return !!user
    }),
})
