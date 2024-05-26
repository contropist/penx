import { useRef } from 'react'
import { Box } from '@fower/react'
import { ArrowLeft } from 'lucide-react'
import { appEmitter } from '@penx/event'
import { useCommandPosition } from '~/hooks/useCommandPosition'
import { useCurrentCommand } from '~/hooks/useCurrentCommand'
import { useCommands, useItems } from '~/hooks/useItems'
import { useSearch } from '~/hooks/useSearch'
import { useValue } from '~/hooks/useValue'
import { ToggleModeButton } from '../ToggleModeButton'
import { StyledCommandInput } from './CommandComponents'
import { DatabaseName } from './DatabaseName'
import { SearchBarFilter } from './SearchBarFilter'

interface Props {
  searchBarHeight: number
}
export const SearchBar = ({ searchBarHeight }: Props) => {
  const { search, setSearch } = useSearch()
  const { setItems } = useItems()
  const { commands } = useCommands()
  const ref = useRef<HTMLInputElement>()
  const {
    isCommandApp,
    isCommandAppDetail,
    backToRoot,
    backToCommandApp,
    setPosition,
  } = useCommandPosition()
  const { currentCommand } = useCurrentCommand()

  const currentCommandName = currentCommand?.data?.commandName
  const isMarketplaceDetail =
    currentCommandName === 'marketplace' && isCommandAppDetail

  const isDatabaseDetail =
    currentCommandName === 'database' && isCommandAppDetail

  return (
    <Box
      data-tauri-drag-region
      toCenterY
      borderBottom
      borderGray200
      h={searchBarHeight}
    >
      {isCommandApp && (
        <Box
          pl3
          mr--8
          cursorPointer
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
      )}

      {isDatabaseDetail && <DatabaseName />}

      {!isMarketplaceDetail && (
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
                if (isCommandAppDetail) {
                  backToCommandApp()
                } else {
                  backToRoot()
                }
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
      )}
      {!isCommandApp && <ToggleModeButton mr3 />}
      {isCommandApp && currentCommand?.data?.filters && (
        <SearchBarFilter filters={currentCommand?.data?.filters} />
      )}
    </Box>
  )
}
