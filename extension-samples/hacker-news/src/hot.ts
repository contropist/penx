import { renderList } from 'penx'

export function main() {
  renderList([
    {
      title: 'hack news #1!!',
      actions: [
        {
          type: 'OpenInBrowser',
          url: 'https://www.google.com',
        },
        {
          type: 'CopyToClipboard',
          content: 'hello world',
        },
      ],
    },
    {
      title: 'world',
    },
  ])
}
