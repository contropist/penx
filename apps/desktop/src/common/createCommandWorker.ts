import { Command } from '@penx/model-types'

export function createCommandWorker(command: Command, input = '') {
  const extraCode = `
    self.onmessage = (event) => {
      if (event.data === 'BACK_TO_ROOT') {
        self.close()
      }
    }
    self.input = '${input}';
  `

  let blob = new Blob([command?.code + extraCode], {
    type: 'application/javascript',
  })
  const url = URL.createObjectURL(blob)
  return new Worker(url)
}
