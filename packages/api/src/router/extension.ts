import Redis from 'ioredis'
import { z } from 'zod'
import { Extension } from '@penx/db'
import { getToken } from '../github-bot/getToken'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

const ALL_EXTENSIONS_KEY = 'extensions:all'

const redis = new Redis(process.env.REDIS_URL!)

export const extensionRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    const value = await redis.get(ALL_EXTENSIONS_KEY)
    if (value) {
      return JSON.parse(value) as Extension[]
    }
    const extensions = await ctx.prisma.extension.findMany({
      orderBy: { createdAt: 'desc' },
    })
    await redis.set(ALL_EXTENSIONS_KEY, JSON.stringify(extensions))
    return extensions
  }),

  myExtensions: protectedProcedure.query(async ({ ctx }) => {
    const extensions = await ctx.prisma.extension.findMany({
      where: { userId: ctx.token.uid },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return extensions
  }),

  canReleaseExtension: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const ext = await ctx.prisma.extension.findUnique({
        where: { name: input.name },
      })
      if (!ext) return true

      if (ext.userId === ctx.token.uid && input.name === ext.name) {
        return true
      }
      return false
    }),

  upsertExtension: publicProcedure
    .input(
      z.object({
        name: z.string(),
        manifest: z.string(),
        readme: z.string(),
        logo: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const ext = await ctx.prisma.extension.findUnique({
        where: { name: input.name },
      })

      if (ext) {
        await ctx.prisma.extension.update({
          where: { id: ext.id },
          data: {
            manifest: input.manifest,
            readme: input.readme,
            logo: input.logo,
          },
        })
      } else {
        await ctx.prisma.extension.create({
          data: {
            userId: ctx.token.uid,
            name: input.name,
            manifest: input.manifest,
            readme: input.readme,
            logo: input.logo,
          },
        })
      }

      const extensions = await ctx.prisma.extension.findMany({
        orderBy: { createdAt: 'desc' },
      })
      await redis.set(ALL_EXTENSIONS_KEY, JSON.stringify(extensions))
      return true
    }),

  increaseInstallationCount: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const ext = await ctx.prisma.extension.findUnique({
        where: { name: input.name },
      })

      if (!ext) return true

      await ctx.prisma.extension.update({
        where: { id: ext.id },
        data: { installationCount: ext.installationCount + 1 },
      })

      const extensions = await ctx.prisma.extension.findMany({
        orderBy: { createdAt: 'desc' },
      })
      await redis.set(ALL_EXTENSIONS_KEY, JSON.stringify(extensions))
      return true
    }),

  getGitHubToken: publicProcedure.query(() => {
    return getToken()
  }),
})
