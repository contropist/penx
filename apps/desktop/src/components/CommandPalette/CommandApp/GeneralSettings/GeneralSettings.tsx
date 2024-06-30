import { Box, styled } from '@fower/react'
import { Checkbox } from 'uikit'
import { BindAppHotkey } from '@penx/app'
import { ThemeModeSelect } from './ThemeModeSelect'

interface Props {}

const Label = styled('div', ['neutral400', 'textXS'])
const Item = styled('div', ['neutral700', 'column', 'gap3'])

export const GeneralSettings = ({}: Props) => {
  return (
    <Box column gap8 p4>
      <Item>
        <Label>PenX Hotkey</Label>
        <BindAppHotkey />
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
