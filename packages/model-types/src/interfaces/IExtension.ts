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
  icon?: string
  code: string
  runtime?: string
  isBuiltIn?: boolean
  alias?: string
}

export interface IExtension {
  id: string

  spaceId: string

  slug: string

  name: string

  version: string

  commands: Command[]

  assets: Record<string, string>

  icon?: string

  description?: string

  author?: string

  isDeveloping: boolean

  createdAt: Date

  updatedAt: Date
}
