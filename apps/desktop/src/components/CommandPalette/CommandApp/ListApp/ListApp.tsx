import { memo, useEffect } from 'react'
import { Box } from '@fower/react'
import { ListJSON } from '@penxio/worker-ui'
import { getCurrent } from '@tauri-apps/api/webviewWindow'
import { open } from '@tauri-apps/plugin-shell'
import clipboard from 'tauri-plugin-clipboard-api'
import { workerStore } from '~/common/workerStore'
import { useSearch } from '~/hooks/useSearch'
import { useValue } from '~/hooks/useValue'
import { StyledCommandGroup } from '../../CommandComponents'
import { ListItemUI } from '../../ListItemUI'
import { Detail } from './Detail'

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
    : items.filter((item) => {
        return item.title.toString().toLowerCase().includes(search.toLowerCase())
      })

  useEffect(() => {
    const find = component.items.find((item) => item.title === value)
    if (!find) {
      const firstItem = component.items.find((item) => !item.type)
      firstItem && setValue(firstItem.title as string)
    }
  }, [component, value, setValue])

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
      {filteredItems.sort().map((item, index) => {
        return (
          <ListItemUI
            // key={index}
            key={item.title.toString()}
            index={index}
            titleLayout={titleLayout}
            isListApp={true}
            item={item as any} // TODO: handle any
            onSelect={async () => {
              if (item.actions?.[0]) {
                const defaultAction = item.actions?.[0]
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
