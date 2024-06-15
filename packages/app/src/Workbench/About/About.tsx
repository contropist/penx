import { Box } from '@fower/react'
import { Logo } from '@penx/widget'

interface Props {}

export const About = ({}: Props) => {
  return (
    <Box w-100p h-100p column toCenter gap4>
      <Logo />
      <Box textXL neutral600>
        A cross-platform productivity App
      </Box>
    </Box>
  )
}
