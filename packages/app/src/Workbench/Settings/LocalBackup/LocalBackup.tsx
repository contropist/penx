import { Box } from '@fower/react'
import { BackupHistory } from './BackupHistory'
import { BackupInterval } from './BackupInterval'
import { BackupLocation } from './BackupLocation'

export const LocalBackup = () => {
  return (
    <Box mb3 gap8 column>
      <BackupLocation />
      <BackupInterval />
      <BackupHistory />
    </Box>
  )
}
