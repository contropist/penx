import { MarkdownApp } from '@penxio/worker-ui'

export function main() {
  let counter = 1

  const app = new MarkdownApp({ content: `## ${counter}` }).run()

  setInterval(() => {
    counter++
    app.setState({ content: `## ${counter}` })
  }, 1000)
}
