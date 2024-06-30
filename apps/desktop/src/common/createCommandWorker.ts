import { Command } from '@penx/model'

export function createCommandWorker(command: Command, input = '') {
  const extraCode = `
    self.addEventListener('message', async (event) => {
      // console.log('=======event:', event.data)
      if (event.data === 'BACK_TO_ROOT') {
        self.close()
      }
    })

    self.input = '${input}';
  `

  let blob = new Blob([command?.code + extraCode], {
    type: 'application/javascript',
  })
  const url = URL.createObjectURL(blob)
  return new Worker(url)
}
