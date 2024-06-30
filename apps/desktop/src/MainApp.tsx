import { useEffect } from 'react'
import { Box } from '@fower/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { appEmitter } from '@penx/event'
import { db } from '@penx/local-db'
import { SessionProvider } from '@penx/session'
import { getLocalSession } from '@penx/storage'
import { installBuiltinExtension } from '~/common/installBuiltinExtension'
import { CommandPalette } from '~/components/CommandPalette/CommandPalette'
import { DesktopWelcome } from '~/components/DesktopWelcome'
import { InitUserToStore } from '~/components/InitUserToStore'
import { SiweModal } from './wallet/SiweModal'

export function MainApp() {
  const {
    isLoading,
    data: isBoarded,
    refetch,
  } = useQuery({
    queryKey: ['isFistTime'],
    queryFn: async () => {
      const isBoarded = localStorage.getItem('PENX_IS_BOARDED')
      return !!isBoarded
    },
  })

  const {
    isLoading: isSessionLoading,
    data: session,
    refetch: refetchSession,
  } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const session = await getLocalSession()
      return session ? session : null
    },
  })

  useEffect(() => {
    appEmitter.on('LOGIN_BY_PERSONAL_TOKEN_SUCCESSFULLY', () => {
      refetchSession()
    })

    appEmitter.on('SIGN_OUT_SUCCESSFULLY', () => {
      refetchSession()
    })
  }, [refetchSession])

  const { isPending: initializing, mutateAsync: init } = useMutation({
    mutationKey: ['init_data_fist_time'],
    mutationFn: async () => {
      localStorage.setItem('PENX_IS_BOARDED', 'yes')

      await installBuiltinExtension()

      const localSpaces = await db.listLocalSpaces()

      if (!localSpaces.length) {
        await db.createLocalSpace()
      }
      await refetch()
    },
  })

  if (isLoading) return null

  return (
    <SessionProvider
      value={{
        data: session!,
        loading: isSessionLoading,
      }}
    >
      {session && <InitUserToStore userId={session?.userId} />}
      <SiweModal />

      <Box
        relative
        absolute
        top0
        bottom0
        left0
        right0
        rounded2XL
        bgTransparent
        // bgAmber100
        bgWhite
        // bgGradientX={['gray200', 'purple200']}
        // overflowHidden
      >
        {!isBoarded && (
          <DesktopWelcome
            isLoading={initializing}
            onGetStarted={async () => {
              await init()
            }}
          />
        )}
        {isBoarded && <CommandPalette />}
      </Box>
    </SessionProvider>
  )
}
