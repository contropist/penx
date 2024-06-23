import { IListItem, ListApp } from '@penxio/worker-ui'
import { getTodos } from './libs/getTodos'

export async function main() {
  const app = new ListApp({
    isLoading: true,
    items: [],
    isShowingDetail: true,
  }).run()

  getItems().then((items) => {
    app.setState({ items })
  })
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function getItems() {
  const data = await getTodos()

  // list items
  const items = data.map(
    (item, index) =>
      ({
        icon: index + 1,
        title: item.title,
        detail: [
          {
            label: 'ID',
            value: item.id,
          },

          {
            label: 'Title',
            value: item.title,
          },
          {
            label: 'Completed',
            value: item.completed ? 'Done' : 'Pending',
          },
        ],
        // detail: async () => {
        //   return [
        //     {
        //       label: 'ID',
        //       value: item.id,
        //     },

        //     {
        //       label: 'Title',
        //       value: item.title,
        //     },
        //     {
        //       label: 'Completed',
        //       value: item.completed ? 'Done' : 'Pending',
        //     },
        //   ]
        // },
        actions: [
          {
            type: 'CopyToClipboard',
            content: item.title,
          },
        ],
      }) as IListItem,
  )
  return items
}
