import { Box } from '@fower/react'
import { Logo } from '@penx/widget'

export function AboutApp() {
  return (
    <Box w-100p h-100p column toCenter gap4 absolute top0 right0 left0 bottom0>
      <Logo />
      <Box textXL neutral600>
        A cross-platform productivity App
      </Box>
    </Box>
  )
}
