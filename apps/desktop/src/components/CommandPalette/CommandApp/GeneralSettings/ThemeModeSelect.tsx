import { Box } from '@fower/react'
import { Radio, RadioGroup, RadioIndicator } from 'uikit'
import { useThemeMode } from '@penx/hooks'

interface Props {}

export const ThemeModeSelect = ({}: Props) => {
  const { mode, setMode } = useThemeMode()
  const options = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'Auto', value: 'auto' },
  ]

  return (
    <RadioGroup
      toCenterY
      w-100p
      gap6
      value={mode}
      onChange={(v: string) => {
        setMode(v)
      }}
    >
      {options.map((option, index) => (
        <Radio key={option.value} value={option.value} flex-1>
          {({ checked }) => (
            <Box
              px={[12, 12, 24]}
              gapX={[8, 8, 20]}
              transitionAll
              border
              borderGray200
              rounded-12
              brand500={checked}
              borderBrand500={checked}
              toCenterY
              flex-1
              py5
            >
              <RadioIndicator />
              {option.label}
            </Box>
          )}
        </Radio>
      ))}
    </RadioGroup>
  )
}
