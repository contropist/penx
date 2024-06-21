import { MarkdownBuilder, render } from '@penxio/worker-ui'

export async function main() {
  render(new MarkdownBuilder('# Hello world...'))
}
