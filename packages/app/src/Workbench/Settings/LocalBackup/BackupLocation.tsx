import { Box } from '@fower/react'
import { useQuery } from '@tanstack/react-query'
import { open } from '@tauri-apps/api/dialog'
import { BaseDirectory, createDir } from '@tauri-apps/api/fs'
import { get, set } from 'idb-keyval'
import { Button } from 'uikit'
import { LOCAL_AUTO_BACKUP_DIR } from '@penx/constants'

const DEFAULT_BACKUP_DIR = 'penx-auto-backup'

export const BackupLocation = () => {
  const { data = '', refetch } = useQuery({
    queryKey: [LOCAL_AUTO_BACKUP_DIR],
    queryFn: async () => {
      const { documentDir } = await import('@tauri-apps/api/path')
      let path = await get(LOCAL_AUTO_BACKUP_DIR)
      if (!path) {
        await createDir('penx-auto-backup', {
          dir: BaseDirectory.Document,
          recursive: true,
        })
        const documentDirPath = await documentDir()
        path = documentDirPath + DEFAULT_BACKUP_DIR
        set(LOCAL_AUTO_BACKUP_DIR, path)
      }
      return path || ''
    },
  })

  return (
    <Box gap4 column>
      <Box fontMedium>Local Auto-Backup Location</Box>
      <Box neutral500 textSM>
        A backup file of all data is automatically created.
      </Box>

      <Box bgNeutral100 border rounded h-40 toCenterY px3>
        {data}
      </Box>
      <Box>
        <Button
          colorScheme="white"
          onClick={async () => {
            const { documentDir, homeDir } = await import(
              '@tauri-apps/api/path'
            )
            try {
              const selected = await open({
                multiple: false,
                directory: true,
                defaultPath: await documentDir(),
                filters: [],
              })

              await set(LOCAL_AUTO_BACKUP_DIR, selected as string)
              refetch()
            } catch (err) {
              console.error(err)
            }
          }}
        >
          Change Location
        </Button>
      </Box>
    </Box>
  )
}
