import { invoke } from '@tauri-apps/api/core'
import {
  constructAPIExecuter,
  EventType,
  RunAppleScriptOptions,
  RunAppleScriptPayload,
} from 'penx'

export function handleRunAppleScript(event: MessageEvent) {
  return constructAPIExecuter<RunAppleScriptPayload, string>(
    EventType.RunAppleScript,
    EventType.RunAppleScriptResult,
    async (payload) => {
      let args: string[] = []
      let opts: RunAppleScriptOptions

      if (Array.isArray(payload.argsOrOptions)) {
        args = payload.argsOrOptions
        opts = payload.options as RunAppleScriptOptions
      } else {
        opts = payload.argsOrOptions as RunAppleScriptOptions
      }

      if (!opts || !Reflect.has(opts, 'humanReadableOutput')) {
        if (!opts) opts = {}
        opts.humanReadableOutput = true
      }

      return await invoke('run_applescript', {
        script: payload.script,
        args: args,
        options: opts,
      })
    },
  )(event)
}
