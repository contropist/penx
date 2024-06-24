import { Box } from '@fower/react'
import { Input, Popover, PopoverContent, PopoverTrigger } from 'uikit'
import { IDatabaseNode } from '@penx/model-types'

interface BindingHotkeyProps {}

export const BindingHotkey = ({}: BindingHotkeyProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        {({ isOpen }) => (
          <Input
            size={28}
            textXS
            placeholder="Set Hotkey"
            maxW-160
            borderBrand500={isOpen}
            border
            bgAmber100--i={isOpen}
            // ring-1={isOpen}
          />
        )}
      </PopoverTrigger>
      <PopoverContent p4>
        <Box>Coming soon</Box>
      </PopoverContent>
    </Popover>
  )
}
