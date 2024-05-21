import { IAccessory } from '../types'
import { DataListBuilder, DataListJSON } from './DataListBuilder'

type URL = string
type Asset = string
type Icon = string

export type ImageLike = URL | Asset | Icon | number

export type OpenInBrowser = {
  type: 'OpenInBrowser'
  title?: string
  url: string
}

export type CopyToClipboard = {
  type: 'CopyToClipboard'
  title?: string
  content: string
}

export type ListItemAction = OpenInBrowser | CopyToClipboard

export interface ListHeading {
  type: 'list-heading'
  title: string
}

export interface IListItem {
  id?: string

  type?: 'command' | 'list-item' | 'list-heading'

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

  icon?:
    | ImageLike
    | {
        value: ImageLike | undefined | null
        tooltip: string
      }

  actions?: ListItemAction[]

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
  items: ListItemJSON[]
}

export function isListJSON(json: any): json is ListJSON {
  return json.type === 'list'
}

export class ListBuilder {
  isShowingDetail = false
  isLoading = false

  constructor(public items: IListItem[] = []) {}

  setItems = (items: IListItem[]) => {
    this.items = items
    return this
  }

  addItem = (item: IListItem) => {
    this.items.push(item)
    return this
  }

  setLoading = (loading: boolean) => {
    this.isLoading = loading
    return this
  }

  setShowingDetail = (showingDetail: boolean) => {
    this.isShowingDetail = showingDetail
    return this
  }

  toJSON(): ListJSON {
    return {
      type: 'list',
      isLoading: this.isLoading,
      isShowingDetail: this.isShowingDetail,
      items: this.items.map((item) => {
        if (!item.detail) return item as any as ListItemJSON
        return {
          ...item,
          // TODO: handle array detail
          detail: item.detail.toJSON(),
        }
      }),
    }
  }
}
