import { ReactNode } from 'react'
import { clipboard } from 'penx'
import { BaseActionProps } from '../../types'
import { ListActionItem } from './ListActionItem'

interface ItemProps extends BaseActionProps {
  title: string
  onSelect?: () => void
}

export function Item({
  title,
  shortcut,
  icon = { name: 'lucide--cat' },
  onSelect,
}: ItemProps) {
  return (
    <ListActionItem
      shortcut={shortcut}
      icon={icon}
      onSelect={() => {
        onSelect?.()
      }}
    >
      {title}
    </ListActionItem>
  )
}
