import { IListItem, ListBuilder, onSearchChange, render } from 'penx'
import { toBase64 } from './libs/toBase64'
import { toString } from './libs/toString'

export async function main() {
  const items = await getItems()
  const list = new ListBuilder(items).setFiltering(false)

  onSearchChange(async (value) => {
    const newItems = await getItems(value)
    list.setItems(newItems)
    render(list)
  })

  render(list)
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
