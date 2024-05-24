import { PropsWithChildren } from 'react'
import { Box } from '@fower/react'
import { useSession } from 'next-auth/react'
import { Button, Card } from 'uikit'
import { appEmitter } from '@penx/event'
import { SessionProvider } from '@penx/session'
import { Logo } from '../Logo'
import { MnemonicGenerator } from '../MnemonicGenerator/MnemonicGenerator'
import { RecoveryPhraseLoginProvider } from '../RecoveryPhraseLogin/RecoveryPhraseLoginProvider'
import { RecoveryPhrase } from './RecoveryPhrase/RecoveryPhrase'
import { UserAvatar } from './UserAvatar'

function WithSessionProvider({ children }: PropsWithChildren) {
  const { data: session, status } = useSession()

  if (status === 'loading') return null

  return (
    <SessionProvider
      value={{
        data: session as any,
        loading: false,
      }}
    >
      {children}
    </SessionProvider>
  )
}

export function User() {
  const { data } = useSession()
  if (!data) return null

  return (
    <WithSessionProvider>
      <MnemonicGenerator>
        <RecoveryPhraseLoginProvider>
          <Box mx-auto w-760 column gap8 minH-100vh>
            <Box pt4 toBetween>
              <Box toCenterY>
                <Logo />
              </Box>
              <Button
                variant="outline"
                colorScheme="black"
                roundedFull
                onClick={() => {
                  appEmitter.emit('SIGN_OUT')
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
        </RecoveryPhraseLoginProvider>
      </MnemonicGenerator>
    </WithSessionProvider>
  )
}
