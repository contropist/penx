import { EventType } from '../constants'
import { ActionItem, isCustomAction, isSubmitForm } from '../types'
import { isCustomActionPayload } from './ListApp'

interface IField {
  label: string
  name: string
  component: 'Input'
  value?: any
}

interface OnSubmitActionPayload {
  type: 'action--on-submit'
  actionIndex: number
  values: any
}

export function isOnSubmitPayload(value: any): value is OnSubmitActionPayload {
  return value?.type === 'action--on-submit' && Reflect.has(value, 'values')
}

interface State {
  isLoading: boolean
  fields: IField[]
  actions?: ActionItem[]
}

export interface FormJSON extends State {
  type: 'form'
}

export function isFormApp(json: any): json is FormJSON {
  return json.type === 'form'
}

export class FormApp {
  state: State

  constructor(initialState: Partial<State>) {
    this.state = {
      fields: [],
      isLoading: false,
      ...initialState,
    } as State
  }

  setState = (nextState: Partial<State>) => {
    this.state = {
      ...this.state,
      ...nextState,
    }
    this.render()
  }

  run = () => {
    this.render()

    self.addEventListener('message', async (event) => {
      if (isOnSubmitPayload(event.data)) {
        const action = this.state.actions![event.data.actionIndex]
        isSubmitForm(action) && action.onSubmit(event.data.values)
      }
    })
    return this
  }

  private formatState(state: State) {
    const newActions = state.actions?.map((action) => {
      if (isSubmitForm(action)) {
        const { onSubmit, ...rest } = action
        return rest
      }

      if (isCustomAction(action)) {
        const { onClick, ...rest } = action
        return rest
      }
      return action
    })

    return { ...this.state, actions: newActions }
  }

  private render = () => {
    postMessage({
      type: EventType.Render,
      payload: {
        type: 'form',
        ...this.state,
        ...this.formatState(this.state),
      },
    })
  }
}
