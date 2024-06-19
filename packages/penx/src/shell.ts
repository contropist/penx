import { Channel } from '@tauri-apps/api/core'
import * as shellx from 'tauri-plugin-shellx-api'
import { IOPayload } from 'tauri-plugin-shellx-api'
import { constructAPI } from './common'
import { EventType } from './constants'

// export class Child extends shellx.Child {

// }

export type ShellxExecutePayload = {
  program: string
  args: string[]
  options: shellx.InternalSpawnOptions
}

const shellxExecute = constructAPI<
  ShellxExecutePayload,
  shellx.ChildProcess<IOPayload>
>(EventType.ShellxExecute)

export class Command<O extends IOPayload> extends shellx.Command<O> {
  static create<O extends IOPayload>(
    program: string,
    args: string | string[] = [],
    options?: shellx.SpawnOptions,
  ): Command<O> {
    return new Command(program, args, options)
  }

  async spawn(): Promise<shellx.Child> {
    // const program = this.program
    const args = this.args
    // const options = this.options

    if (typeof args === 'object') {
      Object.freeze(args)
    }

    const onEvent = new Channel<shellx.CommandEvent<O>>()
    onEvent.onmessage = (event) => {
      switch (event.event) {
        case 'Error':
          this.emit('error', event.payload)
          break
        case 'Terminated':
          this.emit('close', event.payload)
          break
        case 'Stdout':
          this.stdout.emit('data', event.payload)
          break
        case 'Stderr':
          this.stderr.emit('data', event.payload)
          break
      }
    }

    // return await invoke<number>('plugin:shellx|spawn', {
    //   program,
    //   args,
    //   options,
    //   onEvent,
    // }).then((pid) => new shellx.Child(pid))
    throw new Error('Not implemented')
  }

  async execute(): Promise<shellx.ChildProcess<O>> {
    console.log('execute')

    const program = this.program
    const args = this.args
    const options = this.options

    if (typeof args === 'object') {
      Object.freeze(args)
    }
    return shellxExecute({ program, args, options }) as Promise<
      shellx.ChildProcess<O>
    >
  }
}
