import { Box } from '@fower/react'
import { useMutation } from '@tanstack/react-query'
import { Button, Checkbox, Spinner, Tag } from 'uikit'
import { db } from '@penx/local-db'
import { IExtension } from '@penx/model-types'
import { ExtensionCommands } from './ExtensionCommands'
import { ExtensionIcon } from './ExtensionIcon'
import { useExtensions } from './useExtensions'

interface ExtensionItemProps {
  extension: IExtension
}

export function ExtensionItem({ extension }: ExtensionItemProps) {
  const { refetch } = useExtensions()
  const { mutateAsync, isLoading } = useMutation(
    ['extension', extension.id],
    () => db.deleteExtension(extension.id),
  )
  const assets = extension?.assets || {}

  const isBuiltin = extension.slug.startsWith('$penx_builtin_extension')
  const isDeveloping = extension.slug.startsWith('$DEVELOPING-')

  return (
    <Box borderBottom borderNeutral100 pb3>
      <Box toCenterY toBetween>
        <Box toCenterY gap1>
          <ExtensionIcon icon={assets?.[extension.icon!]} />
          <Box>{extension.name}</Box>
          {isDeveloping && (
            <Tag size="sm" variant="light" colorScheme="gray400" ml2>
              Developing
            </Tag>
          )}

          {isBuiltin && (
            <Tag size="sm" variant="light" colorScheme="brand500" ml2>
              Builtin
            </Tag>
          )}
        </Box>
        <Box toCenterY gap1>
          <Button
            size="sm"
            colorScheme="black"
            disabled={isLoading || isBuiltin}
            gap1
            onClick={async () => {
              if (isBuiltin) return
              await mutateAsync()
              refetch()
            }}
          >
            {isLoading && <Spinner />}
            <Box>Uninstall</Box>
          </Button>
        </Box>
      </Box>
      <ExtensionCommands extension={extension} />
    </Box>
  )
}
