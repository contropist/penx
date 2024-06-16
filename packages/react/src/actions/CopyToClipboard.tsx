import { ReactNode } from 'react'
import { BaseActionProps } from '../types'
import { ListActionItem } from './ListActionItem'

interface CopyToClipboardProps extends BaseActionProps {
  content: string
  title?: ReactNode
}

export function CopyToClipboard({
  content,
  title = 'Copy to Clipboard',
  shortcut,
}: CopyToClipboardProps) {
  return <ListActionItem shortcut={shortcut}>{title}</ListActionItem>
}
