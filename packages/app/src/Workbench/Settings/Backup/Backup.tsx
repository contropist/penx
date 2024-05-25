import { Box } from '@fower/react'
import { Card, Divider } from 'uikit'
import { useUser } from '@penx/hooks'
import { GitHubBackup } from './GitHubBackup'
import { GoogleBackup } from './GoogleBackup'
import { GoogleVersionRestore } from './GoogleVersionRestore'

export function Backup() {
  const { user } = useUser()

  console.log('=========user:', user)

  if (!user?.raw) return

  return (
    <Box column gap10 flex-1>
      <GoogleBackup />
      {/* <Divider></Divider>
      <GitHubBackup></GitHubBackup> */}
    </Box>
  )
}
