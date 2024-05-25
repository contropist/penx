import { memo, useMemo } from 'react'
import { Box } from '@fower/react'
import { open } from '@tauri-apps/api/shell'
import {
  Hash,
  InfoIcon,
  LayoutGridIcon,
  LayoutIcon,
  MessageCircle,
  MessageCircleCode,
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
        bgZinc100--T40
        gap3
        h-100vh
        overflowAuto
      >
        <Box px2>
          <SidebarHeader />
          <Box column gap-1 flex-1 mt3>
            {/* <SidebarItem
              icon={
                <IconCalendar
                  size={20}
                  stroke={isTodayActive ? 'brand500' : 'gray500'}
                />
              }
              label="Today"
              isActive={isTodayActive}
              onClick={() => {
                store.node.selectDailyNote()
              }}
            /> */}

            {/* <SidebarItem
              icon={<Inbox size={18} />}
              label="Inbox"
              onClick={() => {
                store.node.selectInbox()
              }}
            /> */}

            {/* <SidebarItem
              icon={
                <IconTodo
                  size={20}
                  stroke={isTodosActive ? 'brand500' : 'gray500'}
                />
              }
              label="Tasks"
              isActive={isTodosActive}
              onClick={() => {
                store.router.routeTo('TODOS')
              }}
            /> */}

            <SidebarItem
              icon={
                <Box
                  inlineFlex
                  square5
                  roundedLG
                  brand500={isDatabasesActive}
                  bgGradientX={['red500', 'orange500']}
                  white
                  toCenter
                >
                  <Hash size={16} strokeWidth={1.5} />
                </Box>
              }
              label="Databases"
              isActive={isDatabasesActive}
              onClick={() => {
                store.router.routeTo('DATABASES')
              }}
            />

            <SidebarItem
              icon={
                <Box
                  inlineFlex
                  square5
                  roundedLG
                  bgGradientX={['pink500', 'purple500']}
                  white
                  toCenter
                >
                  <LayoutGridIcon size={14} />
                </Box>
              }
              label="Extensions"
              isActive={isExtensionsActive}
              onClick={() => {
                store.router.routeTo('EXTENSIONS')
              }}
            />

            <SidebarItem
              icon={
                <Box
                  inlineFlex
                  square5
                  roundedLG
                  white
                  toCenter
                  bgGradientY={['green500', 'blue500']}
                >
                  <LayoutGridIcon size={14} />
                </Box>
              }
              label="Marketplace"
              isActive={isMarketplaceActive}
              onClick={() => {
                store.router.routeTo('MARKETPLACE')
              }}
            />

            {/* <SidebarItem
              icon={
                <Bullet
                  mr-4
                  innerColor={isRootActive ? 'brand500' : undefined}
                />
              }
              label="Nodes"
              isActive={isRootActive}
              onClick={() => {
                store.node.selectSpaceNode()
              }}
            /> */}

            {/* <SidebarItem
              icon={
                <Box gray500 inlineFlex>
                  <BoxIcon size={20} strokeWidth={1.5} />
                </Box>
              }
              label="TagHub"
              onClick={() => {
                modalController.open(ModalNames.TAG_HUB)
              }}
            /> */}
          </Box>
        </Box>

        <Box flex-1 zIndex-1 overflowYAuto px2>
          <FavoriteBox />

          {/* {!activeSpace.isOutliner && <CatalogueBox />}
            {!activeSpace.isOutliner && <PageList />}
            {activeSpace.isOutliner && <TreeView nodeList={nodeList} />} */}
        </Box>

        <Box px3 column gap2 pb3>
          {/* {!isProd && <CreateDemoDatabaseButton></CreateDemoDatabaseButton>} */}

          {/* <SetupGitHubButton /> */}
          <LoginButton />

          {session && (
            <Box>
              <SidebarItem
                gray500
                icon={
                  <Box gray500 inlineFlex>
                    <InfoIcon size={18} />
                  </Box>
                }
                label="Developer"
                onClick={() => {
                  open(
                    'https://docs.penx.io/build-extension/create-first-extension',
                  )
                }}
              />

              <SidebarItem
                gray500
                icon={
                  <Box gray500 inlineFlex>
                    <MessageCircle size={18} />
                  </Box>
                }
                label="Feedback"
                onClick={() => {
                  open('https://github.com/penxio/penx/issues')
                }}
              />
            </Box>
          )}
        </Box>
        {/* <Box px2 toBetween toCenterY pb2>
          {session && !loading && <SyncPopover />}
        </Box> */}
      </Box>
    )
  },
  (prevProps, nextProps) => {
    return prevProps.activeNode?.id === nextProps.activeNode?.id
  },
)
