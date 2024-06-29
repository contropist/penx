import { Box, FowerHTMLProps } from '@fower/react'
import { useCurrentCommand } from '~/hooks/useCurrentCommand'
import { StyledCommandItem } from '../../CommandComponents'
import { ListItemIcon } from '../../ListItemIcon'
import { Accessory } from './Accessory'
import { ListItem } from './domains/ListItem.domain'

interface ListItemUIProps extends Omit<FowerHTMLProps<'div'>, 'onSelect'> {
  index: number
  item: ListItem
  titleLayout?: 'column' | 'row'
  onSelect?: () => Promise<void>
}

export const ListItemUI = ({
  item,
  index,
  titleLayout = 'row',
  onSelect,
  ...rest
}: ListItemUIProps) => {
  const { currentCommand } = useCurrentCommand()

  // if (item.type === 'list-heading') {
  //   return (
  //     <Box textXS gray400 pl-10 mb-2 mt2={index > 0}>
  //       {title}
  //     </Box>
  //   )
  // }

  function select() {
    if (onSelect) {
      onSelect()
    } else {
      // TODO:...
      // commandService.handleSelect()
    }
  }

  return (
    <StyledCommandItem
      cursorPointer
      toCenterY
      toBetween
      px2
      py2
      gap4
      roundedLG
      black
      bgNeutral100--hover
      value={item.value}
      keywords={item.keywords}
      onSelect={select}
      onClick={select}
      {...rest}
    >
      <Box toCenterY gap2>
        <ListItemIcon icon={item.icon} />
        <Box flexDirection={titleLayout} gapY1 toCenterY gapX2>
          <Box text-14>{item.title}</Box>
          <Box text-12 zinc400>
            {item.subtitle}
          </Box>
        </Box>
      </Box>
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
