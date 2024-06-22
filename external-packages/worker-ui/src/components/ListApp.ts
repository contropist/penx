import * as Comlink from '@huakunshen/comlink'
import { api } from '../api'
import { EventType } from '../constants'
import { ActionItem, IAccessory, isCustomAction } from '../types'
import { DataListBuilder, DataListJSON } from './DataListBuilder'

type URL = string
type Asset = string
type Icon = string

export type ImageLike = URL | Asset | Icon | number

export interface ListHeading {
  type: 'list-heading'
  title: string
}

export interface ObjectIcon {
  value: ImageLike | undefined | null
  tooltip?: string
  color?: string
  bg?: string
}

export interface IListItem {
  id?: string

  type?: 'list-item' | 'list-heading'

  title:
    | string
    | {
        value: string
        tooltip?: string | null
      }

  subtitle?:
    | string
    | {
        value?: string | null
        tooltip?: string | null
      }

  icon?: ImageLike | ObjectIcon

  actions?: ActionItem[]

  detail?: DataListBuilder

  extra?: IAccessory[]

  data?: any
}

export type ListItemJSON = Omit<IListItem, 'detail'> & {
  detail: DataListJSON
}

export interface ListJSON {
  type: 'list'
  isLoading: boolean
  isShowingDetail: boolean
  filtering: boolean
  titleLayout: 'column' | 'row'
  items: ListItemJSON[]
}

export function isListJSON(json: any): json is ListJSON {
  return json.type === 'list'
}

export function isObjectIcon(icon: any): icon is ObjectIcon {
  return typeof icon === 'object' && icon?.value !== undefined
}

interface State {
  items: IListItem[]
  isShowingDetail: boolean
  isLoading: boolean
  filtering: boolean
  titleLayout: 'column' | 'row'
}

export class ListApp {
  state: State

  constructor(initialState: Partial<State>) {
    this.state = {
      items: [],
      isShowingDetail: false,
      isLoading: false,
      filtering: true,
      titleLayout: 'row',
      ...initialState,
    } as State

    this.render()
  }

  setState = (nextState: Partial<State>) => {
    this.state = {
      ...this.state,
      ...nextState,
    }
    this.render()
  }

  private formatAction(state: State) {
    const newItems = state.items.map((item) => {
      return {
        ...item,
        actions: item.actions?.map((action, index) => {
          if (isCustomAction(action)) {
            const { onClick, ...rest } = action
            console.log('=========onClick========', onClick)
            api[`CustomAction_${index}`] = onClick
            Comlink.expose(api)
            return rest
          }
          return action
        }),
      }
    })
    return {
      ...this.state,
      items: newItems,
    }
  }

  private render = () => {
    postMessage({
      type: EventType.Render,
      payload: {
        type: 'list',
        ...this.formatAction(this.state),
      },
    })
  }
}
