import { EventType } from './constants'

export function runAppleScript(script: string): Promise<string> {
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
    // TODO: handle any
    self.postMessage(
      {
        type: EventType.RunAppScript,
        script,
      },
      [channel.port2] as any,
    )
  })
}
