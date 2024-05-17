import { Box, styled } from '@fower/react'
import { ListItem } from 'penx'
import { StyledCommandItem } from './CommandComponets'
import { ListItemIcon } from './ListItemIcon'

interface ListItemUIProps {
  item: ListItem
  onSelect?: (item: ListItem) => void
}

export const ListItemUI = ({ item, onSelect }: ListItemUIProps) => {
  const title = typeof item.title === 'string' ? item.title : item.title.value

  const subtitle =
    typeof item.subtitle === 'string' ? item.subtitle : item.subtitle?.value

  return (
    <StyledCommandItem
      cursorPointer
      toCenterY
      toBetween
      px2
      py3
      gap2
      roundedLG
      black
      value={title}
      onSelect={() => {
        onSelect?.(item)
      }}
      onClick={() => {
        onSelect?.(item)
      }}
    >
      <Box toCenterY gap2>
        <ListItemIcon icon={item.icon as string} />
        <Box text-15>{title}</Box>
        <Box textSM gray500>
          {subtitle}
        </Box>
      </Box>
      <Box textXS gray400>
        Command
      </Box>
    </StyledCommandItem>
  )
}
