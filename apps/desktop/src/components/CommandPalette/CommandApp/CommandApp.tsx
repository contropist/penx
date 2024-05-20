import Markdown from 'react-markdown'
import { Box, css } from '@fower/react'
import { Spinner } from 'uikit'
import { useCommandAppUI } from '~/hooks/useCommandAppUI'
import { useCurrentCommand } from '~/hooks/useCurrentCommand'
import { StyledCommandGroup } from '../CommandComponents'
import { ListItemUI } from '../ListItemUI'
import { Marketplace } from './Marketplace'

interface CommandAppProps {}

export function CommandApp({}: CommandAppProps) {
  const { currentCommand } = useCurrentCommand()
  const { ui } = useCommandAppUI()

  if (ui.type === 'loading') {
    return (
      <Box absolute top0 right0 left0 bottom0 toCenter>
        <Spinner></Spinner>
      </Box>
    )
  }

  if (ui.type === 'markdown') {
    return (
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
            return <Box as="ul" pl2 listInside listDisc {...(props as any)} />
          },
          li: (props) => {
            return <Box as="li" py1 {...(props as any)} />
          },
        }}
      >
        {ui.content}
      </Markdown>
    )
  }

  if (ui.type === 'marketplace') {
    return <Marketplace />
  }

  if (ui.type === 'list') {
    return (
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
    )
  }

  return null
}
