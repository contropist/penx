import { MarkdownBuilder, render } from 'penx'

export async function main() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1').then(
    (res) => res.json(),
  )

  const md = new MarkdownBuilder(JSON.stringify(res, null, 2))
  render(md)
}
