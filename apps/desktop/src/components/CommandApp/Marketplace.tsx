import { Box, styled } from '@fower/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Skeleton, Spinner } from 'uikit'
import { RouterOutputs } from '@penx/api'
import { db } from '@penx/local-db'
import { Manifest } from '@penx/model'
import { IExtension } from '@penx/model-types'
import { trpc } from '@penx/trpc-client'
import { fetchInstallationJSON } from '~/common/fetchInstallationJSON'
import { StyledCommandGroup, StyledCommandItem } from '../CommandComponents'
import { ListItemIcon } from '../ListItemIcon'

interface ExtensionItemProps {
  item: RouterOutputs['extension']['all'][0]
  extensions: IExtension[]
}

function ExtensionItem({ item, extensions }: ExtensionItemProps) {
  const manifest = new Manifest(item.manifest as any)
  const installed = !!extensions.find((e) => e.slug === manifest.id)

  const { refetch } = useQuery({
    queryKey: ['extension', 'installed'],
    queryFn: () => db.listExtensions(),
  })

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ['extension', item.id],
    mutationFn: async () => {
      const json = await fetchInstallationJSON(manifest.id)
      if (json) {
        const { id: slug, ...data } = json
        await db.upsertExtension(slug, data as any)
      }
    },
  })

  return (
    <StyledCommandItem
      key={item.id}
      cursorPointer
      toCenterY
      toBetween
      px2
      h-64
      gap2
      roundedLG
      black
      value={item.id}
      onSelect={() => {}}
      onClick={() => {}}
    >
      <Box toCenterY gap2>
        <ListItemIcon icon={item.logo as string} />
        <Box column>
          <Box textSM>{manifest.name}</Box>
          <Box text-13 gray400>
            {manifest.description}
          </Box>
        </Box>
      </Box>

      <Button
        colorScheme="black"
        size="sm"
        // w-80
        disabled={isLoading || installed}
        onClick={async () => {
          await mutateAsync()
          refetch()
        }}
      >
        {isLoading && <Spinner white square4 />}
        {installed ? 'Installed' : 'Install'}
      </Button>
    </StyledCommandItem>
  )
}

export function Marketplace() {
  const { data = [], isLoading } = trpc.extension.all.useQuery()

  const { data: extensions = [] } = useQuery({
    queryKey: ['extension', 'installed'],
    queryFn: () => db.listExtensions(),
  })

  if (isLoading)
    return (
      <Box column gap1>
        <Skeleton h-64 />
        <Skeleton h-64 />
        <Skeleton h-64 />
      </Box>
    )

  return (
    <StyledCommandGroup>
      {data?.map((item) => {
        return (
          <ExtensionItem key={item.id} item={item} extensions={extensions} />
        )
      })}
    </StyledCommandGroup>
  )
}
