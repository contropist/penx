import { forwardRef } from 'react'
import { isMobile } from 'react-device-detect'
import { Box } from '@fower/react'
import { Button, modalController, usePopoverContext } from 'uikit'
import { ModalNames, SettingsType } from '@penx/constants'
import { useSidebarDrawer } from '@penx/hooks'
import { IconSettings } from '@penx/icons'
import { useSession } from '@penx/session'
import { store } from '@penx/store'

export const SettingsButton = forwardRef<HTMLDivElement, {}>(
  function SettingsButton({}, ref) {
    const drawer = useSidebarDrawer()
    const { data: session } = useSession()

    if (!session) return null
    return (
      <Box
        inlineFlex
        // opacity-0={[false, false, true]}
        opacity-100--$currentSpace--hover
        onClick={(e) => {
          if (isMobile) {
            store.router.routeTo('SETTINGS')
          } else {
            modalController.open(ModalNames.SETTINGS, {
              type: SettingsType.ACCOUNT_SETTINGS,
            })
          }

          drawer?.close?.()
          e.stopPropagation()
        }}
      >
        <Button
          size={28}
          colorScheme="gray500"
          variant="ghost"
          isSquare
          roundedFull
        >
          <IconSettings size={24} />
        </Button>
      </Box>
    )
  },
)
