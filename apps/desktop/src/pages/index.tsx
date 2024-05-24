'use client'

import { PropsWithChildren, useEffect } from 'react'
import { Box } from '@fower/react'
import { isServer, useQuery } from '@tanstack/react-query'
import Head from 'next/head'
import { EditorApp } from '@penx/app'
import { appEmitter } from '@penx/event'
import { SessionProvider, useSession } from '@penx/session'
import { getLocalSession } from '@penx/storage'
import {
  FirstLocalSpaceGenerator,
  RecoveryPhraseLoginProvider,
} from '@penx/widget'
import { installBuiltinExtension } from '~/common/installBuiltinExtension'
import { CommandPalette } from '~/components/CommandPalette/CommandPalette'
import { DesktopWelcome } from '~/components/DesktopWelcome'
import { EditorModeApp } from '~/components/EditorModeApp'
import { useMode } from '~/hooks/useMode'

export default function Home() {
  const {
    isLoading,
    data: isBoarded,
    refetch,
  } = useQuery(['isFistTime'], async () => {
    const isBoarded = localStorage.getItem('PENX_IS_BOARDED')
    return !!isBoarded
  })

  const { isEditor } = useMode()

  if (isLoading) return null

  return (
    <Box
      relative
      absolute
      top0
      bottom0
      left0
      right0
      rounded2XL
      bgTransparent
      // bgAmber100
      bgWhite
      // bgGradientX={['gray200', 'purple200']}
      // overflowHidden
    >
      {!isBoarded && (
        <DesktopWelcome
          isLoading={isLoading}
          onGetStarted={async () => {
            localStorage.setItem('PENX_IS_BOARDED', 'yes')
            await installBuiltinExtension()
            refetch()
          }}
        />
      )}
      {isBoarded && (isEditor ? <EditorModeApp /> : <CommandPalette />)}
    </Box>
  )
}
