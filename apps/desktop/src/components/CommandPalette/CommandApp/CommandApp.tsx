import { memo, useEffect } from 'react'
import isEqual from 'react-fast-compare'
import { Box } from '@fower/react'
import { IListItem, isListJSON, isMarkdownJSON } from 'penx'
import { Divider, Spinner } from 'uikit'
import { CommandAppUI } from '~/hooks/useCommandAppUI'
import { useValue } from '~/hooks/useValue'
import { StyledCommandGroup } from '../CommandComponents'
import { ListItemUI } from '../ListItemUI'
import { DataListItem } from './IDataListItem'
import { Markdown } from './Markdown'
import { Marketplace } from './Marketplace'

interface CommandAppProps {
  currentCommand: IListItem
  ui: CommandAppUI
  loading: boolean
}

export const CommandApp = memo(
  function CommandApp({ loading, ui, currentCommand }: CommandAppProps) {
    // console.log('=======currentCommand:ui...:', ui)

    const { value, setValue } = useValue()

    useEffect(() => {
      // TODO: need improve
      if (ui.type === 'render' && isListJSON(ui.component)) {
        const find = ui.component.items.find((item) => item.title === value)
        if (!find) {
          const firstItem = ui.component.items.find((item) => !item.type)
          firstItem && setValue(firstItem.title as string)
        }
      }
    }, [ui, value, setValue])

    if (loading) {
      // return <Box>loading...</Box>
      return null
    }

    if (ui.type === 'marketplace') {
      return <Marketplace />
    }

    if (ui.type === 'render') {
      const component = ui.component as any

      if (isMarkdownJSON(component)) {
        return <Markdown content={component.content} />
      }

      if (isListJSON(component)) {
        const { items, isShowingDetail } = component
        const currentItem = items.find((item) => item.title === value)!
        const dataList = currentItem?.detail?.items || []

        return (
          <Box toLeft overflowHidden absolute top0 bottom0 left0 right0>
            <StyledCommandGroup flex-2>
              {items.map((item, index) => {
                return (
                  <ListItemUI
                    key={index}
                    index={index}
                    item={item as any} // TODO: handle any
                    onSelect={() => {
                      //
                    }}
                  />
                )
              })}
            </StyledCommandGroup>
            {isShowingDetail && (
              <>
                <Divider orientation="vertical" />
                <Box className="command-app-list-detail" flex-3 overflowAuto p3>
                  <Box text2XL fontBold mb2>
                    Detail
                  </Box>
                  <Box column gap1>
                    {dataList.map((item, index) => (
                      <DataListItem key={item.label} item={item} />
                    ))}
                  </Box>
                </Box>
              </>
            )}
          </Box>
        )
      }

      return null
    }

    if (ui.type === 'loading') {
      return (
        <Box absolute top0 right0 left0 bottom0 toCenter>
          <Spinner></Spinner>
        </Box>
      )
    }

    return null
  },
  (prev, next) => {
    if (!next.ui || Object.keys(next.ui).length === 0) return true

    if (
      // prev.loading === next.loading &&
      prev.currentCommand.data?.commandName ===
        next.currentCommand.data?.commandName &&
      isEqual(prev.ui, next.ui)
    ) {
      return true
    }
    return false
  },
)
