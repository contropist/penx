import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { Box } from '@fower/react'
import { IListItem, isListJSON, isMarkdownJSON } from '@penxio/worker-ui'
import { Spinner } from 'uikit'
import { Markdown } from '~/components/Markdown'
import { CommandAppUI } from '~/hooks/useCommandAppUI'
import { ClipboardHistoryApp } from './ClipboardHistoryApp'
import { DatabaseApp } from './DatabaseApp/DatabaseApp'
import { ListApp } from './ListApp'
import { MarketplaceApp } from './MarketplaceApp/MarketplaceApp'
import { TodayApp } from './TodayApp'

interface CommandAppProps {
  currentCommand: IListItem
  ui: CommandAppUI
  loading: boolean
}

export const CommandApp = memo(
  function CommandApp({ loading, ui, currentCommand }: CommandAppProps) {
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

      if (isListJSON(component)) {
        return <ListApp component={component} />
      }

      return null
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
