/**
 * ⌥ -> lef option
 * ⎇ -> right option
 * ⇧ -> shift
 * ⌘ -> command
 * ↵ -> enter
 * ⌃ -> control
 * ⌦ -> delete
 */

import { PropsWithChildren } from 'react'

interface Props {}

const map: Record<string, string> = {
  Control: '⌃',
  Meta: '⌘',
  Command: '⌘',
  Shift: '⇧',
  Alt: '⌥',

  ctrl: '⌃',
  meta: '⌘',
  cmd: '⌘',
  shift: '⇧',
  alt: '⌥',
  enter: '↵',
}

export const Kbd = ({ children, ...rest }: PropsWithChildren<Props>) => {
  const modifierKey = map[children as any]
  return (
    <kbd
      className="bg-neutral-300 text-neutral-600 h-5 min-w-5 px-1 rounded flex items-center justify-center text-xs"
      style={{
        fontFamily:
          "'Inter', --apple-system, BlinkMacSystemFont, Segoe UI, Roboto,Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
      }}
      {...rest}
    >
      {!modifierKey && children}
      {!!modifierKey && modifierKey}
    </kbd>
  )
}
