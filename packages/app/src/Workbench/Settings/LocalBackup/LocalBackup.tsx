import { useEffect } from 'react'
import { Box } from '@fower/react'
import { useQuery } from '@tanstack/react-query'
import { open } from '@tauri-apps/api/dialog'
import { BaseDirectory, createDir, writeTextFile } from '@tauri-apps/api/fs'
import { get, set } from 'idb-keyval'
import { Button } from 'uikit'
import { LOCAL_AUTO_BACKUP_DIR } from '@penx/constants'
import { BackupHistory } from './BackupHistory'
import { BackupInterval } from './BackupInterval'

const DEFAULT_BACKUP_DIR = 'penx-auto-backup'

export const LocalBackup = () => {
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
    <Box mb3 gap3 column>
      <Box fontBold>Local auto backup.</Box>
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

      <BackupInterval />
      <BackupHistory />
    </Box>
  )
}
