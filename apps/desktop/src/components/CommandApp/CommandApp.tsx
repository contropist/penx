import Markdown from 'react-markdown'
import { Box } from '@fower/react'
import { Spinner } from 'uikit'
import { useCommandAppUI } from '~/hooks/useCommandAppUI'
import { useCurrentCommand } from '~/hooks/useCurrentCommand'
import { StyledCommandGroup, StyledCommandList } from '../CommandComponents'
import { ListItemUI } from '../ListItemUI'
import { Marketplace } from './Marketplace'

interface CommandAppProps {}

export function CommandApp({}: CommandAppProps) {
  const { currentCommand } = useCurrentCommand()
  const { ui } = useCommandAppUI()
  // console.log('======currentCommand:', currentCommand)

  if (ui.type === 'loading') {
    return (
      <Box absolute top0 right0 left0 bottom0 toCenter>
        <Spinner></Spinner>
      </Box>
    )
  }

  if (ui.type === 'markdown') {
    return <Markdown>{ui.content}</Markdown>
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
