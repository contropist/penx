export interface FilterItem {
  label: string
  value: string | number
  selected?: boolean
}
export interface Command {
  name: string
  title: string
  subtitle: string
  description: string
  filters?: Record<string, FilterItem[]>
  icon?: string | Record<string, string>
  code: string
  mode?: 'preset-ui' | 'custom-ui' | 'no-view'
  isBuiltIn?: boolean
  alias?: string
}

export interface IExtension {
  id: string

  spaceId: string

  name: string

  title: string

  version: string

  commands: Command[]

  assets: Record<string, string>

  icon?: string | Record<string, string>

  description?: string

  author?: string

  isDeveloping: boolean

  createdAt: Date

  updatedAt: Date
}
