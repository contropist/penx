import { Box } from '@fower/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Spinner } from 'uikit'
import { db } from '@penx/local-db'
import { useLoadCommands } from '~/hooks/useItems'

interface Props {
  localExtensionId: string
}

export function UninstallExtensionButton({ localExtensionId }: Props) {
  const { refetch: refetchExtensions } = useQuery({
    queryKey: ['extension', 'installed'],
    queryFn: () => db.listExtensions(),
  })

  const { refetch: refetchCommands } = useLoadCommands()

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['extension', localExtensionId],
    mutationFn: () => db.deleteExtension(localExtensionId),
  })

  return (
    <Button
      colorScheme="white"
      w-90
      size="sm"
      // w-80
      disabled={isPending}
      onClick={async () => {
        await mutateAsync()
        refetchExtensions()
        refetchCommands()
      }}
    >
      {isPending && <Spinner white square4 />}
      <Box>Uninstall</Box>
    </Button>
  )
}
