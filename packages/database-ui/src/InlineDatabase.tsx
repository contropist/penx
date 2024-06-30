import { Box } from '@fower/react'
import { Divider } from 'uikit'
import { DATABASE_TOOLBAR_HEIGHT } from '@penx/constants'
import { DatabaseProvider, WithStoreDatabase } from '@penx/database-context'
import { Node } from '@penx/model'
import { ViewList } from './ViewNav/ViewList'
import { TableView } from './views/TableView/TableView'
import { ViewToolBar } from './ViewToolBar/ViewToolBar'

interface Props {
  node: Node
}

export const InlineDatabase = ({ node }: Props) => {
  return (
    <WithStoreDatabase databaseId={node.id}>
      {(databaseInfo) => (
        <DatabaseProvider {...databaseInfo}>
          <Box toLeft column gap0>
            <Box toCenterY gap8 h={DATABASE_TOOLBAR_HEIGHT} mb2 px4>
              <Box toCenterY gap2>
                <ViewList />
                {/* <AddViewBtn /> */}
              </Box>
              <Divider h-20 orientation="vertical" />
              <ViewToolBar />
            </Box>
            <Box w-100p border>
              <TableView height={300} width="100%" />
            </Box>
          </Box>
        </DatabaseProvider>
      )}
    </WithStoreDatabase>
  )
}
