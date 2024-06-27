import { IListItem, ListApp, onSearchChange } from '@penxio/preset-ui'
import { toBase64 } from './libs/toBase64'
import { toString } from './libs/toString'

export async function main() {
  const app = new ListApp({
    isLoading: true,
    items: [],
    filtering: false,
  }).run()

  getItems().then((items) => {
    app.setState({ items })
  })

  onSearchChange(async (value) => {
    const newItems = await getItems(value)
    app.setState({ items: newItems })
  })
}

async function getItems(text: string = '') {
  const encoded = toBase64(text)
  const decoded = toString(text)
  const items: IListItem[] = [
    {
      title: 'Encoded',
      icon: 'code.svg',
      subtitle: encoded,
      actions: [
        {
          type: 'CopyToClipboard',
          content: encoded,
        },
      ],
    },
    {
      title: 'Decoded',
      icon: 'code.svg',
      subtitle: decoded,
      actions: [
        {
          type: 'CopyToClipboard',
          content: decoded,
        },
      ],
    },
  ]
  return items
}
