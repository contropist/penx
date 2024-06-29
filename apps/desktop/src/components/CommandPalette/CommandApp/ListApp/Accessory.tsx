import { ReactNode, useMemo } from 'react'
import { Box } from '@fower/react'
import { IAccessory, isAccessoryObjectText } from '@penxio/preset-ui'
import { useCurrentCommand } from '~/hooks/useCurrentCommand'
import { ListItemIcon } from '../../ListItemIcon'

interface AccessoryProps {
  item: IAccessory
}

export function Accessory({ item }: AccessoryProps) {
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
