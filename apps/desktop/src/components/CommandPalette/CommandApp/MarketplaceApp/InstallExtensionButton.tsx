import { Box } from '@fower/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Spinner } from 'uikit'
import { db } from '@penx/local-db'
import { Manifest } from '@penx/model'
import { api } from '@penx/trpc-client'
import { fetchInstallationJSON } from '~/common/fetchInstallationJSON'
import { useLoadCommands } from '~/hooks/useItems'

// any
type ExtensionItem = any

interface Props {
  item: ExtensionItem
}

export function InstallExtensionButton({ item }: Props) {
  const manifest = new Manifest(item.manifest as any)

  const { refetch: refetchExtensions } = useQuery({
    queryKey: ['extension', 'installed'],
    queryFn: () => db.listExtensions(),
  })

  const { refetch: refetchCommands } = useLoadCommands()

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['extension', item.id],
    mutationFn: async () => {
      const json = await fetchInstallationJSON(manifest.name)

      if (json) {
        const { name, ...data } = json
        await db.upsertExtension(name, data as any)
        await refetchCommands()
      }
    },
  })

  return (
    <Button
      colorScheme="black"
      w-90
      size="sm"
      disabled={isPending}
      onClick={async () => {
        try {
          await mutateAsync()
          await refetchExtensions()
          await api.extension.increaseInstallationCount.mutate({
            name: manifest.name,
          })
        } catch (error) {
          console.log('install error', error)
        }
      }}
    >
      {isPending && <Spinner white square4 />}
      <Box>Install</Box>
    </Button>
  )
}
