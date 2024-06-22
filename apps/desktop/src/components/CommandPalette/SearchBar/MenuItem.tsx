import { Box, FowerHTMLProps } from '@fower/react'
import { Kbd } from 'uikit'
import { StyledCommandItem } from '../CommandComponents'

interface MenuItemProps extends Omit<FowerHTMLProps<'div'>, 'onSelect'> {
  shortcut: string
  onSelect?: () => void
}
export function MenuItem({ children, shortcut, onSelect, ...rest }: MenuItemProps) {
  return (
    <StyledCommandItem
      h-40
      cursorPointer
      text-13
      rounded-8
      gap2
      px2
      toCenterY
      transitionCommon
      onSelect={() => {
        onSelect?.()
      }}
      onClick={() => {
        onSelect?.()
      }}
      css={{
        "&[aria-selected='true']": {
          bgNeutral100: true,
        },

        "&[aria-disabled='true']": {
          cursorNotAllowed: true,
        },
      }}
      {...rest}
    >
      {children}
      <Box toBetween toCenterY ml-auto gap1>
        {shortcut.split(' ').map((key) => {
          return <Kbd key={key}>{key}</Kbd>
        })}
      </Box>
    </StyledCommandItem>
  )
}
