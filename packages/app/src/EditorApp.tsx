import { ErrorBoundary } from 'react-error-boundary'
import { isProd, isServer } from '@penx/constants'
import { appEmitter } from '@penx/event'
import { useHideLogoLoader } from '@penx/hooks'
import { useSession } from '@penx/session'
import { ClientOnly } from '@penx/widget'
import { runWorker } from '@penx/worker'
import { AppProvider } from './AppProvider'
import { loadCloudSpaces } from './common/loadCloudSpaces'
import { Fallback } from './Fallback/Fallback'
import { HotkeyBinding } from './HotkeyBinding'
import { SpaceSyncManager } from './SpaceSyncManager'
import { Workbench } from './Workbench/Workbench'

if (!isServer) {
  // appEmitter.on('LOAD_CLOUD_SPACES', async () => {
  //   setTimeout(() => {
  //     loadCloudSpaces()
  //   }, 10)
  // })
}

export const EditorApp = () => {
  const { data: session } = useSession()
  // console.log('Editor App============session:', session)

  useHideLogoLoader()

  return (
    <ClientOnly>
      <ErrorBoundary fallback={<Fallback />}>
        <HotkeyBinding />
        <SpaceSyncManager userId={session?.id}>
          <AppProvider>
            <Workbench />
          </AppProvider>
        </SpaceSyncManager>
      </ErrorBoundary>
    </ClientOnly>
  )
}
