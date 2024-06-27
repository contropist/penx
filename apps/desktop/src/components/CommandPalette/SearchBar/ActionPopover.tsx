import { useEffect, useState } from 'react'
import { Box } from '@fower/react'
import { Kbd, Popover, PopoverContent, PopoverTrigger } from 'uikit'
import { appEmitter } from '@penx/event'
import { handleSelect } from '~/common/handleSelect'
import { useCommandAppUI } from '~/hooks/useCommandAppUI'
import { useCommandPosition } from '~/hooks/useCommandPosition'
import { useCurrentCommand } from '~/hooks/useCurrentCommand'
import { useItems } from '~/hooks/useItems'
import { useValue } from '~/hooks/useValue'
import {
  StyledCommand,
  StyledCommandGroup,
  StyledCommandInput,
  StyledCommandList,
} from './../CommandComponents'
import { CommandAppActions } from './CommandAppActions'
import { RootActions } from './RootActions'

function useOnCmdK(fn: () => void) {
  useEffect(() => {
    function listener(e: KeyboardEvent) {
      if (e.key === 'k' && e.metaKey) {
        e.preventDefault()
        fn()
      }
    }

    document.addEventListener('keydown', listener)

    return () => {
      document.removeEventListener('keydown', listener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

interface Props {}

export const ActionPopover = ({}: Props) => {
  const { currentCommand } = useCurrentCommand()
  const [open, setOpen] = useState(false)
  const { value } = useValue()
  const { items } = useItems()
  const { isRoot } = useCommandPosition()
  const { ui } = useCommandAppUI()

  const selectItem = items.find((item) => item.data.commandName === value)

  useOnCmdK(() => {
    setOpen((o) => {
      if (o) appEmitter.emit('FOCUS_SEARCH_BAR_INPUT')
      return !o
    })
  })

  return (
    <Popover
      isOpen={open}
      onOpenChange={(v) => {
        setOpen(v)
        if (!v) {
          appEmitter.emit('FOCUS_SEARCH_BAR_INPUT')
        }
      }}
      placement="top-end"
      offset={{ mainAxis: 20 }}
    >
      <PopoverTrigger>
        <Box
          textSM
          cursorPointer
          neutral600
          bgNeutral200--T60={open}
          py-4
          pr-4
          pl2
          rounded-6
          toCenterY
          gap2
          onClick={() => {
            setOpen((o) => !o)
          }}
        >
          <Box>Actions</Box>
          <Box toCenterY gap1>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </Box>
        </Box>
      </PopoverTrigger>
      <PopoverContent className="action-menu" shadow2XL border borderNeutral200--T30>
        <StyledCommand w-320>
          <StyledCommandList
            p2
            overflowAuto
            css={{
              overscrollBehavior: 'contain',
              transition: '100ms ease',
              transitionProperty: 'height',
            }}
          >
            <StyledCommandGroup
              heading={
                currentCommand?.data?.commandName || (selectItem?.title as string) || 'Actions'
              }
            >
              {ui?.type === 'render' && (
                <CommandAppActions
                  onSelect={() => {
                    setOpen(false)
                  }}
                />
              )}

              {isRoot && (
                <RootActions
                  onSelect={() => {
                    selectItem && handleSelect(selectItem)
                    setOpen(false)
                  }}
                />
              )}
            </StyledCommandGroup>
          </StyledCommandList>
          <StyledCommandInput placeholder="Search for actions..." />
        </StyledCommand>
      </PopoverContent>
    </Popover>
  )
}
