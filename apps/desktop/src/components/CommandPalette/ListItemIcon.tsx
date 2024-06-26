import { memo } from 'react'
import SVG from 'react-inlinesvg'
import { Box, css, FowerHTMLProps } from '@fower/react'
import { Icon } from '@iconify/react'
import { isObjectIcon } from '@penxio/preset-ui'
import { useQuery } from '@tanstack/react-query'
import { getRandomColor } from '@penx/local-db'
import { getIcon } from '~/common/icon'
import { IconifyIconType, isIconify } from '~/common/isIconify'

interface ListItemIconProps extends FowerHTMLProps<'div'> {
  icon?: any
  size?: number
  bg?: string
  isApplication?: boolean
}

export const ListItemIcon = memo(
  function ListItemIcon({ icon, bg, isApplication, size = 20, ...rest }: ListItemIconProps) {
    if (!icon) {
      return <Box flexShrink-0 square={size} bgNeutral300 rounded-6 {...rest}></Box>
    }

    if (isIconify(icon)) {
      return <IconifyIcon {...icon} />
    }

    if (isApplication) {
      return <AppIcon size={size} icon={icon as string} />
    }

    if (typeof icon === 'number') {
      const colorName = bg || getRandomColor('500')

      const arr = [colorName.replace('500', '400'), colorName, colorName.replace('500', '600')]

      return (
        <Box square={size} flexShrink-0 rounded-6 toCenter textXS white bgGradientX={arr}>
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
        <Box as="img" src={icon} alt="" width={size} height={size} style={{ borderRadius: 6 }} />
      )
    }

    const isSVG = icon.startsWith('<svg')
    if (isSVG) {
      return <SVG width={size} height={size} className={css({ rounded: 6 })} src={icon as string} />
    }
    return <Box as="img" square={size} rounded-6 src={`data:image/png;base64, ${icon}`} />
  },
  (prev, next) => {
    return prev.icon === next.icon
  },
)

function AppIcon({ icon, size = 20 }: { icon: string; size: number }) {
  const { isLoading, data = '' } = useQuery({
    queryKey: [icon],
    queryFn: async () => {
      return getIcon(icon)
    },
  })

  if (isLoading) {
    return <Box flexShrink-0 square={size} bgNeutral300 rounded-6></Box>
  }

  // console.log('===============appIcon:', data)

  return <Box as="img" src={data} alt="" width={size} height={size} style={{ borderRadius: 6 }} />
}

function IconifyIcon(icon: IconifyIconType) {
  // TODO: parse className to fower props, improvement needed
  let props: Record<string, any> = {}
  const bgGradientX: string[] = []
  const classNames = icon.className?.split(/\s+/) || []

  let hasBg = false

  for (const item of classNames) {
    if (item.startsWith('from-')) {
      bgGradientX[0] = item.replace('from-', '').split('-').join('')
      hasBg = true
    }
    if (item.startsWith('to-')) {
      bgGradientX[1] = item.replace('to-', '').split('-').join('')
      hasBg = true
    }
    //
    if (item.startsWith('bg-')) {
      const arr = item.split('-')
      props[arr.join('')] = true
      hasBg = true
    }
  }

  props.bgGradientX = bgGradientX
  if (hasBg) {
    props.white = true
    props.p = 3
  }

  return (
    <Box neutral900 square5 rounded-6 textSM toCenter {...props}>
      <Icon icon={icon.name.split('--').join(':')} />
    </Box>
  )
}
