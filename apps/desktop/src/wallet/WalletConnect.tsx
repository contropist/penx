import { useAccount } from 'wagmi'
import { AccountPopover } from './AccountPopover'
import { ConnectButton } from './ConnectButton'

export function WalletConnect() {
  const { isConnected } = useAccount()
  if (isConnected) return <AccountPopover />
  return <ConnectButton />
}
