import { Box } from '@fower/react'
import { appEmitter } from '@penx/event'
import { useCommandPosition } from '~/hooks/useCommandPosition'
import { useCurrentCommand } from '~/hooks/useCurrentCommand'
import { useHandleSelect } from '~/hooks/useHandleSelect'
import { useCommands, useItems } from '~/hooks/useItems'
import { useSearch } from '~/hooks/useSearch'
import { AddRowButton } from './AddRowButton'
import { BackRootButton } from './BackRootButton'
import { CommandAppLoading } from './CommandAppLoading'
import { DatabaseName } from './DatabaseName'
import { SearchBarFilter } from './SearchBarFilter'
import { SearchInput } from './SearchInput'

interface Props {
  searchBarHeight: number
}
export const SearchBar = ({ searchBarHeight }: Props) => {
  const { search, setSearch } = useSearch()
  const { items, setItems } = useItems()
  const { commands } = useCommands()
  const { isCommandApp, isCommandAppDetail, backToRoot, backToCommandApp } = useCommandPosition()
  const handleSelect = useHandleSelect()
  const { currentCommand } = useCurrentCommand()

  const currentCommandName = currentCommand?.data?.commandName
  const isMarketplaceDetail = currentCommandName === 'marketplace' && isCommandAppDetail

  const isDatabaseApp = currentCommand?.data?.type === 'Database'

  return (
    <Box
      data-tauri-drag-region
      toCenterY
      borderBottom
      borderNeutral200
      relative
      h={searchBarHeight}
    >
      {isCommandApp && <BackRootButton pl3 mr--8 />}

      {isDatabaseApp && <DatabaseName />}
      {isDatabaseApp && <AddRowButton />}

      {!isMarketplaceDetail && (
        <SearchInput
          search={search}
          searchBarHeight={searchBarHeight}
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
      {isCommandApp && currentCommand?.data?.filters && (
        <SearchBarFilter filters={currentCommand?.data?.filters} />
      )}

      <CommandAppLoading />
    </Box>
  )
}
