import { Box } from '@fower/react'
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from '@tauri-apps/api/notification'
import Image from 'next/image'
import { useCurrentCommand } from '~/hooks/useCurrentCommand'
import { ListItemIcon } from './ListItemIcon'

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
      px4
      toBetween
    >
      {currentCommand && (
        <ListItemIcon icon={currentCommand.data.extensionIcon} />
      )}
      {!currentCommand && (
        <Image
          src="/logo/128x128.png"
          alt=""
          width={20}
          height={20}
          style={{ borderRadius: 6 }}
        />
      )}
      <Box data-tauri-drag-region flex-1 h-100p></Box>
      <Box
        textSM
        gray400
        cursorPointer
        onClick={async () => {
          let permissionGranted = await isPermissionGranted()
          if (!permissionGranted) {
            const permission = await requestPermission()
            permissionGranted = permission === 'granted'
          }
          if (permissionGranted) {
            sendNotification('Tauri is awesome!')
            // sendNotification({ title: 'TAURI', body: 'Tauri is awesome!' })
          }
        }}
      >
        CMD+K
      </Box>
    </Box>
  )
}
