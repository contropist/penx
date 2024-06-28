import { ReactNode, useMemo } from 'react'
import { Box, css, FowerHTMLProps } from '@fower/react'
import { IAccessory, isAccessoryObjectText } from '@penxio/preset-ui'
import { Command } from '@penx/model'
import { useCurrentCommand } from '~/hooks/useCurrentCommand'
import { CommandService } from '~/services/CommandService'
import { StyledCommandItem } from './CommandComponents'
import { ListItemIcon } from './ListItemIcon'

interface ListItemUIProps extends Omit<FowerHTMLProps<'div'>, 'onSelect'> {
  index: number
  item: Command
  titleLayout?: 'column' | 'row'
  showIcon?: boolean
  onSelect?: () => Promise<void>
}

export const ListItemUI = ({
  item,
  index,
  titleLayout = 'row',
  showIcon = true,
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
  const { currentCommand } = useCurrentCommand()
  const assets = currentCommand?.extension?.assets || {}

  let text: ReactNode = useMemo(() => {
    if (typeof item.text === 'string' || typeof item.text === 'number') {
      return <Box>{item.text}</Box>
    }
    if (isAccessoryObjectText(item.text)) {
      return <Box color={item.text.color || 'gray600'}>{item.text?.value || ''}</Box>
    }
    return null
  }, [item.text])
  let tag: ReactNode = item.tag ? (
    <Box bgAmber500 white h-24 rounded px2 toCenterY>
      {item.tag.value}
    </Box>
  ) : null

  let icon: ReactNode = item.icon ? <ListItemIcon roundedFull icon={assets[item.icon]} /> : null

  return (
    <Box toCenterY gap1>
      {icon}
      {text}
      {tag}
    </Box>
  )
}
