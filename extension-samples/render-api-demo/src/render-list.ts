import { renderList } from 'penx'

export function main() {
  // onSearchTextChange((text) => {
  //   //
  // })

  renderList([
    {
      type: 'list-heading',
      title: 'Recent',
    },
    {
      title: 'First Item',
      subtitle: 'This is the first item',
      actions: [
        {
          type: 'CopyToClipboard',
          content: 'First Item',
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
    },
    {
      type: 'list-heading',
      title: 'Suggestions',
    },
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
  ])
}
