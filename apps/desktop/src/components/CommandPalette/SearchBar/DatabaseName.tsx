import { Box } from '@fower/react'
import { useCurrentDatabase } from '~/hooks/useCurrentDatabase'

export const DatabaseName = () => {
  const { database } = useCurrentDatabase()
  return (
    <Box
      h-30
      roundedFull
      px3
      bg={database.props.color}
      toCenter
      mr--8
      ml3
      white
      textXS
    >
      # {database.props.name}
    </Box>
  )
}
