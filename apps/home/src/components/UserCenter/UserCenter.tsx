import { Box } from '@fower/react'
import { ExportPrivateKey } from './ExportPrivateKey'
import { MemberKeys } from './MemberKeys'
import { UserProfile } from './UserProfile'
import { WalletInfo } from './WalletInfo'

export function UserCenter() {
  return (
    <Box toLeft h-100vh>
      <Box flex-1 h-100vh>
        <UserProfile />
      </Box>
      <Box flex-2 bgNeutral100--T40 p-60 toLeft gap10>
        <Box column gap8 w-360>
          <WalletInfo />
          <ExportPrivateKey />
        </Box>
        <Box column gap8 w-360>
          <MemberKeys />
        </Box>
      </Box>
    </Box>
  )
}
