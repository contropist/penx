import { memo } from 'react'
import { Box } from '@fower/react'
import { ChevronDown, LogOut } from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'uikit'
import { appEmitter } from '@penx/event'
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

  // const image = data.user?.image || ''
  // const name = data.user?.name || ''
  // const email = data.user?.email || ''

  const image = ''
  const name = ''
  const email = ''

  return (
    <Box data-tauri-drag-region toCenterY gap3 pt4 pl4 pr1 mx--8 toBetween>
      <Box data-tauri-drag-region toCenterY gap3>
        <Avatar data-tauri-drag-region size="sm">
          <AvatarImage src={image} flexShrink-0 />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <Box data-tauri-drag-region column gap1>
          <Box data-tauri-drag-region>{name}</Box>
          <Box gray400 textXS>
            {email}
          </Box>
        </Box>
      </Box>
      {/* <SettingsButton /> */}
      <Popover>
        <PopoverTrigger>
          <Button
            size={28}
            colorScheme="gray500"
            variant="ghost"
            isSquare
            roundedFull
          >
            <ChevronDown size={24} />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Button
            variant="ghost"
            w-100p
            colorScheme="gray600"
            gap2
            // display={['none', 'none', 'flex']}
            onClick={async () => {
              // await disconnectAsync()
              // disconnect()
              appEmitter.emit('SIGN_OUT')
            }}
          >
            <Box inlineFlex>
              <LogOut size={16} />
            </Box>
            <Box>Sign out</Box>
          </Button>
        </PopoverContent>
      </Popover>
    </Box>
  )
})
