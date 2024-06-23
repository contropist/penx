interface Item {
  author: string
  name: string
  avatar: string
  description: string
  url: string
  language: string
  languageColor: string
  stars: number
  forks: number
  currentPeriodStars: number
  builtBy: Array<{
    username: string
    href: string
    avatar: string
  }>
}

// https://gtrend.yapie.me/repositories?since=daily&language=ts

export async function getTrendingData(
  since: string = 'daily',
  language: string = '',
) {
  let apiUrl = `https://gtrend.yapie.me/repositories?since=${since}`

  if (language) apiUrl += `&language=${language}`

  const newsItems: Item[] = await fetch(apiUrl).then((response) =>
    response.json(),
  )
  return newsItems
}
