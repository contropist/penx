import { Box } from '@fower/react'
import { Copy, Power, Wallet } from 'lucide-react'
import { useAccount, useDisconnect } from 'wagmi'
import { Button, Skeleton, toast } from 'uikit'
import { precision } from '@penx/math'
import { useCopyToClipboard } from '@penx/shared'
import { AccountAvatar } from './AccountAvatar'
import { useEthBalance } from './hooks/useEthBalance'

export function WalletInfo() {
  const { data, isLoading } = useEthBalance()
  const { disconnect } = useDisconnect()
  const { copy } = useCopyToClipboard()
  const { address = '' } = useAccount()

  const shortAddress = address.slice(0, 10) + '...' + address.slice(-4)
  return (
    <Box column gap3>
      <Box toBetween toCenterY>
        <Box toCenterY gap2>
          <AccountAvatar />
          <Box>{shortAddress}</Box>
        </Box>
        <Box toCenterY gap-1>
          <Button
            size={28}
            colorScheme="neutral600"
            variant="ghost"
            isSquare
            onClick={() => {
              copy(address)
              toast.success('Copied to clipboard')
            }}
          >
            <Copy size={18} />
          </Button>

          <Button
            size={28}
            colorScheme="neutral600"
            variant="ghost"
            isSquare
            onClick={() => {
              disconnect()
              localStorage.removeItem('PENX_TOKEN')
            }}
          >
            <Power size={18} />
          </Button>
        </Box>
      </Box>

      <Box toCenter h-60>
        {isLoading && <Skeleton h-40 w-80p roundedXL />}
        <Box text4XL fontBold>
          {typeof data !== 'undefined' && `${precision.toDecimal(data).toFixed(5)} ETH`}
        </Box>
      </Box>
    </Box>
  )
}
