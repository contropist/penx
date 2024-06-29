import { Avatar, AvatarFallback } from 'uikit'

interface AccountAvatarProps {
  size?: number
}
export function AccountAvatar({ size = 24 }: AccountAvatarProps) {
  return (
    <Avatar size={size}>
      <AvatarFallback
        bgGradientX={['red500', 'orange500', 'yellow400']}
        borderNone
      ></AvatarFallback>
    </Avatar>
  )
}
