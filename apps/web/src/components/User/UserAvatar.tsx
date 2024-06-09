import { Box } from '@fower/react'
import { usePrivy } from '@privy-io/react-auth'
import { Avatar, AvatarFallback, AvatarImage } from 'uikit'
import { useSession } from '@penx/session'

export function UserAvatar() {
  const { data } = useSession()
  if (!data) return null
  const image = ''
  const name = data.google?.name || ''
  const email = data.google?.email || ''

  return (
    <Box toCenterY gap3 column toCenterX mt-40>
      <Avatar size={64}>
        <AvatarImage src={image} flexShrink-0 />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
      <Box column toCenterX>
        <Box text2XL fontBlack>
          {name}
        </Box>
        <Box>@{email}</Box>
      </Box>
    </Box>
  )
}
