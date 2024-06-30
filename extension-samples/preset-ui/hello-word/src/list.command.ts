import { IListItem, ListApp } from '@penxio/preset-ui'
import { getHackNewsData } from './libs/getHackNewsData'

export async function main() {
  const app = new ListApp({ isLoading: true, items: [] }).run()

  getItems().then((items) => {
    app.setState({ items })
  })
}

async function getItems(type = 'top') {
  const data = await getHackNewsData(type)

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
          {
            type: 'CopyToClipboard',
            content: item.title,
          },
          {
            type: 'CustomAction',
            title: 'CustomAction 1',
            onClick: () => {
              console.log('CustomAction 1.........', Math.random())
            },
          },
          {
            type: 'CustomAction',
            title: 'CustomAction 2',
            onClick: () => {
              console.log('CustomAction 2.........', Math.random())
            },
          },
        ],
        extra: [
          {
            icon: 'comment.svg',
            text: item.descendants,
          },
          {
            icon: 'up.svg',
            text: item.score,
          },
        ],
      }) as IListItem,
  )
  return items
}
