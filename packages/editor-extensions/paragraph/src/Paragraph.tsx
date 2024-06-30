import { Box } from '@fower/react'
import { Node, Path } from 'slate'
import { useEditor, useEditorStatic } from '@penx/editor-common'
import { findNodePath, getNodeByPath } from '@penx/editor-queries'
import { ElementProps } from '@penx/extension-typings'

export const Paragraph = ({
  attributes,
  element,
  children,
  nodeProps,
}: ElementProps) => {
  const editor = useEditorStatic()
  // const editor = useEditor()
  const path = findNodePath(editor, element)!
  const parent = Path.parent(path)
  const node: any = getNodeByPath(editor, parent)

  const isInTitle = node?.type === 'title'

  return (
    <Box
      leadingNormal
      // gray900
      text={isInTitle ? false : [17, 17, 16]}
      relative
      py={[2]}
      // h-100p
      {...attributes}
      {...(nodeProps || {})}
    >
      {children}
    </Box>
  )
}
