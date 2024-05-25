import { useState } from 'react'
import { Box, styled } from '@fower/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { DownloadCloud } from 'lucide-react'
import { Button, Divider, Skeleton, Spinner } from 'uikit'
import { RouterOutputs } from '@penx/api'
import { db } from '@penx/local-db'
import { Manifest } from '@penx/model'
import { IExtension } from '@penx/model-types'
import { trpc } from '@penx/trpc-client'
import { fetchInstallationJSON } from '~/common/fetchInstallationJSON'
import { useCommandPosition } from '~/hooks/useCommandPosition'
import { StyledCommandGroup, StyledCommandItem } from '../CommandComponents'
import { ListItemIcon } from '../ListItemIcon'

type ExtensionItem = RouterOutputs['extension']['all'][0]

interface ExtensionItemProps {
  item: ExtensionItem
  extensions: IExtension[]
  onSelect: (item: ExtensionItem) => void
}

function ExtensionItem({ item, extensions, onSelect }: ExtensionItemProps) {
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

  function onSelectExtension(item: ExtensionItem) {
    onSelect(item)
  }

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
      onSelect={() => onSelectExtension(item)}
      onClick={() => onSelectExtension(item)}
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

interface ExtensionDetailProps {
  item: ExtensionItem
  extensions: IExtension[]
}
function ExtensionDetail({ item, extensions }: ExtensionDetailProps) {
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
    <Box p4>
      <Box>
        <Box gap2 column>
          <Box toCenterY gap2 mb3>
            <ListItemIcon icon={item.logo as string} size={36} />
            <Box text2XL fontBlack>
              {manifest.name}
            </Box>
          </Box>

          <Box>
            <Box toCenterY gap1>
              <Box gray600>
                <DownloadCloud size={18} />
              </Box>
              <Box textSM>{item.installationCount}</Box>
            </Box>
          </Box>
          <Box textSM gray600>
            By 0xzion
          </Box>
          <Box textSM gray600>
            Source code
          </Box>

          <Box textBase>{manifest.description}</Box>
        </Box>

        <Box mt3>
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

          <Button
            variant="outline"
            colorScheme="black"
            size="sm"
            onClick={() => {
              //
            }}
          >
            Copy share link
          </Button>
        </Box>
      </Box>
      <Divider my4 />
      <Box>Detail...</Box>
    </Box>
  )
}

export function MarketplaceApp() {
  const { data = [], isLoading } = trpc.extension.all.useQuery()

  const { data: extensions = [] } = useQuery({
    queryKey: ['extension', 'installed'],
    queryFn: () => db.listExtensions(),
  })

  const { isCommandAppDetail, setPosition } = useCommandPosition()
  const [extension, setExtension] = useState<ExtensionItem>(null as any)

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
      {isCommandAppDetail && (
        <ExtensionDetail item={extension} extensions={extensions} />
      )}
      {!isCommandAppDetail &&
        data?.map((item) => {
          return (
            <ExtensionItem
              key={item.id}
              item={item}
              extensions={extensions}
              onSelect={() => {
                setExtension(item)
                setPosition('COMMAND_APP_DETAIL')
              }}
            />
          )
        })}
    </StyledCommandGroup>
  )
}
