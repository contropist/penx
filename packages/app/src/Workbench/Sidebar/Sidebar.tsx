import { memo, useMemo } from 'react'
import { Box } from '@fower/react'
import { open } from '@tauri-apps/plugin-shell'
import {
  DatabaseBackup,
  Hash,
  Info,
  InfoIcon,
  Key,
  LayoutGridIcon,
  LayoutIcon,
  MessageCircle,
  MessageCircleCode,
  Settings,
  Settings2,
  User,
} from 'lucide-react'
import { Bullet } from 'uikit'
import { useRouterName, useUser } from '@penx/hooks'
import { IconCalendar, IconTodo } from '@penx/icons'
import { Node } from '@penx/model'
import { INode } from '@penx/model-types'
import { useSession } from '@penx/session'
import { store } from '@penx/store'
import { SyncPopover } from '../StatusBar/SyncPopover'
import { FavoriteBox } from './FavoriteBox/FavoriteBox'
import { LoginButton } from './LoginButton'
import { SettingsButton } from './SettingsButton'
import { SidebarHeader } from './SidebarHeader'
import { SidebarItem } from './SidebarItem'

interface Props {
  activeNode: INode
}

export const Sidebar = memo(
  function Sidebar({ activeNode }: Props) {
    const { loading, data: session } = useSession()

    const name = useRouterName()

    const isTodosActive = name === 'TODOS'
    const isDatabasesActive = name === 'DATABASES'
    const isExtensionsActive = name === 'EXTENSIONS'
    const isMarketplaceActive = name === 'MARKETPLACE'
    const isAccountSettingsActive = name === 'ACCOUNT_SETTINGS'
    const isRecoveryPhraseActive = name === 'RECOVER_PHRASE'
    const isLocalBackupActive = name === 'LOCAL_BACKUP'
    const isGeneralActive = name === 'GENERAL'
    const isAboutActive = name === 'ABOUT'

    const isTodayActive = useMemo(() => {
      if (name !== 'NODE' || !activeNode) return false
      if (!activeNode) return false
      if (new Node(activeNode).isToday) return true
      return false
    }, [name, activeNode])

    const isTagsActive = useMemo(() => {
      if (name !== 'NODE' || !activeNode) return false
      if (!activeNode) return false
      if (new Node(activeNode).isDatabaseRoot) return true
      return false
    }, [name, activeNode])

    const isRootActive = useMemo(() => {
      if (name !== 'NODE' || !activeNode) return false
      if (!activeNode) return false
      if (new Node(activeNode).isRootNode) return true
      return false
    }, [name, activeNode])

    return (
      <Box
        data-tauri-drag-region
        column
        // borderRight
        // borderGray100
        flex-1
        display={['none', 'none', 'flex']}
        gap3
        h-100vh
        overflowAuto
        toCenterY
      >
        {/* <SidebarHeader /> */}

        <Box px3 column gap2 pb3 toCenterY>
          <SidebarItem
            neutral500
            isActive={isGeneralActive}
            icon={
              <Box neutral500 inlineFlex>
                <Settings2 size={20} />
              </Box>
            }
            label="General"
            onClick={() => {
              store.router.routeTo('GENERAL')
            }}
          />

          <SidebarItem
            neutral500
            icon={
              <Box
                inlineFlex
                neutral500
                // square5
                // roundedLG
                // bgGradientX={['pink500', 'purple500']}
                // white
                // toCenter
              >
                <LayoutGridIcon size={20} />
              </Box>
            }
            label="Extensions"
            isActive={isExtensionsActive}
            onClick={() => {
              store.router.routeTo('EXTENSIONS')
            }}
          />

          {session && (
            <SidebarItem
              neutral500
              isActive={isAccountSettingsActive}
              icon={
                <Box neutral500 inlineFlex>
                  <User size={20} />
                </Box>
              }
              label="Account settings"
              onClick={() => {
                store.router.routeTo('ACCOUNT_SETTINGS')
              }}
            />
          )}

          {/* {session && (
            <SidebarItem
              neutral500
              isActive={isRecoveryPhraseActive}
              icon={
                <Box neutral500 inlineFlex>
                  <Key size={20} />
                </Box>
              }
              label="Recovery phrase"
              onClick={() => {
                store.router.routeTo('RECOVER_PHRASE')
              }}
            />
          )} */}

          {/* <SidebarItem
            neutral500
            isActive={isLocalBackupActive}
            icon={
              <Box neutral500 inlineFlex>
                <DatabaseBackup size={20} />
              </Box>
            }
            label="Local auto backup"
            onClick={() => {
              store.router.routeTo('LOCAL_BACKUP')
            }}
          /> */}

          <SidebarItem
            neutral500
            icon={
              <Box neutral500 inlineFlex>
                <MessageCircle size={18} />
              </Box>
            }
            label="Feedback"
            onClick={() => {
              open('https://github.com/penxio/penx/issues')
            }}
          />

          <SidebarItem
            neutral500
            isActive={isAboutActive}
            icon={
              <Box neutral500 inlineFlex>
                <Info size={20} />
              </Box>
            }
            label="About"
            onClick={() => {
              store.router.routeTo('ABOUT')
            }}
          />
        </Box>
      </Box>
    )
  },
  (prevProps, nextProps) => {
    return prevProps.activeNode?.id === nextProps.activeNode?.id
  },
)
