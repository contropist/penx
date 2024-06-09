import { Box } from '@fower/react'
import { usePrivy } from '@privy-io/react-auth'
import { Copy, Wallet } from 'lucide-react'
import { toast } from 'uikit'
import { precision } from '@penx/math'
import { useCopyToClipboard } from '@penx/shared'
import { useEthBalance } from './hooks/useEthBalance'

export function WalletInfo() {
  const { user } = usePrivy()
  const { data } = useEthBalance()
  const { copy } = useCopyToClipboard()

  if (!user) return null

  const { address = '' } = user?.wallet || {}
  const shortAddress = address.slice(0, 22) + '...' + address.slice(-4)
  return (
    <Box p6 rounded2XL bgWhite column gap3 dashboardCard>
      <Box toCenterY gap1>
        <Wallet size={20} />
        <Box>Wallet</Box>
      </Box>
      <Box toBetween>
        <Box>{shortAddress}</Box>
        <Box
          inlineFlex
          cursorPointer
          neutral500
          white--dark--hover
          onClick={() => {
            copy(address)
            toast.success('Copied to clipboard')
          }}
        >
          <Copy size={20} />
        </Box>
      </Box>

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
