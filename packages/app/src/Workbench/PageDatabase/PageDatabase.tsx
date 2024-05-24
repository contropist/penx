import { Box } from '@fower/react'
import { Node } from '@penx/model'
import { IDatabaseNode } from '@penx/model-types'
import { store } from '@penx/store'
import { AddDatabase } from './AddDatabase'
import { useDatabases } from './useDatabases'

interface ExtensionItemProps {
  database: IDatabaseNode
}

function DatabaseItem({ database }: ExtensionItemProps) {
  return (
    <Box
      text2XL
      fontBold
      cursorPointer
      ring-2--hover
      h-120
      w-200
      rounded2XL
      toCenter
      column
      toCenterY
      shadowPopover
      onClick={() => {
        store.node.selectNode(database)
      }}
    >
      <Box fontSemibold>{database.props.name}</Box>
    </Box>
  )
}

export const PageDatabase = () => {
  const { data = [] } = useDatabases()
  return (
    <Box px={[20, 20]} py={[0, 0, 40]}>
      <Box mx-auto pb6 column gap3>
        <Box fontBold text4XL>
          Databases
        </Box>
      </Box>

      <Box gap4 toCenterY flexWrap>
        {data.map((database) => {
          const node = new Node(database)
          if (
            node.tagName.startsWith('$template__') ||
            ['__TODO__', '__FILE__'].includes(node.tagName)
          ) {
            return null
          }

          return <DatabaseItem key={database.id} database={database} />
        })}

        <AddDatabase />
      </Box>
    </Box>
  )
}
