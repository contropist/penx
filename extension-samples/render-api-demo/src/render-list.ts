import {
  DataListBuilder,
  IListItem,
  ListBuilder,
  onSearchChange,
  render,
} from 'penx'

export function main() {
  const items: IListItem[] = [
    // {
    //   type: 'list-heading',
    //   title: 'Recent',
    // },
    {
      title: 'First Item',
      subtitle: 'This is the first item',
      actions: [
        {
          type: 'CopyToClipboard',
          content: 'First Item',
        },
      ],
      detail: new DataListBuilder([
        { label: 'Name', value: 'Item 1' },
        { label: 'Color', value: 'Red' },
      ]),
      extra: [
        {
          text: '100',
        },
        {
          icon: 'logo.svg',
          text: 'hello',
        },
      ],
    },
    {
      title: 'Second Item',
      subtitle: 'This is the second item',
      actions: [
        {
          type: 'CopyToClipboard',
          content: 'Second Item',
        },
      ],
      detail: new DataListBuilder([
        { label: 'Name', value: 'Item 2' },
        { label: 'Color', value: 'green' },
      ]),
      extra: [
        {
          tag: {
            value: 'blue',
          },
        },
      ],
    },
    // {
    //   type: 'list-heading',
    //   title: 'Suggestions',
    // },
    {
      title: 'Third Item',
      subtitle: 'This is the third item',
      actions: [
        {
          type: 'CopyToClipboard',
          content: 'Third Item',
        },
      ],
    },
  ]
  const list = new ListBuilder()
    .setItems(items)
    .setShowingDetail(false)
    .setFiltering(true)

  onSearchChange((value) => {
    return
    const filteredItems = items.filter((item) => {
      if (!value) return true
      return item.title
        .toString()
        .toLocaleLowerCase()
        .includes(value.toLowerCase())
    })

    list.setItems(filteredItems)
    render(list)
  })

  render(list)
}
