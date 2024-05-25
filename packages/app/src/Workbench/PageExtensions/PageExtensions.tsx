import { Box } from '@fower/react'
import { ExtensionItem } from './ExtensionItem'
import { useExtensions } from './useExtensions'

export const PageExtensions = () => {
  const { data = [] } = useExtensions()

  return (
    <Box px={[20, 20]} py={[0, 0, 20]}>
      <Box column gap2>
        {data.map((extension) => {
          return <ExtensionItem key={extension.id} extension={extension} />
        })}
      </Box>
    </Box>
  )
}
