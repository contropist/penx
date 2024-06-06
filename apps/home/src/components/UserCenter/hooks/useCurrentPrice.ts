import { useReadContract } from 'wagmi'
import { penXKeyAbi } from '@penx/abi'
import { addressMap } from '@penx/wagmi'

export function useCurrentPrice() {
  return useReadContract({
    address: addressMap.PenXKey,
    abi: penXKeyAbi,
    functionName: 'getMintPrice',
  })
}
