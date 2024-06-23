import { Box, styled } from '@fower/react'
import { Drawer } from 'vaul'
import { SettingsType } from '@penx/constants'
import { useSettingDrawer } from '@penx/hooks'
import { RecoveryPhrase } from '../../RecoveryPhrase/RecoveryPhrase'
import { SpaceSettings } from '../SpaceSettings/SpaceSettings'

const DrawerOverlay = styled(Drawer.Overlay)
const DrawerContent = styled(Drawer.Content)

export const SettingsDrawer = () => {
  const { isOpen, type, spaceId, close, open } = useSettingDrawer()

  return (
    <Drawer.Root
      shouldScaleBackground
      open={isOpen}
      // modal={false}
      onOpenChange={(o) => {
        if (o) {
          open(type, spaceId)
        } else {
          close()
        }
      }}
    >
      <Drawer.Portal>
        <DrawerOverlay fixed bgBlack--T60 zIndex-100 css={{ inset: 0 }} />
        <DrawerContent
          style={{
            pointerEvents: 'auto',
          }}
          overflowHidden
          bgWhite
          column
          roundedTop2XL
          outlineNone
          shadow="0 -4px 20px 0 rgba(0, 0, 0, 0.2)"
          // h={`calc(100vh - 40px)`}
          h-92vh
          fixed
          bottom-0
          left-0
          right-0
          zIndex-101
          p6

          // overflowHidden
        >
          {type === SettingsType.RECOVERY_PHRASE && <RecoveryPhrase />}
          {type === SettingsType.SPACE && <SpaceSettings spaceId={spaceId} />}
        </DrawerContent>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
