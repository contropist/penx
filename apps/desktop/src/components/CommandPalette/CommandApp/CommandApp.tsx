import { memo, useEffect } from 'react'
import isEqual from 'react-fast-compare'
import { Box } from '@fower/react'
import { isFormApp, isListApp, isMarkdownJSON } from '@penxio/preset-ui'
import { Spinner } from 'uikit'
import { Command } from '@penx/model'
import { store } from '@penx/store'
import { Markdown } from '~/components/Markdown'
import { commandLoadingAtom } from '~/hooks/useCommandAppLoading'
import { CommandAppUI } from '~/hooks/useCommandAppUI'
import { AboutApp } from './AboutApp'
import { ClipboardHistoryApp } from './ClipboardHistoryApp'
import { DatabaseApp } from './DatabaseApp/DatabaseApp'
import { FormApp } from './FormApp/FormApp'
import { GeneralSettings } from './GeneralSettings/GeneralSettings'
import { InstalledExtensionsApp } from './InstalledExtensionsApp/InstalledExtensionsApp'
import { ListApp } from './ListApp/ListApp'
import { MarketplaceApp } from './MarketplaceApp/MarketplaceApp'
import { TodayApp } from './TodayApp'

interface CommandAppProps {
  currentCommand: Command
  ui: CommandAppUI
}

export const CommandApp = memo(
  function CommandApp({ ui }: CommandAppProps) {
    // update loading status
    useEffect(() => {
      if (ui.type === 'render') {
        if (Reflect.has(ui.component, 'isLoading')) {
          const isLoading = ui.component.isLoading
          const storeLoading = store.get(commandLoadingAtom)
          if (isLoading !== storeLoading) {
            store.set(commandLoadingAtom, isLoading)
          }
        }
      }
    }, [ui])

    if (ui.type === 'marketplace') {
      return <MarketplaceApp />
    }

    if (ui.type === 'about') {
      return <AboutApp />
    }

    if (ui.type === 'settings') {
      return <GeneralSettings />
    }

    if (ui.type === 'installed-extensions') {
      return <InstalledExtensionsApp />
    }

    // if (ui.type === 'today') {
    //   return <TodayApp />
    // }

    // if (ui.type === 'database') {
    //   return <DatabaseApp />
    // }

    // if (ui.type === 'clipboard-history') {
    //   return <ClipboardHistoryApp />
    // }

    if (ui.type === 'render') {
      const component = ui.component as any

      if (isMarkdownJSON(component)) {
        return <Markdown content={component.content} />
      }

      if (isListApp(component)) {
        return <ListApp component={component} />
      }

      if (isFormApp(component)) {
        return <FormApp component={component} />
      }
    }

    return null
  },
  (prev, next) => {
    if (!next.ui || Object.keys(next.ui).length === 0) return true

    if (prev.currentCommand?.name === next.currentCommand.name && isEqual(prev.ui, next.ui)) {
      return true
    }
    return false
  },
)
