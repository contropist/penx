import { EventType } from '../constants'

interface State {
  content: string
}

interface MarkdownJSON extends State {
  type: 'markdown'
}

export function isMarkdownJSON(json: any): json is MarkdownJSON {
  return json.type === 'markdown'
}

export class MarkdownApp {
  state: State

  constructor(initialState: Partial<State>) {
    this.state = { ...initialState } as State
    this.render()
  }

  setState = (nextState: Partial<State>) => {
    this.state = {
      ...this.state,
      ...nextState,
    }
    this.render()
  }

  private render = () => {
    postMessage({
      type: EventType.Render,
      payload: {
        type: 'markdown',
        ...this.state,
      },
    })
  }
}
