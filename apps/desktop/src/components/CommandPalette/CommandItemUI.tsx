import { Box, FowerHTMLProps } from '@fower/react'
import { Command } from '@penx/model'
import { CommandService } from '~/services/CommandService'
import { StyledCommandItem } from './CommandComponents'
import { ListItemIcon } from './ListItemIcon'

interface CommandItemUIProps extends Omit<FowerHTMLProps<'div'>, 'onSelect'> {
  index: number
  item: Command
  titleLayout?: 'column' | 'row'
  showIcon?: boolean
  onSelect?: () => Promise<void>
}

export const CommandItemUI = ({
  item,
  index,
  titleLayout = 'row',
  showIcon = true,
  onSelect,
  ...rest
}: CommandItemUIProps) => {
  const commandService = new CommandService(item)

  function select() {
    if (onSelect) {
      onSelect()
    } else {
      commandService.handleSelect()
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
        {showIcon && <ListItemIcon isApplication={item.isApplication} icon={item.icon} />}
        <Box flexDirection={titleLayout} gapY1 toCenterY gapX2>
          <Box text-14>{item.title}</Box>
          <Box text-12 zinc400>
            {item.subtitle}
          </Box>
          {item?.alias && (
            <Box rounded textXS border borderNeutral200 gray400 h-20 px-6 toCenterY>
              {item.alias}
            </Box>
          )}
        </Box>
      </Box>
      {!!item?.typeName && (
        <Box textXS gray400>
          {item?.typeName}
        </Box>
      )}
    </StyledCommandItem>
  )
}
