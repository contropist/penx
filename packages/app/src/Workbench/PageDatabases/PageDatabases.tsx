import { Box } from '@fower/react'
import { Node } from '@penx/model'
import { IDatabaseNode } from '@penx/model-types'
import { store } from '@penx/store'
import { AddDatabase } from './AddDatabase'
import { BindingHotkey } from './BindingHotKey'
import { SetAlias } from './SetAlias'
import { useDatabases } from './useDatabases'

interface ExtensionItemProps {
  database: IDatabaseNode
}

function DatabaseItem({ database }: ExtensionItemProps) {
  return (
    <Box rounded2XL toCenterY>
      <Box
        toCenterY
        flex-1
        gap1
        brand500--hover
        cursorPointer
        onClick={() => {
          store.node.selectNode(database)
        }}
      >
        <Box circle5 white toCenter bg={database.props.color}>
          #
        </Box>
        <Box textXL fontSemibold>
          {database.props.name}
        </Box>
      </Box>

      <Box flex-1>
        <SetAlias database={database} />
      </Box>
      <Box flex-1>
        <BindingHotkey database={database} />
      </Box>
    </Box>
  )
}

export const PageDatabases = () => {
  const { data = [] } = useDatabases()
  return (
    <Box px={[20, 20]} pt5>
      <Box toCenterY mt2 mb4 gray500 textSM>
        <Box flex-1>Name</Box>
        <Box flex-1>Alias</Box>
        <Box flex-1>Hotkey</Box>
      </Box>
      <Box column gap4 toCenterY flexWrap>
        {data.map((database) => {
          const node = new Node(database)
          if (node.isSpecialDatabase) return null

          return <DatabaseItem key={database.id} database={database} />
        })}
      </Box>

      <Box mt4>
        <AddDatabase />
      </Box>
    </Box>
  )
}
