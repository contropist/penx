import { Box } from '@fower/react'
import { usePrivy } from '@privy-io/react-auth'
import { Button, Card } from 'uikit'
import { appEmitter } from '@penx/event'
import { Logo } from '../Logo'
import { MnemonicGenerator } from '../MnemonicGenerator/MnemonicGenerator'
import { RecoveryPhraseLoginProvider } from '../RecoveryPhraseLogin/RecoveryPhraseLoginProvider'
import { RecoveryPhrase } from './RecoveryPhrase/RecoveryPhrase'
import { UserAvatar } from './UserAvatar'

export function User() {
  const { logout, user } = usePrivy()
  console.log('=======user:', user)

  return (
    <Box mx-auto w-760 column gap8 minH-100vh>
      <Box pt4 toBetween>
        <Box toCenterY>
          <Logo />
        </Box>
        <Button
          variant="outline"
          colorScheme="black"
          roundedFull
          onClick={async () => {
            await logout()
            // appEmitter.emit('SIGN_OUT')
          }}
        >
          Logout
        </Button>
      </Box>
      <Box column flex-1 gap6>
        <UserAvatar />

        <Card rounded3XL toCenter w={['98%', '98%', 760]}>
          <RecoveryPhrase />
        </Card>
      </Box>
    </Box>
  )

  return (
    <MnemonicGenerator>
      <RecoveryPhraseLoginProvider></RecoveryPhraseLoginProvider>
    </MnemonicGenerator>
  )
}
