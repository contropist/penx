import { forwardRef, ReactNode, useMemo } from 'react'
import { Command } from 'cmdk'
import { actionMap, detailMap } from '../common/store'
import { IAccessory, IconifyIconType } from '../types'
import { Accessory } from './Accessory'
import { Icon } from './Icon'

interface ListItemProps {
  title: string
  subtitle?: ReactNode
  titleLayout?: 'horizontal' | 'vertical'
  actions?: ReactNode
  detail?: ReactNode
  icon?: IconifyIconType
  accessories?: IAccessory[]
}

export const ListItem = forwardRef<HTMLDivElement, ListItemProps>(function ListItem(
  { title, subtitle, actions, icon, detail, accessories = [], titleLayout = 'horizontal' },
  ref,
) {
  //TODO: title maybe not a string
  useMemo(() => {
    const id = title
    if (actions) actionMap.set(id, actions)
    if (detail) detailMap.set(id, detail)
  }, [title, actions, detail])

  return (
    <Command.Item
      ref={ref}
      value={title}
      onSelect={(item) => {
        console.log('item========:', item)
      }}
      className="cursor-pointer text-neutral-900 data-[selected=true]:bg-neutral-200 dark:text-neutral-300 dark:data-[selected=true]:bg-neutral-800  px-2 py-2 rounded-lg flex items-center justify-between gap-x-3"
    >
      <div className="flex items-center gap-x-2">
        {icon && <Icon icon={icon} />}
        <div
          className={`flex ${titleLayout === 'vertical' ? 'flex-col justify-center gap-y-0' : 'flex-row items-center gap-x-2'}`}
        >
          <div className="text-sm">{title}</div>
          {!!subtitle && <div className="text-neutral-500 text-sm">{subtitle}</div>}
        </div>
      </div>
      <div className="flex items-center gap-x-2">
        {!!accessories.length &&
          accessories.map((accessory, index) => <Accessory key={index} item={accessory} />)}
      </div>
    </Command.Item>
  )
})
