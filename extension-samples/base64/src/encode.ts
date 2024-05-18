import { renderMarkdown } from 'penx'
import { toBase64 } from './libs/toBase64'

export function main() {
  renderMarkdown(toBase64('# hello world!'))
}
