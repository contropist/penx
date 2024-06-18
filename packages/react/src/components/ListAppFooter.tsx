import { useEffect, useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Command } from 'cmdk'
import { actionMap } from '../common/store'
import { useOnCmdK } from '../hooks/useOnCmdK'
import { useValue } from '../hooks/useValue'
import { CommandInfo } from './CommandInfo'
import { Kbd } from './Kbd'

interface Props {
  inputRef: React.RefObject<HTMLInputElement>
  listRef: React.RefObject<HTMLElement>
}

export function ListAppFooter({ inputRef, listRef }: Props) {
  const [open, setOpen] = useState(false)
  const { value } = useValue()
  const [content, setContent] = useState<any>()

  useOnCmdK(() => {
    setOpen((isOpen) => {
      return !isOpen
    })
  })

  useEffect(() => {
    if (open) {
      if (actionMap.get(value)) {
        setContent(actionMap.get(value))
      }
      ;(window as any).$__IS_ACTION_OPEN__ = true
    } else {
      ;(window as any).$__IS_ACTION_OPEN__ = false
    }
  }, [open, value])

  // React.useEffect(() => {
  //   const el = listRef.current

  //   if (!el) return

  //   if (open) {
  //     el.style.overflow = 'hidden'
  //   } else {
  //     el.style.overflow = ''
  //   }
  // }, [open, listRef])

  return (
    <div className="flex h-[40] items-center justify-between border-t px-2">
      <CommandInfo />

      <Popover.Root open={open} onOpenChange={setOpen} modal>
        <Popover.Trigger
          className="flex items-center"
          onClick={() => setOpen(true)}
          aria-expanded={open}
        >
          <div
            className={`cursor-pointer hover:bg-neutral-100 py-1 px-2 rounded-md flex items-center gap-x-2 text-sm gap-1 ${open && 'bg-neutral-100'}`}
            onClick={() => setOpen((v) => !v)}
          >
            <div>Actions</div>
            <div className="flex items-start gap-1">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </div>
          </div>
        </Popover.Trigger>
        <Popover.Content
          side="top"
          align="end"
          className="shadow-lg w-[340] rounded-lg overflow-hidden border border-neutral-200 bg-white"
          sideOffset={16}
          alignOffset={0}
          onCloseAutoFocus={(e) => {
            e.preventDefault()
            inputRef?.current?.focus()
          }}
        >
          <Command>
            <Command.List className="p-2">
              <Command.Group>{content}</Command.Group>
            </Command.List>
            <Command.Input
              placeholder="Search for actions..."
              className="border-t border-t-neutral-200 w-full outline-none text-sm h-11 px-4"
            />
          </Command>
        </Popover.Content>
      </Popover.Root>
    </div>
  )
}
