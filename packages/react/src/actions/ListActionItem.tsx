import { PropsWithChildren } from 'react'
import { Command } from 'cmdk'
import { Kbd } from '../components/Kbd'
import { BaseActionProps } from '../types'

interface Props extends BaseActionProps {}

export function ListActionItem({
  shortcut,
  children,
  icon,
}: PropsWithChildren<Props>) {
  return (
    <Command.Item
      // onSelect={(item) => {
      //   console.log('item========:', item)
      // }}
      className="text-neutral-900 cursor-pointer data-[selected=true]:bg-neutral-200 px-2 py-1.5 rounded-lg flex items-center justify-between text-sm"
    >
      <div className="flex items-center gap-1">
        {icon?.name && <span className={`iconify ${icon?.name}`}></span>}
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
