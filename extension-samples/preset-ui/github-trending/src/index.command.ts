import { IListItem, ListApp, onFilterChange } from '@penxio/worker-ui'
import { getTrendingData } from './libs/getTrendingData'

export async function main() {
  const app = new ListApp({
    isLoading: true,
    items: [],
    titleLayout: 'column',
  }).run()

  getItems().then((items) => {
    app.setState({ items })
  })

  onFilterChange(async (filters) => {
    const newItems = await getItems(filters.since, filters.language)
    app.setState({ items: newItems })
  })
}

async function getItems(since = '', language = '') {
  const data = await getTrendingData(since, language)

  const items = data.map(
    (item, index) =>
      ({
        icon: index + 1,
        title: `${item.author}/${item.name}`,
        subtitle: item.description,
        actions: [
          {
            type: 'OpenInBrowser',
            url: item.url,
          },
        ],
        extra: [
          {
            icon: 'star.svg',
            text: item.stars,
          },
          {
            text: {
              value: `+${item.currentPeriodStars}`,
              color: 'green',
            },
          },
        ],
      }) as IListItem,
  )
  return items
}
