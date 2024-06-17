import { Command } from '@penx/model-types'

export function createBuiltinWorker(command: Command) {
  let worker: Worker
  // console.log('name........:', command)

  if (command.name === 'clipboard-history') {
    worker = new Worker(
      new URL('../workers/clipboard-history.ts', import.meta.url),
      { type: 'module' },
    )
  } else if (command.name === 'today') {
    worker = new Worker(new URL('../workers/today.ts', import.meta.url), {
      type: 'module',
    })
  } else if (command.name === 'database') {
    worker = new Worker(new URL('../workers/database.ts', import.meta.url), {
      type: 'module',
    })
  } else {
    worker = new Worker(new URL('../workers/marketplace.ts', import.meta.url), {
      type: 'module',
    })
  }
  return worker
}
