import { useState } from 'react'
import { isMobile } from 'react-device-detect'
import { ErrorBoundary } from 'react-error-boundary'
import { Box } from '@fower/react'
import { useQuery } from '@tanstack/react-query'
import { SIDEBAR_WIDTH, WORKBENCH_NAV_HEIGHT } from '@penx/constants'
import { EditorProvider } from '@penx/editor'
import { useActiveNodes, useActiveSpace, useRouterName, useUser } from '@penx/hooks'
import { IconSidebar } from '@penx/icons'
import { useSession } from '@penx/session'
import { getAuthorizedUser } from '@penx/storage'
import { Fallback } from '../Fallback/Fallback'
import { LoginByTokenModal } from '../LoginByTokenModal/LoginByTokenModal'
import { CommandPanel } from '../Palette'
import { Account } from './Account/Account'
import { BackupMnemonicTips } from './BackupMnemonicTips'
import { BottomBar } from './BottomBar'
import { MobileNav } from './NodeNav/MobileNav'
import { PCNav } from './NodeNav/PCNav'
import { NodePanels } from './NodePanels'
import { PageDatabases } from './PageDatabases/PageDatabases'
import { PageTodo } from './PageTodo/PageTodo'
import { RecoveryPhrase } from './RecoveryPhrase/RecoveryPhrase'
import { RowModal } from './RowModal'
// import { LocalBackup } from './Settings/LocalBackup/LocalBackup'
import { PageSettings } from './Settings/PageSettings/PageSettings'
import { SettingsModal } from './Settings/SettingsModal/SettingsModal'
import { Sidebar } from './Sidebar/Sidebar'
import { TagHubModal } from './TagHubModal/TagHubModal'

export const Workbench = () => {
  const { activeSpace } = useActiveSpace()
  const name = useRouterName()
  const { data: session } = useSession()
  const [sidebarOpen, setSideBarOpen] = useState(true)
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen)
  }

  const { activeNodes } = useActiveNodes()
  const [activeNode] = activeNodes

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getAuthorizedUser,
  })

  // const SIDEBAR_WIDTH = 600

  // console.log('router name==========:', name)

  const isBackedUp = user?.isMnemonicBackedUp

  if (!activeSpace) return null

  return (
    <EditorProvider space={activeSpace}>
      <LoginByTokenModal />
      <SettingsModal />
      <TagHubModal />
      <RowModal />

      <Box h-100vh toLeft black flex-1 relative bgWhite gapX10>
        {/* {!isBackedUp && session && name === 'NODE' && <BackupMnemonicTips />} */}

        <Box toLeft relative>
          <Box
            w={sidebarOpen ? [0, 0, SIDEBAR_WIDTH] : 0}
            h-100vh
            toLeft
            flexShrink-0
            transition="width 0.3s"
          >
            <Sidebar activeNode={activeNode} />
          </Box>
          {/* <Box h={WORKBENCH_NAV_HEIGHT} toCenterY absolute right--40 zIndex-100>
            {!isMobile && <CommandPanel />}
            <Box
              onClick={handleViewSidebar}
              cursorPointer
              neutral500
              ml2
              square6
              toCenter
              rounded
              bgNeutral100--hover
              display={['none', 'none', 'flex']}
            >
              <IconSidebar size={20} fillGray600 />
            </Box>
          </Box> */}
        </Box>
        <Box data-tauri-drag-region flex-1 relative overflowHidden>
          <ErrorBoundary fallback={<Fallback />}>
            {name === 'TODOS' && <BottomBar />}

            {name === 'NODE' && <NodePanels />}

            {name !== 'NODE' && (
              <Box data-tauri-drag-region h-100vh overflowYAuto toCenterY pl10>
                {/* <PCNav /> */}
                <MobileNav />

                {name === 'SETTINGS' && <PageSettings />}
                {name === 'TODOS' && <PageTodo />}
                {name === 'DATABASES' && <PageDatabases />}
                {name === 'ACCOUNT' && <Account />}
                {name === 'RECOVER_PHRASE' && (
                  <Box p5>
                    <RecoveryPhrase />
                  </Box>
                )}
                {/* {name === 'LOCAL_BACKUP' && (
                  <Box p5>
                    <LocalBackup />
                  </Box>
                )} */}
              </Box>
            )}
          </ErrorBoundary>
        </Box>
      </Box>
    </EditorProvider>
  )
}
