import * as shellx from 'tauri-plugin-shellx-api'
import { IOPayload } from 'tauri-plugin-shellx-api'
import { constructAPI, PenxAPIResponseMessageEvent } from './common'
import { EventType } from './constants'

const shellxExecute = constructAPI<
  ShellxExecutePayload,
  shellx.ChildProcess<IOPayload>
>(EventType.ShellxExecute)

const shellxKill = constructAPI<{ cmd: string; pid: number }, void>(
  EventType.ShellxKill,
)

const shellxStdinWrite = constructAPI<
  { buffer: string | number[]; pid: number },
  void
>(EventType.ShellxStdinWrite)

export const shellxOpen = constructAPI<
  { path: string; openWith?: string },
  void
>(EventType.ShellxOpen)

export class Child extends shellx.Child {
  write(data: IOPayload): Promise<void> {
    return shellxStdinWrite({
      pid: this.pid,
      // correctly serialize Uint8Arrays
      buffer: typeof data === 'string' ? data : Array.from(data),
    })
  }

  kill(): Promise<void> {
    return shellxKill({
      cmd: 'killChild',
      pid: this.pid,
    })
  }
}

export type ShellxExecutePayload = {
  program: string
  args: string[]
  options: shellx.InternalSpawnOptions
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
    eventChannel.port1.onmessage = (
      msgEvent: MessageEvent<shellx.CommandEvent<O>>,
    ) => {
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
      pidReceiverChannel.port1.onmessage = (
        event: PenxAPIResponseMessageEvent<number>,
      ) => {
        if (event.data.type === EventType.ShellxSpawn) {
          const pid = event.data.result
          resolve(new Child(pid))
        } else {
          reject(
            new Error(
              `Unexpected message type: ${event.data.type} (expected: ${EventType.ShellxSpawn})`,
            ),
          )
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
    return shellxExecute({ program, args, options }) as Promise<
      shellx.ChildProcess<O>
    >
  }
}
