import { PropsWithChildren } from 'react'
import { Command } from 'cmdk'
import { emitter } from '../../emitter'
import { BaseActionProps } from '../../types'
import { Icon } from '../Icon'
import { Kbd } from '../Kbd'

interface Props extends Omit<BaseActionProps, 'title'> {}

export function ListActionItem({
  shortcut,
  children,
  icon,
  onSelect,
  ...rest
}: PropsWithChildren<Props>) {
  return (
    <Command.Item
      className="text-neutral-900 cursor-pointer data-[selected=true]:bg-neutral-200 px-2 py-2 rounded-lg flex items-center justify-between text-sm"
      {...rest}
      onSelect={(item) => {
        onSelect?.(item as any)
        emitter.emit('ON_ACTION_SELECT')
      }}
    >
      <div className="flex items-center gap-1 text-sm">
        {icon?.name && <Icon icon={icon} />}
        <div>{children}</div>
      </div>
      {shortcut && (
        <div className="flex items-center justify-between gap-x-1">
          {shortcut.modifiers.map((modifier, i) => (
            <Kbd key={i}>{modifier}</Kbd>
          ))}
          <Kbd>{shortcut.key}</Kbd>
        </div>
      )}
    </Command.Item>
  )
}
