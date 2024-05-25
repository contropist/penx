import {
  IListItem,
  ListBuilder,
  onFilterChange,
  render,
  renderLoading,
} from 'penx'
import { getData } from './libs/getData'

export async function main() {
  renderLoading({ type: 'spinner' })

  const items = await getItems()
  const list = new ListBuilder(items)

  onFilterChange(async (filters) => {
    renderLoading({ type: 'spinner' })
    const newItems = await getItems(filters.type)
    list.setItems(newItems)
    render(list)
  })

  render(list)
}

async function getItems(type = 'top') {
  const data = await getData(type)

  // list items
  const items = data.map(
    (item, index) =>
      ({
        icon: index + 3,
        title: item.title,
        actions: [
          {
            type: 'OpenInBrowser',
            url: item.url,
          },
        ],
        extra: [
          {
            icon: 'comment.svg',
            text: item.descendants || 0,
          },
          {
            icon: 'up.svg',
            text: item.score || 0,
          },
        ],
      }) as IListItem,
  )
  return items
}
