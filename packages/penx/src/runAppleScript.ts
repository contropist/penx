import { EventType } from './constants'

export interface RunAppleScriptOptions {
  humanReadableOutput?: boolean
}

export function runAppleScript(
  script: string,
  options?: RunAppleScriptOptions,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel()

    channel.port1.onmessage = (
      event: MessageEvent<{ type: string; result: string }>,
    ) => {
      if (event.data.type === EventType.RunAppScriptResult) {
        resolve(event.data.result)
      } else {
        reject(new Error('Unexpected message type'))
      }
    }

    let opt = {} as RunAppleScriptOptions

    if (!options || !Reflect.has(options, 'humanReadableOutput')) {
      opt.humanReadableOutput = true
    }

    // TODO: handle any
    self.postMessage(
      {
        type: EventType.RunAppScript,
        script,
        options: opt,
      },
      [channel.port2] as any,
    )
  })
}
