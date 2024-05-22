import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { Box } from '@fower/react'
import { IListItem, isListJSON, isMarkdownJSON } from 'penx'
import { Spinner } from 'uikit'
import { CommandAppUI } from '~/hooks/useCommandAppUI'
import { useValue } from '~/hooks/useValue'
import { ListApp } from './ListApp'
import { Markdown } from './Markdown'
import { Marketplace } from './Marketplace'

interface CommandAppProps {
  currentCommand: IListItem
  ui: CommandAppUI
  loading: boolean
}

export const CommandApp = memo(
  function CommandApp({ loading, ui, currentCommand }: CommandAppProps) {
    const { value, setValue } = useValue()

    if (loading) {
      // return <Box>loading...</Box>
      return null
    }

    if (ui.type === 'marketplace') {
      return <Marketplace />
    }

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

    if (ui.type === 'loading') {
      return (
        <Box absolute top0 right0 left0 bottom0 toCenter>
          <Spinner></Spinner>
        </Box>
      )
    }

    return null
  },
  (prev, next) => {
    if (!next.ui || Object.keys(next.ui).length === 0) return true

    if (
      // prev.loading === next.loading &&
      prev.currentCommand.data?.commandName ===
        next.currentCommand.data?.commandName &&
      isEqual(prev.ui, next.ui)
    ) {
      return true
    }
    return false
  },
)
