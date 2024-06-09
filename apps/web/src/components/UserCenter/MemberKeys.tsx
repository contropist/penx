import { Box } from '@fower/react'
import { waitForTransactionReceipt } from '@wagmi/core'
import { Gem } from 'lucide-react'
import { useWriteContract } from 'wagmi'
import { Button } from 'uikit'
import { penXKeyAbi } from '@penx/abi'
import { precision } from '@penx/math'
import { addressMap, wagmiConfig } from '@penx/wagmi'
import { useCurrentPrice } from './hooks/useCurrentPrice'
import { useEthBalance } from './hooks/useEthBalance'
import { useKeyBalance } from './hooks/useKeyBalance'

function KeyPrice() {
  const { data, isLoading } = useCurrentPrice()

  if (isLoading || !data) {
    return null
  }

  return (
    <Box text2XL fontBold>
      {precision.toDecimal(data).toFixed(6)} ETH
    </Box>
  )
}

function MyKeys() {
  const { isLoading, data } = useKeyBalance()

  if (isLoading || typeof data === 'undefined') {
    return null
  }

  return (
    <Box text2XL fontBold>
      {data.toString()}
    </Box>
  )
}

function BuyKey() {
  const { writeContractAsync, isLoading } = useWriteContract()
  const price = useCurrentPrice()
  const keyBalance = useKeyBalance()
  const ethBalance = useEthBalance()

  return (
    <Button
      flex-1
      roundedFull
      size="lg"
      disabled={isLoading || keyBalance.isLoading || price.isLoading}
      onClick={async () => {
        try {
          const hash = await writeContractAsync({
            address: addressMap.PenXKey,
            abi: penXKeyAbi,
            functionName: 'mintKey',
            value: price.data,
          })
          console.log('=========hash:', hash)

          await waitForTransactionReceipt(wagmiConfig, { hash })
          await keyBalance.refetch()
          await price.refetch()
          await ethBalance.refetch()
        } catch (error) {
          console.log('error.........:', error)
        }
      }}
    >
      Buy Key
    </Button>
  )
}

function SellKey() {
  const { writeContractAsync, isLoading } = useWriteContract()
  const price = useCurrentPrice()
  const keyBalance = useKeyBalance()
  const ethBalance = useEthBalance()

  return (
    <Button
      flex-1
      roundedFull
      variant="outline"
      size="lg"
      disabled={isLoading || keyBalance.isLoading || price.isLoading}
      onClick={async () => {
        try {
          const hash = await writeContractAsync({
            address: addressMap.PenXKey,
            abi: penXKeyAbi,
            functionName: 'burnKey',
            args: [BigInt(1)],
          })

          console.log('=========hash:', hash)

          await waitForTransactionReceipt(wagmiConfig, { hash })
          await keyBalance.refetch()
          await price.refetch()
          await ethBalance.refetch()
        } catch (error) {
          console.log('error.........:', error)
        }
      }}
    >
      Sell Key
    </Button>
  )
}

export function MemberKeys() {
  return (
    <Box p6 dashboardCard rounded2XL bgWhite column gap4>
      <Box toBetween toCenterY>
        <Box toCenterY gap1>
          <Gem size={20} />
          <Box>My Member Keys</Box>
        </Box>
        <MyKeys />
      </Box>
      <Box toBetween toCenterY>
        <Box>Current Price</Box>
        <KeyPrice />
      </Box>
      <Box toBetween gap3>
        <BuyKey />
        <SellKey />
      </Box>
    </Box>
  )
}
