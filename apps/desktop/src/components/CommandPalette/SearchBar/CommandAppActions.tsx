import { useMemo } from 'react'
import { Box } from '@fower/react'
import { isCopyToClipboard, isListJSON, isOpenInBrowser } from '@penxio/worker-ui'
import { DoorOpenIcon } from 'lucide-react'
import { useCommandAppUI } from '~/hooks/useCommandAppUI'
import { useValue } from '~/hooks/useValue'
import { MenuItem } from './MenuItem'

interface Props {
  onSelect?: () => void
}

export const CommandAppActions = ({ onSelect }: Props) => {
  const { value } = useValue()
  const { ui } = useCommandAppUI()

  const actions = useMemo(() => {
    if (ui.type !== 'render') return []

    if (isListJSON(ui.component)) {
      const item = ui.component.items.find((i) => i.title === value)
      if (!item?.actions?.length) return []
      return item.actions
    }
    return []
  }, [ui, value])

  console.log('========actions:', actions)

  return (
    <>
      {actions.map((item, index) => (
        <MenuItem
          key={index}
          shortcut="↵"
          onSelect={() => {
            onSelect?.()
          }}
        >
          <Box toCenterY gap2 inlineFlex>
            <Box gray800>
              <DoorOpenIcon size={16} />
            </Box>
            <Box>{item.title || getDefaultTitle(item)}</Box>
          </Box>
        </MenuItem>
      ))}
    </>
  )
}

function getDefaultTitle(item: any) {
  if (isOpenInBrowser(item)) {
    return 'Open in browser'
  }

  if (isCopyToClipboard(item)) {
    return 'Copy to clipboard'
  }
  return ''
}
