import { Box, FowerHTMLProps } from '@fower/react'
import { ListItem } from 'penx'
import { StyledCommandItem } from './CommandComponents'
import { ListItemIcon } from './ListItemIcon'

interface ListItemUIProps extends Omit<FowerHTMLProps<'div'>, 'onSelect'> {
  item: ListItem
  onSelect?: (item: ListItem) => void
}

export const ListItemUI = ({ item, onSelect, ...rest }: ListItemUIProps) => {
  const title = typeof item.title === 'string' ? item.title : item.title.value

  const subtitle =
    typeof item.subtitle === 'string' ? item.subtitle : item.subtitle?.value

  return (
    <StyledCommandItem
      cursorPointer
      toCenterY
      toBetween
      px2
      h-40
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
      {...rest}
    >
      <Box toCenterY gap2>
        <ListItemIcon icon={item.icon as string} />
        <Box text-14>{title}</Box>
        <Box text-12 zinc400>
          {subtitle}
        </Box>
      </Box>
      {!!item.data?.commandName && (
        <Box textXS gray400>
          Command
        </Box>
      )}
    </StyledCommandItem>
  )
}
