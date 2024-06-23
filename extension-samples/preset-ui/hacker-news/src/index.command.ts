import { IListItem, ListApp } from '@penxio/worker-ui'
import { getData } from './libs/getData'

export async function main() {
  const app = new ListApp({ isLoading: true, items: [] }).run()

  getItems().then((items) => {
    app.setState({ items })
  })

  // onFilterChange(async (filters) => {
  // const newItems = await getItems(filters.type)
  // app.setItems(newItems)
  // })
}

async function getItems(type = 'top') {
  const data = await getData(type)

  // list items
  const items = data.map(
    (item, index) =>
      ({
        icon: index + 1,
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
