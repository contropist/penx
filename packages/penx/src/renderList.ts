import { EventType } from './constants'
import { ListHeading, ListItem } from './types'

export function renderList(items: (ListItem | ListHeading)[]) {
  postMessage({
    type: EventType.RenderList,
    items,
  })
}
