import { useEffect } from 'react'
import { Box } from '@fower/react'
import { useMutation } from '@tanstack/react-query'
import { Button, Checkbox, Divider } from 'uikit'
import { db } from '@penx/local-db'
import { useValue } from '~/hooks/useValue'
import { StyledCommandGroup } from '../../CommandComponents'
import { ListItemIcon } from '../../ListItemIcon'
import { BindingHotkey } from './BindingHotkey'
import { ExtensionItem } from './ExtensionItem'
import { SetAlias } from './SetAlias'
import { useExtensions } from './useExtensions'

export function InstalledExtensionsApp() {
  const { data = [] } = useExtensions()
  return (
    <Box absolute top0 left0 right0 bottom0 toLeft>
      <StyledCommandGroup p2 overflowAuto relative w-300>
        {data.map((extension) => {
          return <ExtensionItem key={extension.id} extension={extension} />
        })}
      </StyledCommandGroup>
      <Divider orientation="vertical" />
      <Detail />
    </Box>
  )
}

function Detail() {
  const { value, setValue } = useValue()
  const { data = [] } = useExtensions()
  const extension = data.find((item) => item.id === value)

  const { refetch } = useExtensions()
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['uninstall-extension'],
    mutationFn: (id: string) => db.deleteExtension(id),
  })

  useEffect(() => {
    if (!extension && data.length) {
      setValue(data[0].id)
    }
  }, [extension, setValue, data])

  if (!extension) return <Box flex-1></Box>

  const isBuiltin = extension.name.startsWith('$penx_builtin_extension')

  return (
    <Box flex-1 overflowAuto p3 column gap1>
      <Box flex-1>
        {extension.commands.map((command) => {
          return (
            <Box key={command.name} toCenterY gap2>
              <Box flex-2 toCenterY gap1 pl-6>
                <ListItemIcon icon={command.icon || extension.icon} />

                <Box textSM>{command.title}</Box>
              </Box>
              <Box flex-1>
                <SetAlias extension={extension} command={command} />
              </Box>
              <Box flex-1>
                <BindingHotkey />
              </Box>

              <Box w-30 toRight>
                <Checkbox defaultChecked={false} />
              </Box>
            </Box>
          )
        })}
      </Box>

      <Button
        colorScheme="red500"
        variant="outline"
        disabled={isPending || isBuiltin}
        onClick={async () => {
          if (isBuiltin) return
          await mutateAsync(extension.id)
          refetch()
        }}
      >
        Uninstall Extension
      </Button>
    </Box>
  )
}
