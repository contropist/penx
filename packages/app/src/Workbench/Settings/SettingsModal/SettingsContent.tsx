import { Box } from '@fower/react'
import { useModalContext } from 'uikit'
import { SettingsType } from '@penx/constants'
import { RecoveryPhrase } from '../../RecoveryPhrase/RecoveryPhrase'
import { AccountSettings } from '../AccountSettings/AccountSettings'
import { Backup } from '../Backup/Backup'
// import { LocalBackup } from '../LocalBackup/LocalBackup'
import { SpaceSettings } from '../SpaceSettings/SpaceSettings'
import { SyncServer } from '../SyncServer/SyncServer'

export const SettingsContent = () => {
  const { data } = useModalContext<{ type: SettingsType; spaceId?: string }>()
  const { type, spaceId = '' } = data

  return (
    <Box p10 flex-1 overflow={['auto']}>
      {type === SettingsType.ACCOUNT_SETTINGS && <AccountSettings />}
      {type === SettingsType.RECOVERY_PHRASE && <RecoveryPhrase />}
      {/* {type === SettingsType.LOCAL_BACKUP && <LocalBackup />} */}
      {type === SettingsType.SYNC_BACKUP && <Backup />}
      {type === SettingsType.SYNC_SERVER && <SyncServer />}
      {type === SettingsType.SPACE && <SpaceSettings spaceId={spaceId} />}
    </Box>
  )
}
