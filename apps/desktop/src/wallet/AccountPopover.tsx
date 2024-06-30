import { Box } from '@fower/react'
import { LogOut } from 'lucide-react'
import { useAccount, useDisconnect } from 'wagmi'
import { Button, Menu, MenuItem, Popover, PopoverContent, PopoverTrigger } from 'uikit'
import { AccountAvatar } from './AccountAvatar'
import { WalletInfo } from './WalletInfo'

export function AccountPopover() {
  const { address = '' } = useAccount()

  const name = address.slice(0, 3) + '...' + address.slice(-3)
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger asChild cursorPointer>
        <Box cursorPointer toCenterY gap1 bgNeutral100 px2 py2 roundedLG>
          <AccountAvatar />
          {address && <Box neutral500>{name}</Box>}
        </Box>
      </PopoverTrigger>
      <PopoverContent w-300 p5 bgNeutral100--L20>
        <WalletInfo />
      </PopoverContent>
    </Popover>
  )
}
