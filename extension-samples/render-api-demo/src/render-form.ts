import { MarkdownBuilder, render } from 'penx'

export async function main() {
  fetch('https://api.binance.com/api/v3/ticker/price')
    .then((res) => res.json())
    .then((res) => {
      console.log('res========x', res)
    })

  render(new MarkdownBuilder('# hello world!'))
}
