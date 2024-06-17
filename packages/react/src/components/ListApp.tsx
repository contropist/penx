import { PropsWithChildren, useRef } from 'react'
import { Command } from 'cmdk'
import { useValue } from '../hooks/useValue'
import { ListAppFooter } from './ListAppFooter'

export const ListApp = ({ children }: PropsWithChildren) => {
  const { value, setValue } = useValue()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listRef = useRef(null)

  return (
    <Command
      className="h-full"
      value={value}
      onValueChange={(v) => {
        setValue(v)
      }}
    >
      <Command.Input
        ref={inputRef}
        autoFocus
        placeholder="Search..."
        className="border-b border-b-neutral-200 w-full outline-none  h-[54] pr-4 pl-[50]"
      />
      <Command.List ref={listRef} className="p-2 h-[376] overflow-auto">
        {children}
      </Command.List>
      <ListAppFooter listRef={listRef} inputRef={inputRef} />
    </Command>
  )
}
