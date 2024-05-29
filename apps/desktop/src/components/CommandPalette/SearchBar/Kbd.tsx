import { Box, FowerHTMLProps } from '@fower/react'

interface Props extends FowerHTMLProps<'kbd'> {}

export const Kbd = ({ children, ...rest }: Props) => {
  return (
    <Box
      as="kbd"
      bgNeutral300
      neutral600
      square5
      rounded-4
      toCenter
      text-12
      // fontSans
      style={{
        fontFamily:
          "'Inter', --apple-system, BlinkMacSystemFont, Segoe UI, Roboto,Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}
