// import { z } from 'zod'
import { constructAPI } from './common'
import { EventType } from './constants'

export const clipboard = {
  readText: constructAPI<undefined, string>(
    EventType.ClipboardReadText,
    EventType.ClipboardReadTextResult,
  ),
  writeText: constructAPI<string, void>(
    EventType.ClipboardWriteText,
    EventType.ClipboardWriteTextResult,
  ),
  // writeText(text: string): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     const channel = new MessageChannel()

  //     channel.port1.onmessage = (
  //       event: MessageEvent<{ type: string; result: string }>,
  //     ) => {
  //       if (event.data.type === EventType.ClipboardWriteTextResult) {
  //         resolve()
  //       } else {
  //         reject(new Error('Unexpected message type'))
  //       }
  //     }

  //     self.postMessage(
  //       {
  //         type: EventType.ClipboardWriteText,
  //         text: text,
  //       },
  //       [channel.port2] as any,
  //     )
  //   })
  // },
}
