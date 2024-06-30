import { Box } from '@fower/react'
import { Divider } from 'uikit'
import { DATABASE_TOOLBAR_HEIGHT, WORKBENCH_NAV_HEIGHT } from '@penx/constants'
import { DatabaseProvider, WithStoreDatabase } from '@penx/database-context'
import { Node } from '@penx/model'
import { TagMenu } from './TagMenu/TagMenu'
import { ViewList } from './ViewNav/ViewList'
import { TableView } from './views/TableView/TableView'
import { ViewToolBar } from './ViewToolBar/ViewToolBar'

interface Props {
  node: Node
}

export const FullPageDatabase = ({ node }: Props) => {
  return (
    <WithStoreDatabase databaseId={node.id}>
      {(databaseInfo) => (
        <DatabaseProvider {...databaseInfo}>
          <Box toLeft column px={[0, 0, 12]} gap0>
            <Box w-100p toCenterY toBetween gap8 h={DATABASE_TOOLBAR_HEIGHT}>
              <Box toCenterY gap2>
                <TagMenu />
                <ViewList />
                {/* <AddViewBtn /> */}
              </Box>
              <Divider h-20 orientation="vertical" />
              <ViewToolBar />
            </Box>
            <TableView
              height={`calc(100vh - ${WORKBENCH_NAV_HEIGHT + DATABASE_TOOLBAR_HEIGHT + 2}px)`}
            />
          </Box>
        </DatabaseProvider>
      )}
    </WithStoreDatabase>
  )
}
