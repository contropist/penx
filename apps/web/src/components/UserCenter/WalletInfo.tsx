import { Box } from '@fower/react'
import { usePrivy } from '@privy-io/react-auth'
import { Wallet } from 'lucide-react'
import { precision } from '@penx/math'
import { useEthBalance } from './hooks/useEthBalance'

export function WalletInfo() {
  const { user } = usePrivy()
  const { data } = useEthBalance()

  if (!user) return null

  const { address = '' } = user.wallet!
  const shortAddress = address.slice(0, 24) + '...' + address.slice(-4)
  return (
    <Box p6 shadowPopover rounded2XL bgWhite column gap3>
      <Box toCenterY gap1>
        <Wallet size={24} />
        <Box>Wallet</Box>
      </Box>
      <Box>{shortAddress}</Box>

      <Box toBetween toCenterY>
        <Box>Balance</Box>
        <Box text2XL fontBold>
          {typeof data !== 'undefined' &&
            `${precision.toDecimal(data).toFixed(5)} ETH`}
        </Box>
      </Box>
    </Box>
  )
}
