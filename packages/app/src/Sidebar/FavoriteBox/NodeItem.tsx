import { Box } from '@fower/react'
import { Node } from '@penx/model'
import { NodeService } from '@penx/service'
import { store } from '@penx/store'
import { NodeItemMenu } from './NodeItemMenu'

interface Props {
  node: Node
}

export const NodeItem = ({ node }: Props) => {
  return (
    <Box
      className="nodeItem"
      toCenterY
      gap2
      gray500
      textSM
      h-30
      px2
      bgGray200--hover
      bgGray200--D4--active
      cursorPointer
      rounded
      onClick={() => {
        const nodeService = new NodeService(
          node,
          store.getNodes().map((node) => new Node(node)),
        )

        nodeService.selectNode()
      }}
    >
      <Box flex-1>{node.title || 'Untitled'}</Box>
    </Box>
  )
}
