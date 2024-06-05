import { Box } from '@fower/react'
import { invoke } from '@tauri-apps/api/tauri'
import { Plus } from 'lucide-react'
import { Button } from 'uikit'
import { db } from '@penx/local-db'
import { store } from '@penx/store'
import { currentDatabaseAtom } from '~/hooks/useCurrentDatabase'
import { isAddRowAtom } from '~/hooks/useIsAddRow'
import { useMode } from '~/hooks/useMode'

interface Props {}

export const AddRowButton = ({}: Props) => {
  const { isEditor, setMode } = useMode()
  return (
    <Button
      size={36}
      colorScheme="white"
      absolute
      right2
      roundedFull
      toCenterY
      gap1
      onClick={async () => {
        const { WebviewWindow, appWindow } = await import(
          '@tauri-apps/api/window'
        )
        setMode('EDITOR')

        await invoke('set_window_properties', {
          resizable: true,
          width: 1000.0,
          height: 800.0,
          focus: true,
        })

        await appWindow.center()
        setTimeout(async () => {
          appWindow.setFocus()

          const database = store.get(currentDatabaseAtom)

          let nodes = await db.listNodesBySpaceId(database.spaceId)
          store.node.setNodes(nodes)
          store.node.selectNode(database)
        }, 0)
      }}
    >
      <Box inlineFlex>
        <Plus size={16}></Plus>
      </Box>
      <Box>Add Row</Box>
    </Button>
  )
}
