import { createTRPCClient, httpBatchLink } from '@trpc/client'
import superjson from 'superjson'
import fetch from 'node-fetch'
import { Env } from '../types'
import { getBaseURL, readConfig } from './utils'

export async function getTRPC(env?: Env) {
  let BASE_URL = ''
  if (!env) {
    const config = readConfig()
    env = config.env
  }

  BASE_URL = getBaseURL(env)

  const config = readConfig()

  const trpc: any = createTRPCClient({
    links: [
      httpBatchLink({
        url: `${BASE_URL}/api/trpc`,
        transformer: superjson,
        fetch: fetch as any,
        async headers() {
          return {
            Authorization: config.token,
          }
        },
      }),
    ],
  })

  return trpc
}
