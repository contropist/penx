import { useEffect, useRef } from 'react'
import { Box } from '@fower/react'
import { ArrowLeft, Plus } from 'lucide-react'
import { Button } from 'uikit'
import { appEmitter } from '@penx/event'
import { store } from '@penx/store'
import { ToggleModeButton } from '~/components/ToggleModeButton'
import { useCommandPosition } from '~/hooks/useCommandPosition'
import { useCurrentCommand } from '~/hooks/useCurrentCommand'
import { useHandleSelect } from '~/hooks/useHandleSelect'
import { isAddRowAtom } from '~/hooks/useIsAddRow'
import { useCommands, useItems } from '~/hooks/useItems'
import { useLoading } from '~/hooks/useLoading'
import { useSearch } from '~/hooks/useSearch'
import { StyledCommandInput } from '../CommandComponents'
import { AddRowButton } from './AddRowButton'
import { DatabaseName } from './DatabaseName'
import { SearchBarFilter } from './SearchBarFilter'

interface Props {
  searchBarHeight: number
}
export const SearchBar = ({ searchBarHeight }: Props) => {
  const { search, setSearch } = useSearch()
  const { items, setItems } = useItems()
  const { commands } = useCommands()
  const { loading } = useLoading()
  const ref = useRef<HTMLInputElement>()
  const {
    isCommandApp,
    isCommandAppDetail,
    backToRoot,
    backToCommandApp,
    setPosition,
  } = useCommandPosition()
  const handleSelect = useHandleSelect()
  const { currentCommand } = useCurrentCommand()

  const currentCommandName = currentCommand?.data?.commandName
  const isMarketplaceDetail =
    currentCommandName === 'marketplace' && isCommandAppDetail

  const isDatabaseApp = currentCommand?.data?.type === 'Database'

  useEffect(() => {
    const handleFocus = () => {
      ref.current?.focus()
    }
    appEmitter.on('FOCUS_SEARCH_BAR_INPUT', handleFocus)
    return () => {
      appEmitter.off('FOCUS_SEARCH_BAR_INPUT', handleFocus)
    }
  }, [])

  return (
    <Box
      data-tauri-drag-region
      toCenterY
      borderBottom
      borderGray200
      relative
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

      {isDatabaseApp && <DatabaseName />}
      {isDatabaseApp && <AddRowButton />}

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

            // trigger alias
            if (/^\S+\s$/.test(v)) {
              const alias = v.trim()
              const find = items.find((item) => item.data.alias === alias)
              if (find) {
                handleSelect(find)
                setSearch('')
                return
              }
            }

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

      {loading && <hr command-palette-loader="" />}
    </Box>
  )
}
