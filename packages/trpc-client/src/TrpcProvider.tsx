import { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import superjson from 'superjson'
import { BASE_URL } from '@penx/constants'
import { getHeaders } from './getHeaders'
import { trpc } from './trpc'

const queryClient = new QueryClient()
const trpcClient = trpc.createClient({
  transformer: superjson,

  links: [
    httpBatchLink({
      url: `${BASE_URL}/api/trpc`,
      headers() {
        return getHeaders()
      },
    }),
  ],
})

export function TrpcProvider(props: PropsWithChildren) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
    </trpc.Provider>
  )
}
