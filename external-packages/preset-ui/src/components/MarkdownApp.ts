import { EventType } from '../constants'

interface State {
  isLoading: boolean
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
    this.state = {
      isLoading: false,
      ...initialState,
    } as State
  }

  setState = (nextState: Partial<State>) => {
    const isLoading = nextState?.content ? false : this.state.isLoading
    this.state = {
      ...this.state,
      isLoading,
      ...nextState,
    }
    this.render()
  }
  run = () => {
    this.render()
    return this
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
