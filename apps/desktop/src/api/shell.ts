import { EventType, PenxAPIRequestMessageEvent } from '@penxio/api'
import { Channel, invoke } from '@tauri-apps/api/core'
import * as shellx from 'tauri-plugin-shellx-api'

export function handleShellxSpawn(
  event: PenxAPIRequestMessageEvent<{
    program: string
    args: string[]
    options: shellx.InternalSpawnOptions
  }>,
) {
  if (event.data.type !== EventType.ShellxSpawn) {
    return
  }
  const payload = event.data.payload
  const ports = event.ports
  if (ports.length !== 2) {
    throw new Error('Expected 2 ports. One for pid, one for child process events.')
  }
  const [pidPort, eventPort] = ports
  const onEvent = new Channel<shellx.CommandEvent<shellx.IOPayload>>()
  onEvent.onmessage = (evt) => {
    switch (evt.event) {
      case 'Error':
        eventPort.postMessage({
          event: 'Error',
          payload: evt.payload,
        } as shellx.CommandEvent<shellx.IOPayload>)
        break
      case 'Terminated':
        eventPort.postMessage({
          event: 'Terminated',
          payload: evt.payload,
        } as shellx.CommandEvent<shellx.IOPayload>)
        break
      case 'Stdout':
        eventPort.postMessage({
          event: 'Stdout',
          payload: evt.payload,
        } as shellx.CommandEvent<shellx.IOPayload>)
        break
      case 'Stderr':
        eventPort.postMessage({
          event: 'Stderr',
          payload: evt.payload,
        } as shellx.CommandEvent<shellx.IOPayload>)
        break
    }
  }
  return invoke<number>('plugin:shellx|spawn', {
    program: payload.program,
    args: payload.args,
    options: payload.options,
    onEvent,
  }).then((pid) => {
    pidPort.postMessage({
      type: EventType.ShellxSpawn,
      result: pid,
    })
  })
}
