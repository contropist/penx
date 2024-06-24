import { IListItem } from '@penxio/worker-ui'
import { FilterItem, IDatabaseNode } from '@penx/model-types'

export interface ICommandItem extends IListItem {
  keywords: string[]
  data: {
    type: 'Database' | 'Command' | 'Application'
    alias: string
    database: IDatabaseNode
    assets: Record<string, string>
    filters: Record<string, FilterItem[]>
    mode: 'preset-ui' | 'custom-ui' | 'no-view'
    commandName: string
    extensionSlug: string
    extensionIcon: string
    isDeveloping: boolean

    applicationPath: string
    isApplication: boolean
    appIconPath?: string
  }
}
