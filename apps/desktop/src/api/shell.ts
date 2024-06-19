import { invoke } from '@tauri-apps/api/core'
import { constructAPIExecuter, EventType, ShellxExecutePayload } from 'penx'
import * as shellx from 'tauri-plugin-shellx-api'

export function handleShellxExecute<O extends shellx.IOPayload>(
  event: MessageEvent,
) {
  return constructAPIExecuter<
    ShellxExecutePayload,
    shellx.ChildProcess<shellx.IOPayload>
  >(EventType.ShellxExecute, (payload) => {
    console.log('ShellxExecute', payload)

    return invoke<shellx.ChildProcess<O>>('plugin:shellx|execute', {
      program: payload.program,
      args: payload.args,
      options: payload.options,
    })
  })(event)
}
