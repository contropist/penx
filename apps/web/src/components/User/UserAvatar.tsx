import { Box } from '@fower/react'
import { useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from 'uikit'

export function UserAvatar() {
  const { data } = useSession()
  if (!data) return null
  const image = data.user?.image || ''
  const name = data.user?.name || ''
  const email = data.user?.email || ''

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
