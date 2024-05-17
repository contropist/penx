import { PropsWithChildren, useEffect } from 'react'
import { Box } from '@fower/react'
import { useQuery } from '@tanstack/react-query'
import Head from 'next/head'
import { EditorApp } from '@penx/app'
import { appEmitter } from '@penx/event'
import { SessionProvider, useSession } from '@penx/session'
import { getLocalSession } from '@penx/storage'
import {
  FirstLocalSpaceGenerator,
  RecoveryPhraseLoginProvider,
} from '@penx/widget'
import { ToggleModeButton } from './ToggleModeButton'

const OnlineProvider = ({ children }: PropsWithChildren) => {
  const { data, loading } = useSession()

  if (loading) return null

  if (!navigator.onLine) return <>{children}</>

  // not logged in
  if (!data) {
    return <FirstLocalSpaceGenerator>{children}</FirstLocalSpaceGenerator>
  }

  return <RecoveryPhraseLoginProvider>{children}</RecoveryPhraseLoginProvider>
}

export function EditorModeApp() {
  const { isLoading, data, refetch } = useQuery(['session'], async () => {
    const session = await getLocalSession()
    return session ? session : null
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
          <ToggleModeButton absolute bottom4 right4 />
        </Box>
      </OnlineProvider>
    </SessionProvider>
  )
}
