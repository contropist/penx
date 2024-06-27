import { useEffect, useMemo, useRef } from 'react'
import { Box } from '@fower/react'
import * as Comlink from '@huakunshen/comlink'
import { isCopyToClipboard, isCustomAction, isListApp, isOpenInBrowser } from '@penxio/preset-ui'
import { DoorOpenIcon } from 'lucide-react'
import { workerStore } from '~/common/workerStore'
import { useCommandAppUI } from '~/hooks/useCommandAppUI'
import { useValue } from '~/hooks/useValue'
import { MenuItem } from './MenuItem'

interface Props {
  onSelect?: () => void
}

export const CommandAppActions = ({ onSelect }: Props) => {
  const { value } = useValue()
  const { ui } = useCommandAppUI()

  const itemIndexRef = useRef(0)

  const actions = useMemo(() => {
    if (ui.type !== 'render') return []

    if (isListApp(ui.component)) {
      const { items = [] } = ui.component
      const index = items.findIndex((i) => i.title === value)
      itemIndexRef.current = index
      const item = items[index]
      if (!item?.actions?.length) return []
      return item.actions
    }
    return []
  }, [ui, value])

  return (
    <>
      {actions.map((item, index) => (
        <MenuItem
          key={index}
          shortcut="↵"
          onSelect={async () => {
            if (isCustomAction(item)) {
              workerStore.currentWorker!.postMessage({
                type: 'customAction',
                itemIndex: itemIndexRef.current,
                actionIndex: index,
              })
            }

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
  return 'TODO:'
}
