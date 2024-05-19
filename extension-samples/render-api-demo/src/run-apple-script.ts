import { renderMarkdown } from 'penx'

const content = `
# hello world!

The Markdown elements outlined in the original design document.

## Lists

- First item
- Second item
- Third item
- Fourth item

![penx-logo](https://www.penx.io/images/logo-128.png)
`
export async function main() {
  renderMarkdown(content)
}
