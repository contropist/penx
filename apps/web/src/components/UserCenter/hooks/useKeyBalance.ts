import { usePrivy } from '@privy-io/react-auth'
import { useReadContract } from 'wagmi'
import { penXKeyAbi } from '@penx/abi'
import { addressMap } from '@penx/wagmi'

export function useKeyBalance() {
  const { user } = usePrivy()
  return useReadContract({
    address: addressMap.PenXKey,
    abi: penXKeyAbi,
    functionName: 'balanceOf',
    args: [user?.wallet?.address as any],
  })
}
