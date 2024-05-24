import { useRouter } from 'next/router'
import { Button, modalController } from 'uikit'
import { isDesktop, ModalNames } from '@penx/constants'
import { appEmitter } from '@penx/event'
import { useSession } from '@penx/session'

export function LoginButton() {
  const { data, loading } = useSession()
  const { push } = useRouter()

  if (loading) return null
  if (data) return null

  return (
    <Button
      size="lg"
      roundedFull
      colorScheme="black"
      w-100p
      onClick={async () => {
        if (isDesktop) {
          appEmitter.emit('SIGN_IN_DESKTOP')
          return
        }

        // push('/login/web3')
        push('/login')
      }}
    >
      Login to enable Sync
    </Button>
  )
}
