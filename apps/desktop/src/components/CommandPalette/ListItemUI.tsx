import { ReactNode } from 'react'
import { Box, FowerHTMLProps } from '@fower/react'
import { IAccessory, IListItem, ListItemJSON } from 'penx'
import { StyledCommandItem } from './CommandComponents'
import { ListItemIcon } from './ListItemIcon'

interface ListItemUIProps extends Omit<FowerHTMLProps<'div'>, 'onSelect'> {
  index: number
  item: IListItem
  onSelect?: (item: IListItem) => void
}

export const ListItemUI = ({
  item,
  onSelect,
  index,
  ...rest
}: ListItemUIProps) => {
  const title = typeof item.title === 'string' ? item.title : item.title.value

  const subtitle =
    typeof item.subtitle === 'string' ? item.subtitle : item.subtitle?.value

  if (item.type === 'list-heading') {
    return (
      <Box textXS gray400 pl-10 mb-2 mt2={index > 0}>
        {title}
      </Box>
    )
  }

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
      {item?.extra && (
        <Box toCenterY gap2 textXS gray600>
          {item.extra.map((extra, index) => (
            <Accessory key={index} item={extra} />
          ))}
        </Box>
      )}
    </StyledCommandItem>
  )
}

interface AccessoryProps {
  item: IAccessory
}
function Accessory({ item }: AccessoryProps) {
  let text: ReactNode = item.text ? <Box>{item.text}</Box> : null
  let tag: ReactNode = item.tag ? (
    <Box bgAmber500 white h-24 rounded px2 toCenterY>
      {item.tag.value}
    </Box>
  ) : null
  let icon: ReactNode = item.icon ? <ListItemIcon roundedFull /> : null

  return (
    <Box toCenterY gap1>
      {icon}
      {text}
      {tag}
    </Box>
  )
}
