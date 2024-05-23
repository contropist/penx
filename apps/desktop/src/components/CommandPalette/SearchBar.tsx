import { useRef } from 'react'
import { Box } from '@fower/react'
import { ArrowLeft } from 'lucide-react'
import { appEmitter } from '@penx/event'
import { workerStore } from '~/common/workerStore'
import { useCommandPosition } from '~/hooks/useCommandPosition'
import { useCurrentCommand } from '~/hooks/useCurrentCommand'
import { useCommands, useItems } from '~/hooks/useItems'
import { useSearch } from '~/hooks/useSearch'
import { ToggleModeButton } from '../ToggleModeButton'
import { StyledCommandInput } from './CommandComponents'
import { SearchBarFilter } from './SearchBarFilter'

interface Props {
  searchBarHeight: number
}
export const SearchBar = ({ searchBarHeight }: Props) => {
  const { search, setSearch } = useSearch()
  const { setItems } = useItems()
  const { commands } = useCommands()
  const ref = useRef<HTMLInputElement>()
  const { isCommandApp, backToRoot } = useCommandPosition()
  const { currentCommand } = useCurrentCommand()

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
        value={search}
        onValueChange={(v) => {
          appEmitter.emit('ON_COMMAND_PALETTE_SEARCH_CHANGE', v)

          setSearch(v)
          if (v === '') {
            setItems(commands)
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Backspace' || e.key === 'delete') {
            if (!search && isCommandApp) {
              backToRoot()
            }
          }
          if (e.key === 'Enter') {
            // const [a, b = ''] = splitStringByFirstSpace(q)
            // const item = commands.find((item) => item.title === a)
            // if (item) {
            //   handleSelect(item, String(b))
            // }
          }
        }}
      />
      {!isCommandApp && <ToggleModeButton mr3 />}
      {isCommandApp && currentCommand?.data?.filters && (
        <SearchBarFilter filters={currentCommand?.data?.filters} />
      )}
    </Box>
  )
}
