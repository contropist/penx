import { renderMarkdown } from 'penx'

let counter = 0

renderMarkdown(`# ${counter}`)

setInterval(() => {
  counter++
  renderMarkdown(`# ${counter}`)
}, 1000)
