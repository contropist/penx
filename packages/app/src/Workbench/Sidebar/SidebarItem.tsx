import { ReactNode } from 'react'
import { Box, FowerHTMLProps } from '@fower/react'

interface SidebarItemProps extends FowerHTMLProps<'div'> {
  label: ReactNode
  icon: ReactNode
  isActive?: boolean
  children?: ReactNode
  onClick: () => void
}

export const SidebarItem = ({
  icon,
  label,
  isActive,
  onClick,
  children,
  ...rest
}: SidebarItemProps) => {
  return (
    <Box
      toCenterY
      toBetween
      roundedXL
      gap2
      px3
      black
      bgNeutral200={isActive}
      bgNeutral800--dark--hover={isActive}
      bgNeutral200--hover
      h10
      cursorPointer
      {...rest}
      onClick={onClick}
    >
      <Box toCenterY gap2 flex-1>
        <Box inlineFlex>{icon}</Box>
        <Box textSM>{label}</Box>
      </Box>
      {children}
    </Box>
  )
}
