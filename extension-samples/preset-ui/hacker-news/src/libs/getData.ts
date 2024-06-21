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

export async function getData(type: string) {
  const apiUrl = `https://hacker-news.firebaseio.com/v0/${type}stories.json`

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

  return newsItems
}
