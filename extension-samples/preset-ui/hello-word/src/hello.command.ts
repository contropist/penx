import { MarkdownApp } from '@penxio/worker-ui'

export async function main() {
  const app = new MarkdownApp({ content: '# Hello world...' })

  setTimeout(() => {
    app.setState({ content: '# Hi penx...' })
  }, 2000)
}
