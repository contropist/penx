import * as shellx from 'tauri-plugin-shellx-api'
import { IOPayload } from 'tauri-plugin-shellx-api'
import { IShell } from './apiTypes'
import { clientApi } from './comlink'
import { PenxAPIResponseMessageEvent } from './common'
import { EventType } from './constants'

const shell: IShell = {
  execute: clientApi.shellExecute,
  kill: clientApi.shellKill,
  stdinWrite: clientApi.shellStdinWrite,
  open: clientApi.shellOpen,
}

export const shellOpen = shell.open

export class Child extends shellx.Child {
  write(data: IOPayload): Promise<void> {
    return shell.stdinWrite(typeof data === 'string' ? data : Array.from(data), this.pid)
  }

  kill(): Promise<void> {
    return shell.kill(this.pid)
  }
}

export class Command<O extends IOPayload> extends shellx.Command<O> {
  static create<O extends IOPayload>(
    program: string,
    args: string | string[] = [],
    options?: shellx.SpawnOptions,
  ): Command<O> {
    return new Command(program, args, options)
  }

  async spawn(): Promise<Child> {
    const program = this.program
    const args = this.args
    const options = this.options

    if (typeof args === 'object') {
      Object.freeze(args)
    }

    const eventChannel = new MessageChannel()
    eventChannel.port1.onmessage = (msgEvent: MessageEvent<shellx.CommandEvent<O>>) => {
      const event = msgEvent.data
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
    const pidReceiverChannel = new MessageChannel()
    return new Promise((resolve, reject) => {
      pidReceiverChannel.port1.onmessage = (event: PenxAPIResponseMessageEvent<number>) => {
        if (event.data.type === EventType.ShellxSpawn) {
          const pid = event.data.result
          resolve(new Child(pid))
        } else {
          reject(new Error(`Unexpected message type: ${event.data.type} (expected: ${EventType.ShellxSpawn})`))
        }
      }
      const payload = {
        program,
        args,
        options,
      }
      window.parent.postMessage(
        {
          type: EventType.ShellxSpawn,
          payload,
        },
        '*',
        [pidReceiverChannel.port2, eventChannel.port2],
      )
    })
  }

  async execute(): Promise<shellx.ChildProcess<O>> {
    console.log('execute')

    const program = this.program
    const args = this.args
    const options = this.options

    if (typeof args === 'object') {
      Object.freeze(args)
    }
    // return shellxExecute({ program, args, options }) as Promise<shellx.ChildProcess<O>>
    return shell.execute(program, args, options) as Promise<shellx.ChildProcess<O>>
  }
}
