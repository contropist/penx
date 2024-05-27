import { Box } from '@fower/react'
import { ExtensionItem } from './ExtensionItem'
import { useExtensions } from './useExtensions'

export const PageExtensions = () => {
  const { data = [] } = useExtensions()

  return (
    <Box px={[20, 20]} py={[0, 0, 20]}>
      <Box toCenterY mt2 mb4 gray500 textSM>
        <Box flex-2>Name</Box>
        <Box flex-1>Alias</Box>
        <Box flex-1>Hotkey</Box>
        <Box w-80 toRight>
          Enabled
        </Box>
      </Box>
      <Box column gap2>
        {data.map((extension) => {
          return <ExtensionItem key={extension.id} extension={extension} />
        })}
      </Box>
    </Box>
  )
}
