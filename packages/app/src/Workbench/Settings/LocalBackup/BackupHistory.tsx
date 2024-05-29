import { Box } from '@fower/react'
import { useQuery } from '@tanstack/react-query'
import { FileEntry, readDir } from '@tauri-apps/api/fs'
import { format } from 'date-fns'
import { get } from 'idb-keyval'
import { LOCAL_AUTO_BACKUP_DIR } from '@penx/constants'
import { RestoreButton } from './RestoreButton'

export const BackupHistory = () => {
  const {
    data = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['local-backup-history'],
    queryFn: async () => {
      const { resolve } = await import('@tauri-apps/api/path')
      let path = await get(LOCAL_AUTO_BACKUP_DIR)

      if (!path) return []

      const backDir = await resolve(path)
      const entries = await readDir(backDir, {
        recursive: true,
      })

      return entries || []
    },
  })

  if (isLoading) return null

  return (
    <Box mb3 gap3 column>
      <Box fontMedium>Backup history</Box>
      <Box column gap1>
        {data.map((entry) => {
          return <Item key={entry.name} entry={entry} />
        })}
      </Box>
    </Box>
  )
}

interface ItemProps {
  entry: FileEntry
}
function Item({ entry }: ItemProps) {
  const isAllJsonReg = /^all-(\d+)\.json$/
  const { name = '' } = entry
  if (!isAllJsonReg.test(name || '')) return null
  const [_, ts] = name.match(isAllJsonReg) || []

  if (!ts) return null

  const date = new Date(Number(ts))

  return (
    <Box toCenterY key={entry.name} toBetween>
      <Box column>
        <Box toCenterY gap2>
          <Box textSM>{entry.name}</Box>
          <Box textXS gray300>
            {format(date, 'yyyy-MM-dd HH:mm:ss')}
          </Box>
        </Box>
      </Box>
      <RestoreButton path={entry.path} />
    </Box>
  )
}
