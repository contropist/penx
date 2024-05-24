import { forwardRef } from 'react'
import { Box, styled } from '@fower/react'
import { Drawer } from 'vaul'
import {
  Button,
  Input,
  Modal,
  MODAL_OVERLAY_Z_INDEX,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalTrigger,
} from 'uikit'
import { IconGoogle } from '@penx/icons'
import { CloudBackupForm } from './CloudBackupForm'

const DrawerOverlay = styled(Drawer.Overlay)
const DrawerContent = styled(Drawer.Content)

function Content() {
  return (
    <>
      <ModalHeader mb2>Create a password to secure your backup</ModalHeader>

      <Box gray500>
        This password is not recoverable, Make sure you choose a password you
        {"'"}ll remember.
      </Box>
      <CloudBackupForm />
    </>
  )
}

const Trigger = forwardRef(function Trigger({}, ref) {
  return (
    <Button ref={ref} colorScheme="black" size={56} gapX2 w-280 toBetween>
      <IconGoogle size={24} />
      <Box textBase fontSemibold>
        Backup to Google drive
      </Box>
    </Button>
  )
})

export function CloudBackupDrawer() {
  return (
    <Drawer.NestedRoot>
      <DrawerOverlay fixed bgBlack--T60 zIndex-100 css={{ inset: 0 }} />
      <Drawer.Trigger asChild>
        <Box>
          <Trigger />
        </Box>
      </Drawer.Trigger>

      <Drawer.Overlay />
      <Drawer.Portal>
        <DrawerContent
          overflowHidden
          bgWhite
          column
          roundedTop2XL
          outlineNone
          shadow="0 -4px 20px 0 rgba(0, 0, 0, 0.2)"
          // h={`calc(100vh - 40px)`}
          // h-92vh
          fixed
          bottom-0
          left-0
          right-0
          zIndex-101
          p6
        >
          <Content />
        </DrawerContent>
        <Drawer.Overlay />
      </Drawer.Portal>
    </Drawer.NestedRoot>
  )
}

export const CloudBackupModal = () => {
  return (
    <Modal>
      <ModalOverlay zIndex={MODAL_OVERLAY_Z_INDEX + 1} />
      <ModalTrigger>
        <Trigger />
      </ModalTrigger>
      <ModalContent w={['100%', 500]} column gap4>
        <ModalCloseButton />
        <Content />
      </ModalContent>
    </Modal>
  )
}
