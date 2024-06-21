import { ReactNode } from 'react'
import { clipboard } from 'penx'
import { BaseActionProps } from '../../types'
import { ListActionItem } from './ListActionItem'

interface CopyToClipboardProps extends BaseActionProps {
  title: string
}

export function CopyToClipboard({
  title: content,
  title = 'Copy to Clipboard',
  shortcut,
  icon = { name: 'lucide--copy' },
}: CopyToClipboardProps) {
  return (
    <ListActionItem
      shortcut={shortcut}
      icon={icon}
      onSelect={() => {
        clipboard.writeText(content)
      }}
    >
      {title}
    </ListActionItem>
  )
}
