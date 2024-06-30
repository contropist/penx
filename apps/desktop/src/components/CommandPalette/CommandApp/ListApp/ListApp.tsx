import { memo, useEffect } from 'react'
import { Box } from '@fower/react'
import { ListJSON } from '@penxio/preset-ui'
import { getCurrent } from '@tauri-apps/api/webviewWindow'
import { open } from '@tauri-apps/plugin-shell'
import clipboard from 'tauri-plugin-clipboard-api'
import { workerStore } from '~/common/workerStore'
import { useSearch } from '~/hooks/useSearch'
import { useValue } from '~/hooks/useValue'
import { StyledCommandGroup } from '../../CommandComponents'
import { Detail } from './Detail'
import { ListItem } from './domains/ListItem.domain'
import { ListItemUI } from './ListItemUI'

interface ListAppProps {
  component: ListJSON
}

export const ListApp = memo(function ListApp({ component }: ListAppProps) {
  const { value, setValue } = useValue()
  const { items, isShowingDetail, filtering, titleLayout } = component
  const currentItem = items.find((item) => item.title === value)!
  const { search } = useSearch()

  const filteredItems = !filtering
    ? items
    : items.filter((item, index) => {
        const listItem = new ListItem(item, index)
        return listItem.title.toLowerCase().includes(search.toLowerCase())
      })

  useEffect(() => {
    if (!items.length) return
    const find = items.find((_, index) => String(index) === value)

    if (!find) {
      const firstItem = new ListItem(items[0], 0)
      firstItem && setValue(firstItem.value)
    }
  }, [items, value, setValue])

  useEffect(() => {
    if (value && isShowingDetail && items.length) {
      const itemIndex = items.findIndex((item) => item.title === value)!
      const item = items[itemIndex] as any
      if (itemIndex !== -1 && item.detail == 'functionDetail') {
        workerStore.currentWorker!.postMessage({
          type: 'onItemSelect',
          itemIndex,
          item,
        })
      }
    }
  }, [value, isShowingDetail, items])

  const listJSX = (
    <StyledCommandGroup
      flex-2
      overflowAuto
      relative
      p2
      style={{
        overscrollBehavior: 'contain',
        scrollPaddingBlockEnd: 8,
        scrollPaddingBlockStart: 8,
      }}
    >
      {filteredItems.sort().map((raw, index) => {
        const item = new ListItem(raw, index)
        return (
          <ListItemUI
            key={index}
            index={index}
            titleLayout={titleLayout}
            item={item}
            onSelect={async () => {
              if (raw.actions?.[0]) {
                const defaultAction = raw.actions?.[0]
                if (defaultAction.type === 'OpenInBrowser') {
                  open(defaultAction.url)
                  const appWindow = getCurrent()
                  appWindow.hide()
                }
                if (defaultAction.type === 'CopyToClipboard') {
                  await clipboard.writeText(defaultAction.content)
                }
              }
              // console.log('list item======:', item)

              if (isShowingDetail) {
              }
            }}
          />
        )
      })}
    </StyledCommandGroup>
  )

  if (!isShowingDetail) {
    return listJSX
  }
  return (
    <Box toLeft overflowHidden absolute top0 bottom0 left0 right0>
      {listJSX}
      <Detail detail={currentItem?.detail} />
    </Box>
  )
})
