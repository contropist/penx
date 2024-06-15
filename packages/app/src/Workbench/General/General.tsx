import { Box, styled } from '@fower/react'
import { Checkbox } from 'uikit'
import { ThemeModeSelect } from './ThemeModeSelect'

interface Props {}

const Label = styled('div', ['neutral400', 'textXS'])
const Item = styled('div', ['neutral700', 'column', 'gap3'])

export const General = ({}: Props) => {
  return (
    <Box column gap8>
      <Box neutral900 fontMedium>
        General
      </Box>
      <Item>
        <Label>PenX Hotkey</Label>
        <Box bgNeutral200 h-40 w-200 rounded2XL toCenter>
          Cmd + K
        </Box>
      </Item>
      <Item>
        <Label>Theme Mode</Label>
        <ThemeModeSelect />
      </Item>

      <Item>
        <Label>Startup</Label>
        <Box>
          <Checkbox>Auto launch PenX on startup</Checkbox>
        </Box>
      </Item>
    </Box>
  )
}
