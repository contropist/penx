import { clipboard } from '@penxio/api'
import { BaseActionProps } from '../../types'
import { ListActionItem } from './ListActionItem'

interface CopyToClipboardProps extends BaseActionProps {
  content: string
  title?: string
}

export function CopyToClipboard({
  content,
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
