import { PropsWithChildren, useEffect } from 'react'
import { Box } from '@fower/react'
import { useQuery } from '@tanstack/react-query'
import EditorApp from '@penx/app'
// import { EditorApp } from '@penx/app'
import { appEmitter } from '@penx/event'
import { SessionProvider, useSession } from '@penx/session'
import { getLocalSession } from '@penx/storage'
// import { RecoveryPhraseLoginProvider } from '@penx/widget'
import { FirstLocalSpaceGenerator } from './FirstLocalSpaceGenerator/FirstLocalSpaceGenerator'

const OnlineProvider = ({ children }: PropsWithChildren) => {
  const { data, loading } = useSession()

  if (loading) return null

  if (!navigator.onLine) return <>{children}</>
  console.log('data=========:', data)

  // not logged in
  if (!data) {
    return <FirstLocalSpaceGenerator>{children}</FirstLocalSpaceGenerator>
  }

  return null
}

export function EditorModeApp() {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const session = await getLocalSession()
      return session ? session : null
    },
  })

  useEffect(() => {
    appEmitter.on('LOGIN_BY_PERSONAL_TOKEN_SUCCESSFULLY', () => {
      refetch()
    })
  }, [refetch])

  return (
    <SessionProvider
      value={{
        data: data!,
        loading: isLoading,
      }}
    >
      <OnlineProvider>
        <Box relative>
          <EditorApp />
        </Box>
      </OnlineProvider>
    </SessionProvider>
  )
}
