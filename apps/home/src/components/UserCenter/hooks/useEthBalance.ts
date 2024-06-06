import { usePrivy } from '@privy-io/react-auth'
import { useQuery } from '@tanstack/react-query'
import { createPublicClient, http } from 'viem'
import { arbitrumSepolia } from 'viem/chains'

export function useEthBalance() {
  const { user } = usePrivy()
  const address = user?.wallet?.address as any

  return useQuery({
    queryKey: ['eth_balance', address],
    queryFn: async () => {
      const publicClient = createPublicClient({
        chain: arbitrumSepolia,
        transport: http(),
      })
      const data = await publicClient.getBalance({
        address,
      })
      return data
    },
  })
}
