export type RouteName =
  | 'TRASH'
  | 'NODE'
  | 'TODOS'
  | 'DATABASES'
  | 'CREATE_SPACE'
  | 'WEB3_PROFILE'
  | 'RESTORE_BACKUP'
  | 'SETTINGS'
  | 'MARKETPLACE'
  | 'LOCAL_BACKUP'
  | 'ACCOUNT_SETTINGS'
  | 'RECOVER_PHRASE'
  | 'ACCOUNT'

export type IRouterStore = {
  name: RouteName
  params: Record<string, any>
}

export type SettingsRouterStore = {
  name: RouteName
  params: Record<string, any>
}

export type Command = {
  id: string
  name: string
  pluginId?: string
  handler: () => void
}
