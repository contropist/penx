import { Box, FowerHTMLProps } from '@fower/react'
import { ArrowLeft } from 'lucide-react'
import { useCommandPosition } from '~/hooks/useCommandPosition'
import { useSearch } from '~/hooks/useSearch'

interface Props extends FowerHTMLProps<'div'> {}

export const BackRootButton = ({ ...rest }: Props) => {
  const { setSearch } = useSearch()
  const { isCommandAppDetail, backToRoot, backToCommandApp } =
    useCommandPosition()

  return (
    <Box
      cursorPointer
      toCenter
      neutral900
      {...rest}
      onClick={() => {
        if (isCommandAppDetail) {
          backToCommandApp()
        } else {
          backToRoot()
          setSearch('')
        }
      }}
    >
      <ArrowLeft size={20}></ArrowLeft>
    </Box>
  )
}
