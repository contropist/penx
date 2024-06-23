import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import superjson from 'superjson'
import { BASE_URL } from '@penx/constants'
import { getHeaders } from './getHeaders'

// TODO: handle any
export const api = createTRPCProxyClient<any>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: `${BASE_URL}/api/trpc`,
      async headers() {
        return await getHeaders()
      },
    }),
  ],
}) as any // TODO: handle any

export const trpc = createTRPCReact<any>() as any // TODO: handle any
