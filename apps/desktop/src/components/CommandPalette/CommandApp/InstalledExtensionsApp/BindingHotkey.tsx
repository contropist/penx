import { Box } from '@fower/react'
import { Kbd, Popover, PopoverContent, PopoverTrigger } from 'uikit'
import { Command } from '@penx/model'
import { IExtension } from '@penx/model-types'
import { BindingHotkeyContent } from './BindingHotkeyContent'

interface BindingHotkeyProps {
  command: Command
  extension?: IExtension
}

export const BindingHotkey = (props: BindingHotkeyProps) => {
  const { command } = props

  return (
    <Popover placement="top">
      <PopoverTrigger>
        {({ isOpen }) => (
          <Box
            h-28
            rounded-4
            textXS
            neutral400
            maxW-160
            border
            px2
            borderBrand500={isOpen}
            toCenterY
          >
            {command.hotkey && (
              <Box toCenterX gap1>
                {command.hotkey.map((key) => (
                  <Kbd key={key} bgNeutral200--T40>
                    {key}
                  </Kbd>
                ))}
              </Box>
            )}
            {!command.hotkey && 'Set Hotkey'}
          </Box>
        )}
      </PopoverTrigger>
      <PopoverContent p4>
        <BindingHotkeyContent {...props} />
      </PopoverContent>
    </Popover>
  )
}
