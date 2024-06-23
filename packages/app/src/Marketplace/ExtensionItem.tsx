import { Box } from '@fower/react'
import { DownloadCloudIcon } from 'lucide-react'
import { Button, toast } from 'uikit'
import { useActiveSpace } from '@penx/hooks'
import { db } from '@penx/local-db'
import { store } from '@penx/store'
import { extensionAtom } from './hooks/useExtension'
import { useInstalledExtensions } from './hooks/useInstalledExtension'

interface ExtensionItemProps {
  selected: boolean
  extension: any
}
export function ExtensionItem({ selected, extension }: ExtensionItemProps) {
  const { activeSpace } = useActiveSpace()
  const { extensions } = useInstalledExtensions()
  const isInstalled = extensions.find((e) => e.name === extension.name)

  async function install() {
    await db.installExtension({
      spaceId: activeSpace.id,
      name: extension.name,
      title: extension.title,
      description: extension.description!,
      version: extension.version,
    })

    toast.success(`Extension ${extension.name} installed`)
  }

  return (
    <Box
      bgWhite
      p3
      roundedLG
      column
      gap2
      cursorPointer
      ringBrand500-2={selected}
      onClick={() => {
        store.set(extensionAtom, extension)
      }}
    >
      <Box textLG fontBold>
        {extension.name}
      </Box>

      <Box gray500 textXS>
        By 0xZion
      </Box>
      <Box gray500>{extension.description}</Box>
      <Box toBetween toCenterY>
        <Box textSM gray500 toCenterY gap1>
          <DownloadCloudIcon size={16} />
          <Box>6,3434</Box>
        </Box>

        {isInstalled && (
          <Button size={24} variant="light" colorScheme="gray800" disabled>
            Installed
          </Button>
        )}

        {!isInstalled && (
          <Button size={24} variant="light" onClick={install}>
            Install
          </Button>
        )}
      </Box>
    </Box>
  )
}
