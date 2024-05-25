import { memo } from 'react'
import { Box } from '@fower/react'
import { Avatar, AvatarFallback, AvatarImage } from 'uikit'
import { useSession } from '@penx/session'
import { Logo } from '@penx/widget'
import { SettingsButton } from './SettingsButton'

export const SidebarHeader = memo(function SidebarHeader() {
  const { loading, data } = useSession()

  if (loading) return null

  if (!data) {
    return (
      <Box data-tauri-drag-region mt2 ml3>
        <Box data-tauri-drag-region toCenterY toBetween>
          <Logo size={24} />
          <SettingsButton />
        </Box>
      </Box>
    )
  }

  const image = data.user?.image || ''
  const name = data.user?.name || ''
  const email = data.user?.email || ''

  return (
    <Box data-tauri-drag-region toCenterY gap3 pt4 pl4 p2 mx--8 toBetween>
      <Box data-tauri-drag-region toCenterY gap3>
        <Avatar data-tauri-drag-region size="md" roundedXL>
          <AvatarImage src={image} flexShrink-0 />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <Box data-tauri-drag-region column>
          <Box data-tauri-drag-region textXL>
            {name}
          </Box>
          <Box gray400 textXS>
            @{email}
          </Box>
        </Box>
      </Box>
      <SettingsButton />
    </Box>
  )
})
