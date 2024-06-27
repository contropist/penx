# Hack News example

## Introduction

This demo demonstrates how to use the Hacker News API to retrieve and present various types of news stories.

### Fetching Hacker News Stories

The extension provides a command named `index` to fetch the latest Hacker News stories. Here’s how to use it:

1. Open the command palette and type `Hack News`.
2. Select the type of news you want to view:
   - Top stories
   - New stories
   - Ask stories
   - Job stories
   - Show stories

## Code Structure

- **`manifest.json`**
- **`index.ts`**:
- **`getData.ts`**:

#### `manifest.json`

Defines the extension's metadata and commands.

```json
{
  "name": "hack-news",
  "title": "Hacker News",
  "version": "1.0.0",
  "author": "0xZion",
  "description": "This is a hack news demo.",
  "icon": "logo.svg",
  "repo": "penxio/penx",
  "commands": [
    {
      "name": "index",
      "title": "Hack News",
      "subtitle": "",
      "description": "Get the latest Hacker News stories.",
      "icon": "hot.svg",
      "filters": {
        "type": [
          {
            "label": "Top",
            "value": "top",
            "selected": true
          },
          {
            "label": "New",
            "value": "new"
          },
          {
            "label": "Ask",
            "value": "ask"
          },
          {
            "label": "Job",
            "value": "job"
          },
          {
            "label": "Show",
            "value": "show"
          }
        ]
      }
    }
  ]
}
```

#### `index.ts`

The main logic for rendering the news list and handling filter changes.

```ts
import { IListItem, ListBuilder, onFilterChange, render, renderLoading } from '@penxio/api'
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
```

#### `getData.ts`

The function to fetch data from the Hacker News API.

```ts
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
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((response) =>
            response.json(),
          ),
        )

      return Promise.all(newsPromises) as Promise<Item[]>
    })

  return newsItems
}
```
