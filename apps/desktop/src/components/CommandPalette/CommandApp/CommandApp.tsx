import { memo } from 'react'
import isEqual from 'react-fast-compare'
import Markdown from 'react-markdown'
import { Box, css } from '@fower/react'
import { ListItem } from 'penx'
import { Spinner } from 'uikit'
import { CommandAppUI } from '~/hooks/useCommandAppUI'
import { StyledCommandGroup, StyledCommandList } from '../CommandComponents'
import { ListItemUI } from '../ListItemUI'
import { Marketplace } from './Marketplace'

interface CommandAppProps {
  currentCommand: ListItem
  ui: CommandAppUI
  loading: boolean
}

export const CommandApp = memo(
  function CommandApp({ loading, ui, currentCommand }: CommandAppProps) {
    // console.log('=======currentCommand:', currentCommand, 'ui:', ui)

    if (loading) {
      // return <Box>loading...</Box>
      return null
    }

    if (ui.type === 'loading') {
      return (
        <StyledCommandList p2 minH-100p>
          <Box absolute top0 right0 left0 bottom0 toCenter>
            <Spinner></Spinner>
          </Box>
        </StyledCommandList>
      )
    }

    if (ui.type === 'markdown') {
      return (
        <StyledCommandList p2 minH-100p>
          <Markdown
            className={css(['p1'])}
            components={{
              h1: (props) => {
                return <Box as="h1" mb2 {...props} />
              },
              h2: (props) => {
                return <Box as="h2" mb2 {...props} />
              },
              ul: (props) => {
                return (
                  <Box as="ul" pl2 listInside listDisc {...(props as any)} />
                )
              },
              li: (props) => {
                return <Box as="li" py1 {...(props as any)} />
              },
            }}
          >
            {ui.content}
          </Markdown>
        </StyledCommandList>
      )
    }

    if (ui.type === 'marketplace') {
      return (
        <StyledCommandList p2 minH-100p>
          <Marketplace />
        </StyledCommandList>
      )
    }

    if (ui.type === 'list') {
      return (
        <StyledCommandList p2 minH-100p>
          <StyledCommandGroup>
            {ui.items.map((item, index) => {
              return (
                <ListItemUI
                  key={index}
                  index={index}
                  item={item}
                  onSelect={() => {
                    //
                  }}
                />
              )
            })}
          </StyledCommandGroup>
        </StyledCommandList>
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
