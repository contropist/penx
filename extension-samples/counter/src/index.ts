import { renderMarkdown } from 'penx'

export function main() {
  let counter = 1

  renderMarkdown(`# ${counter}`)

  setInterval(() => {
    counter++
    renderMarkdown(`# ${counter}`)
  }, 1000)
}
