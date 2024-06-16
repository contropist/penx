import { forwardRef, PropsWithChildren } from 'react'

interface ActionPanelProps {
  title?: string
}

export const ActionPanel = forwardRef<
  HTMLDivElement,
  PropsWithChildren<ActionPanelProps>
>(function ListItem({ children }, ref) {
  return <div>{children}</div>
})
