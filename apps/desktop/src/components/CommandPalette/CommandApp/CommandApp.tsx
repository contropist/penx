import { memo, useEffect } from 'react'
import isEqual from 'react-fast-compare'
import { Box } from '@fower/react'
import { IListItem, isListApp, isMarkdownJSON } from '@penxio/worker-ui'
import { Spinner } from 'uikit'
import { store } from '@penx/store'
import { Markdown } from '~/components/Markdown'
import { commandLoadingAtom } from '~/hooks/useCommandAppLoading'
import { CommandAppUI } from '~/hooks/useCommandAppUI'
import { ClipboardHistoryApp } from './ClipboardHistoryApp'
import { DatabaseApp } from './DatabaseApp/DatabaseApp'
import { ListApp } from './ListApp/ListApp'
import { MarketplaceApp } from './MarketplaceApp/MarketplaceApp'
import { TodayApp } from './TodayApp'

interface CommandAppProps {
  currentCommand: IListItem
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
    }

    return null
  },
  (prev, next) => {
    if (!next.ui || Object.keys(next.ui).length === 0) return true

    if (
      // prev.loading === next.loading &&
      prev.currentCommand?.data?.commandName === next.currentCommand?.data?.commandName &&
      isEqual(prev.ui, next.ui)
    ) {
      return true
    }
    return false
  },
)
