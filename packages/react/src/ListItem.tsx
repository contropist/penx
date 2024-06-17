import { forwardRef, ReactNode, useMemo } from 'react'
import { Command } from 'cmdk'
import { actionMap } from './common/actionMap'

interface ListItemProps {
  title: string
  subtitle?: ReactNode
  actions?: ReactNode
}

export const ListItem = forwardRef<HTMLDivElement, ListItemProps>(
  function ListItem({ title, subtitle, actions }, ref) {
    //TODO: title maybe not a string
    useMemo(() => {
      actionMap.set(title, actions)
    }, [title, actions])

    return (
      <Command.Item
        ref={ref}
        value={title}
        onSelect={(item) => {
          console.log('item========:', item)
        }}
        className="text-neutral-900 cursor-pointer data-[selected=true]:bg-neutral-200 px-2 py-1.5 rounded-lg flex items-center gap-x-1"
      >
        <div className="rounded bg-neutral-300 h-5 w-5"></div>
        <div className="flex items-center gap-2">
          <div>{title}</div>
          {!!subtitle && (
            <div className="text-neutral-500 text-sm">{title}</div>
          )}
        </div>
      </Command.Item>
    )
  },
)
