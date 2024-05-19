import { EventType } from './constants'

export function renderMarkdown(content: string) {
  postMessage({
    type: EventType.RenderMarkdown,
    content,
  })
}
