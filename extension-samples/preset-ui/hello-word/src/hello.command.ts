import { MarkdownApp } from '@penxio/worker-ui'

export async function main() {
  new MarkdownApp({ content: '# Hello world...' }).run()
}
