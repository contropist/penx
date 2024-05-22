import { EventType } from './constants'

export function onSearchChange(fn: (value: string) => void) {
  const channel = new MessageChannel()

  channel.port1.onmessage = (
    event: MessageEvent<{ type: string; value: string }>,
  ) => {
    fn(event.data.value)
  }

  // TODO: handle any
  self.postMessage(
    {
      type: EventType.InitOnSearchChange,
    },
    [channel.port2] as any,
  )
}
