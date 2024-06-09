import { Box } from '@fower/react'
import { useHideLogoLoader } from '@penx/hooks'

function PageNotFound() {
  useHideLogoLoader()
  return (
    <Box h-100vh toCenter>
      404 Not Found
    </Box>
  )
}

export default PageNotFound
