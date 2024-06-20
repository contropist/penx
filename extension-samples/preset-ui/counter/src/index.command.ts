import { MarkdownBuilder, render } from 'penx'

export function main() {
  let counter = 1

  render(new MarkdownBuilder(`# ${counter}`))

  setInterval(() => {
    counter++
    render(new MarkdownBuilder(`# ${counter}`))
  }, 1000)
}
