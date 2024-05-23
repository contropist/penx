import SVG from 'react-inlinesvg'
import { Box, css, FowerHTMLProps } from '@fower/react'
import Image from 'next/image'

interface ListItemIconProps extends FowerHTMLProps<'div'> {
  icon?: string | number
  size?: number
}

export function ListItemIcon({ icon, size = 20, ...rest }: ListItemIconProps) {
  if (!icon) {
    return (
      <Box flexShrink-0 square={size} bgNeutral300 rounded-6 {...rest}></Box>
    )
  }

  if (typeof icon === 'number') {
    return (
      <Box square={size} flexShrink-0 bgNeutral300 rounded-6 toCenter textXS>
        {icon}
      </Box>
    )
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
