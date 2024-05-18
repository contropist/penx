import { ListItem, renderList, renderLoading } from 'penx'

interface Item {
  by: string
  descendants: number // comment
  id: number
  kids: number[]
  score: number
  time: number
  title: string
  type: string
  url: string
}

export function main() {
  const apiUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json'
  async function main() {
    renderLoading({ type: 'spinner' })
    const newsItems = await fetch(apiUrl)
      .then((response) => response.json())
      .then((topStoryIds: number[]) => {
        const newsPromises = topStoryIds
          .slice(0, 10)
          .map((id) =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
              (response) => response.json(),
            ),
          )

        return Promise.all(newsPromises) as Promise<Item[]>
      })

    const listItems = newsItems.map(
      (item, index) =>
        ({
          icon: index + 1,
          title: item.title,
          actions: [
            {
              type: 'OpenInBrowser',
              url: 'https://www.google.com',
            },
          ],
        }) as ListItem,
    )

    renderList(listItems)
  }
}
