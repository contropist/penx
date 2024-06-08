import { PropsWithChildren } from 'react'
import { Box } from '@fower/react'
import { useLogin, usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/router'
import { useHideLogoLoader } from '@penx/hooks'
import { Login } from './Login'

interface Props {}

export function LoginProvider({ children }: PropsWithChildren<Props>) {
  const { push } = useRouter()
  const { ready, authenticated } = usePrivy()

  useHideLogoLoader()

  const { login } = useLogin({
    onComplete: (
      user,
      isNewUser,
      wasAlreadyAuthenticated,
      loginMethod,
      linkedAccount,
    ) => {
      console.log(
        '=============>>>>>>',
        user,
        isNewUser,
        wasAlreadyAuthenticated,
        loginMethod,
        linkedAccount,
      )
      // push('/cli-login')
      // Any logic you'd like to execute if the user is/becomes authenticated while this
      // component is mounted
    },
    onError: (error) => {
      console.log(error)
      // Any logic you'd like to execute after a user exits the login flow or there is an error
    },
  })

  if (!ready) return null

  if (authenticated) {
    return <>{children}</>
  }

  return <Login login={login} />
}
