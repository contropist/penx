import { useMemo } from 'react'
import { Box } from '@fower/react'
import { usePrivy } from '@privy-io/react-auth'
import { Avatar, AvatarFallback, AvatarImage, Button } from 'uikit'

export function UserProfile() {
  const { user, logout } = usePrivy()

  if (!user) return null

  return (
    <Box p-60 column toLeft toBetween h-100vh>
      <Box column toCenterX gap4>
        <Avatar size={120}>
          <AvatarImage />
          <AvatarFallback bgGradientX={['red500', 'orange500', 'yellow400']}>
            {user.google?.name || 'X'}
          </AvatarFallback>
        </Avatar>
        <Box>{user.google?.name}</Box>
      </Box>
      <Box>
        <Button
          colorScheme="red500"
          variant="outline"
          onClick={() => {
            logout()
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  )
}
