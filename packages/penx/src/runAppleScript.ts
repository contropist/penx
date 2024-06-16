// import { constructAPI } from './common'
import { EventType } from './constants'

export interface RunAppleScriptOptions {
  humanReadableOutput?: boolean
}

// type Payload = {
//   script: string
//   argsOrOptions?: string[] | RunAppleScriptOptions
//   options?: RunAppleScriptOptions
// }

// export const runAppleScript = constructAPI<Payload, string>(
//   EventType.RunAppleScript,
//   EventType.RunAppleScriptResult,
// )

export function runAppleScript(
  script: string,
  argsOrOptions?: string[] | RunAppleScriptOptions,
  options?: RunAppleScriptOptions,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel()

    channel.port1.onmessage = (
      event: MessageEvent<{ type: string; result: string }>,
    ) => {
      if (event.data.type === EventType.RunAppleScriptResult) {
        resolve(event.data.result)
      } else {
        reject(new Error('Unexpected message type'))
      }
    }

    let args: string[] = []
    let opts: RunAppleScriptOptions

    if (Array.isArray(argsOrOptions)) {
      args = argsOrOptions
      opts = options as RunAppleScriptOptions
    } else {
      opts = argsOrOptions as RunAppleScriptOptions
    }

    if (!opts || !Reflect.has(opts, 'humanReadableOutput')) {
      if (!opts) opts = {}
      opts.humanReadableOutput = true
    }

    // TODO: handle any
    self.postMessage(
      {
        type: EventType.RunAppleScript,
        script,
        args,
        options: opts,
      },
      [channel.port2] as any,
    )
  })
}
