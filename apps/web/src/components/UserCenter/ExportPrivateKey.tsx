import { Box } from '@fower/react'
import { usePrivy, WalletWithMetadata } from '@privy-io/react-auth'
import { Key } from 'lucide-react'
import { Button } from 'uikit'

export function ExportPrivateKey() {
  const { ready, authenticated, user, exportWallet, setWalletPassword } =
    usePrivy()

  // Check that your user is authenticated
  const isAuthenticated = ready && authenticated

  if (!user || !isAuthenticated) return null

  const embeddedWallet = user.linkedAccounts.find(
    (account): account is WalletWithMetadata =>
      account.type === 'wallet' && account.walletClientType === 'privy',
  )

  const alreadyHasPassword = embeddedWallet?.recoveryMethod === 'user-passcode'

  return (
    <Box
      p6
      dashboardCard
      // shadow
      rounded2XL
      bgWhite
      column
      gap3
    >
      <Box toCenterY gap1>
        <Key size={20} />
        <Box>Embedded Wallet</Box>
      </Box>
      <Box neutral400 textSM>
        A user{`'`}s embedded wallet is theirs to keep, and even take with them.
      </Box>

      <Button
        variant="outline"
        colorScheme="brand500"
        fontSemibold
        onClick={setWalletPassword}
        disabled={!isAuthenticated || !embeddedWallet}
      >
        {/* Set a recovery password */}
        {!alreadyHasPassword
          ? 'Add a password to your wallet'
          : 'Reset the password on your wallet'}
      </Button>

      <Button
        variant="outline"
        colorScheme="brand500"
        fontSemibold
        onClick={exportWallet}
        disabled={!isAuthenticated || !embeddedWallet}
      >
        Export address private key
      </Button>
    </Box>
  )
}
