import { useEffect } from 'react'
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  modalController,
  ModalOverlay,
} from 'uikit'
import { ModalNames, SettingsType } from '@penx/constants'
import { SettingsContent } from './SettingsContent'
import { SettingsSidebar } from './SettingsSidebar'

export const SettingsModal = () => {
  return (
    <Modal name={ModalNames.SETTINGS}>
      <ModalOverlay />
      <ModalContent
        w={['100%', '100%', '90%', 1000, 1200]}
        mx-auto
        toBetween
        p0--i
        // h={['100%', '100%', 800]}
        h={[760]}
        flexDirection={['column', 'column', 'row']}
        overflowHidden
      >
        <ModalCloseButton />
        <SettingsSidebar />
        <SettingsContent />
      </ModalContent>
    </Modal>
  )
}
