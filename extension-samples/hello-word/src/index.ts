import { MarkdownBuilder, render, renderLoading, request } from 'penx'

export async function main() {
  renderLoading()

  const res = await request({
    method: 'GET',
    url: 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT',
  })
  console.log('res=====:', res)

  render(
    new MarkdownBuilder('# Hello world\n' + JSON.stringify(res.data, null, 2)),
  )
}
