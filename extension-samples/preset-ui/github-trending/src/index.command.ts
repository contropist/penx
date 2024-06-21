import {
  IListItem,
  ListBuilder,
  onFilterChange,
  render,
  renderLoading,
} from 'penx'
import { getTrendingData } from './libs/getTrendingData'

export async function main() {
  renderLoading({ type: 'spinner' })

  const items = await getItems()
  const list = new ListBuilder(items).setTitleLayout('column')

  onFilterChange(async (filters) => {
    renderLoading({ type: 'spinner' })
    const newItems = await getItems(filters.since, filters.language)
    list.setItems(newItems)
    render(list)
  })

  render(list)
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
