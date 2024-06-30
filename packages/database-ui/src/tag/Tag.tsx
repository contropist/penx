import { Box } from '@fower/react'
import { useSelected } from 'slate-react'
import { ELEMENT_P } from '@penx/constants'
import { ContextMenu, MenuItem, useContextMenu } from '@penx/context-menu'
// import { TagElement } from '../../types'
import { DatabaseProvider, WithStoreDatabase } from '@penx/database-context'
import { useEditorStatic } from '@penx/editor-common'
import { findNodePath } from '@penx/editor-queries'
import { genId } from '@penx/editor-shared'
import { ElementProps } from '@penx/extension-typings'
import { db } from '@penx/local-db'
import { useNodes } from '@penx/node-hooks'
import { store } from '@penx/store'
import { TagForm } from './TagForm'

export const Tag = ({ element, attributes, children }: ElementProps<any>) => {
  const editor = useEditorStatic()

  let selected = useSelected()
  const { nodeList } = useNodes()
  const node = nodeList.nodeMap.get(element.databaseId)!
  const isInDatabase = (editor.children?.[0] as any)?.type === ELEMENT_P

  const menuId = `tag-menu-${genId()}`
  const { show } = useContextMenu(menuId)

  async function clickTag() {
    const database = await db.getNode(element.databaseId)
    if (database) {
      store.node.selectNode(database)
    }
  }

  const path = findNodePath(editor, element)!

  const tagJSX = (
    <Box
      contentEditable={false}
      cursorPointer
      fontNormal
      py1
      px1
      leadingNone
      textXS
      bg--T92={node?.tagColor}
      bg--T88--hover={node?.tagColor}
      color={node?.tagColor}
      color--D4--hover={node?.tagColor}
      onClick={clickTag}
      onContextMenu={(e) => {
        if (isInDatabase) return
        show(e)
      }}
    >
      # {node?.tagName}
    </Box>
  )

  if (editor.isReadonly) {
    return (
      <Box inlineFlex bgGray200 textXS py-2 px1 rounded>
        # {element.name}
      </Box>
    )
  }

  return (
    <Box
      {...attributes}
      toCenterY
      inlineFlex
      bgGray100
      rounded
      mx-1
      overflowHidden
      ringBrand500={selected}
      contentEditable={false}
    >
      {children}
      {tagJSX}

      <WithStoreDatabase databaseId={element.databaseId}>
        {(databaseInfo) => (
          <DatabaseProvider {...databaseInfo}>
            <ContextMenu id={menuId} w-400>
              <TagForm databaseId={element.databaseId} path={path} />
            </ContextMenu>
          </DatabaseProvider>
        )}
      </WithStoreDatabase>
    </Box>
  )
}
