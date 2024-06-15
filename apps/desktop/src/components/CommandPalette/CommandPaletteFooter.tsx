import { useState } from 'react'
import { Box } from '@fower/react'
import { appEmitter } from '@penx/event'
import { IconLogo } from '@penx/icons'
import { useCurrentCommand } from '~/hooks/useCurrentCommand'
import { ListItemIcon } from './ListItemIcon'
import { ActionPopover } from './SearchBar/ActionPopover'

interface Props {
  footerHeight: number
}

export const CommandPaletteFooter = ({ footerHeight }: Props) => {
  const { currentCommand } = useCurrentCommand()
  return (
    <Box
      data-tauri-drag-region
      h={footerHeight}
      borderTop
      borderNeutral200
      // bg="#F2ECEA"
      // bgWhite
      toCenterY
      px3
      toBetween
    >
      {currentCommand && currentCommand.data.extensionIcon ? (
        <ListItemIcon icon={currentCommand.data.extensionIcon} />
      ) : (
        <IconLogo fillBlack stroke="black" />
      )}
      <Box
        data-tauri-drag-region
        flex-1
        h-100p
        onClick={() => {
          appEmitter.emit('FOCUS_SEARCH_BAR_INPUT')
        }}
      ></Box>

      <ActionPopover />
    </Box>
  )
}
