import { Box } from '@fower/react'
import { usePrivy } from '@privy-io/react-auth'
import { Key } from 'lucide-react'
import { Button } from 'uikit'

export function ExportPrivateKey() {
  const { ready, authenticated, user, exportWallet } = usePrivy()
  // Check that your user is authenticated
  const isAuthenticated = ready && authenticated
  // Check that your user has an embedded wallet
  const hasEmbeddedWallet = !!user?.linkedAccounts.find(
    (account) => account.type === 'wallet' && account.walletClient === 'privy',
  )

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
        <Box>Export my wallet</Box>
      </Box>
      <Box neutral400 textSM>
        A user{`'`}s embedded wallet is theirs to keep, and even take with them.
      </Box>

      <Button
        variant="outline"
        colorScheme="brand500"
        fontSemibold
        onClick={exportWallet}
        disabled={!isAuthenticated || !hasEmbeddedWallet}
      >
        Export address private key
      </Button>
    </Box>
  )
}
