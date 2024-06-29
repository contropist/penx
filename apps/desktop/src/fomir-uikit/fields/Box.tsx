import { css, Box as FowerBox } from '@fower/react'
import { NodeProps } from 'fomir'
import type { BoxNode } from '../fomir-uikit-node'

export const Box = ({ node }: NodeProps<BoxNode>) => {
  if (!node.visible) return null

  return (
    <FowerBox className={css(node.css || '')}>
      {node.text ? node.text : node.renderChildren?.(node)}
    </FowerBox>
  )
}
