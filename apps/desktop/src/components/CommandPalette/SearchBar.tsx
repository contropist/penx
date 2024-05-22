import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { Box } from '@fower/react'
import { ArrowLeft } from 'lucide-react'
import { appEmitter } from '@penx/event'
import { workerStore } from '~/common/workerStore'
import { useCommandPosition } from '~/hooks/useCommandPosition'
import { useCommands, useItems } from '~/hooks/useItems'
import { ToggleModeButton } from '../ToggleModeButton'
import { StyledCommandInput } from './CommandComponents'

interface Props {
  searchBarHeight: number
}
export const SearchBar = ({ searchBarHeight }: Props) => {
  const [q, setQ] = useState('')
  const { setItems } = useItems()
  const { commands } = useCommands()
  const ref = useRef<HTMLInputElement>()

  const { isCommandApp, backToRoot } = useCommandPosition()

  return (
    <Box toCenterY borderBottom borderGray200 data-tauri-drag-region>
      {isCommandApp && (
        <Box
          pl3
          mr--8
          cursorPointer
          onClick={() => {
            backToRoot()
          }}
        >
          <ArrowLeft size={20}></ArrowLeft>
        </Box>
      )}
      <StyledCommandInput
        ref={ref as any}
        id="searchBarInput"
        flex-1
        bgRed100
        selectNone
        toCenterY
        bgTransparent
        w-100p
        h={searchBarHeight}
        px3
        placeholderZinc500
        textBase
        outlineNone
        placeholder="Search something..."
        autoFocus
        value={q}
        onValueChange={(v) => {
          appEmitter.emit('ON_COMMAND_PALETTE_SEARCH_CHANGE', v)

          setQ(v)
          if (v === '') {
            console.log('===========commands:', commands)
            setItems(commands)
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Backspace' || e.key === 'delete') {
            if (!q && isCommandApp) {
              backToRoot()
            }
          }
          if (e.key === 'Enter') {
            // const [a, b = ''] = splitStringByFirstSpace(q)
            // const item = commands.find((item) => item.title === a)
            // if (item) {
            //   handleSelect(item, String(b))
            // }
            if (!q && isCommandApp) {
              backToRoot()
            }
          }
        }}
      />
      <ToggleModeButton mr3 />
    </Box>
  )
}
