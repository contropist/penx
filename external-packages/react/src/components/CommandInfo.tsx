import { useEffect } from 'react'
import { Icon } from './Icon'

export function CommandInfo() {
  // TODO: handle any
  const command = (window as any).__COMMAND__

  if (!command) return null

  return (
    <div className="flex items-center gap-x-1">
      <Icon icon={command?.icon} />
      <div className="text-sm text-neutral-600">{command?.title}</div>
    </div>
  )
}
