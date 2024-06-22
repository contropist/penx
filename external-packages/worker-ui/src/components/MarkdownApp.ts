import { EventType } from '../constants'

interface MarkdownJSON {
  type: 'markdown'
  content: string
}

export function isMarkdownJSON(json: any): json is MarkdownJSON {
  return json.type === 'markdown'
}

interface Options {
  content: string
}
export class MarkdownApp {
  constructor(private data: Options) {
    postMessage({
      type: EventType.Render,
      payload: {
        type: 'markdown',
        ...data,
      },
    })
  }

  setContent = (content: string) => {
    this.data.content = content
    return this
  }
}
