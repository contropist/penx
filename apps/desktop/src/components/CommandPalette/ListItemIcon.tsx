import SVG from 'react-inlinesvg'
import { Box, css, FowerHTMLProps } from '@fower/react'
import Image from 'next/image'
import { isObjectIcon } from 'penx'
import { getRandomColor } from '@penx/local-db'

interface ListItemIconProps extends FowerHTMLProps<'div'> {
  icon?: string | number
  size?: number
  bg?: string
}

export function ListItemIcon({
  icon,
  bg,
  size = 20,
  ...rest
}: ListItemIconProps) {
  if (!icon) {
    return (
      <Box flexShrink-0 square={size} bgNeutral300 rounded-6 {...rest}></Box>
    )
  }

  if (typeof icon === 'number') {
    const colorName = bg || getRandomColor('500')

    const arr = [
      colorName.replace('500', '400'),
      colorName,
      colorName.replace('500', '600'),
    ]

    return (
      <Box
        square={size}
        flexShrink-0
        rounded-6
        toCenter
        textXS
        white
        bgGradientX={arr}
      >
        {icon}
      </Box>
    )
  }

  // TODO: handle other icon value
  if (isObjectIcon(icon)) {
    if (icon.value === '#') {
      return (
        <Box
          square={size}
          flexShrink-0
          rounded-6
          toCenter
          textXS
          white
          // bgGradientX={['green500', 'blue500']}
          bg={icon.bg || 'gray500'}
        >
          {icon.value}
        </Box>
      )
    }
  }

  if (icon.startsWith('/')) {
    return (
      <Image
        src={icon}
        alt=""
        width={size}
        height={size}
        style={{ borderRadius: 6 }}
      />
    )
  }

  const isSVG = icon.startsWith('<svg')
  if (isSVG) {
    return (
      <SVG
        width={size}
        height={size}
        className={css({ rounded: 6 })}
        src={icon as string}
      />
    )
  }
  return (
    <Box
      as="img"
      square={size}
      rounded-6
      src={`data:image/png;base64, ${icon}`}
    />
  )
}
