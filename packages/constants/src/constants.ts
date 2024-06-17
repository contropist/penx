const env: Record<string, string> = (() => {
  if (typeof process !== 'undefined') return process.env
  if (typeof (import.meta as any).env !== 'undefined') {
    return (import.meta as any)?.env
  }
  return {}
})()

export const DEFAULT_THEME = env.NEXT_PUBLIC_DEFAULT_THEME || 'dark'
export const FOWER_THEME_MODE = 'FOWER_THEME_MODE'

export const IS_DB_OPENED = '__IS_DB_OPENED__'

export const isServer = typeof window === 'undefined'

export const isBrowser = typeof window !== 'undefined'

export const isNavigator = typeof navigator !== 'undefined'

export const isProd = env.NODE_ENV === 'production'

export const PENX_AUTHORIZED_USER = 'PENX_AUTHORIZED_USER'

export const PENX_SESSION_DATA = 'PENX_SESSION_DATA'

export const LOCAL_AUTO_BACKUP_DIR = 'LOCAL_AUTO_BACKUP_DIR'

export const TODO_DATABASE_NAME = '__TODO__'

export const FILE_DATABASE_NAME = '__FILE__'

export const GOOGLE_DRIVE_FOLDER_NAME = 'penx-backup-user'
export const GOOGLE_DRIVE_RECOVERY_PHRASE_FILE = 'recovery-phrase.json'

export const GOOGLE_DRIVE_FILE_FOLDER_NAME = 'penx-files-user'

export const GOOGLE_DRIVE_BACKUP_INTERVAL = 'GOOGLE_DRIVE_BACKUP_INTERVAL'

export const LOCAL_BACKUP_INTERVAL = 'LOCAL_BACKUP_INTERVAL'

export const LOCAL_USER_ID = 'acee1a5c-8e36-4a5f-846d-860566086e23'

export const WORKBENCH_NAV_HEIGHT = 48

export const DATABASE_TOOLBAR_HEIGHT = 42

export const SIDEBAR_WIDTH = 220

export const isSelfHosted = env.NEXT_PUBLIC_DEPLOY_MODE !== 'PLATFORM'

export const isSyncEnabled = env.NEXT_PUBLIC_IS_SYNC_ENABLED === 'true'

export const NEXTAUTH_PROVIDERS = env.NEXT_PUBLIC_NEXTAUTH_PROVIDERS

export const PLATFORM = env.NEXT_PUBLIC_PLATFORM || env.PLASMO_PUBLIC_PLATFORM

export const ENV_BASE_URL =
  env.NEXT_PUBLIC_API_BASE_URL ||
  env.NEXT_PUBLIC_NEXTAUTH_URL ||
  env.VITE_API_URL ||
  env.PLASMO_PUBLIC_BASE_URL

export const BASE_URL = (() => {
  if (ENV_BASE_URL) return ENV_BASE_URL
  if (isServer) return ''
  return `${location.protocol}//${location.host}`
})()

export const isExtension = PLATFORM === 'EXTENSION'
export const isDesktop = PLATFORM === 'DESKTOP'

export enum SyncScope {
  CURRENT_DOC,
  ALL_CHANGES,
}

export enum SyncStrategy {
  MERGE,
  PR,
}

export enum WorkerEvents {
  START_POLLING,

  UPDATE_SESSION,

  START_PUSH,
  PUSH_SUCCEEDED,
  PUSH_FAILED,

  START_PULL,
  PULL_SUCCEEDED,
  PULL_FAILED,

  ADD_TEXT_SUCCEEDED,

  START_LOCAL_BACKUP,
}

export enum SyncStatus {
  NORMAL,

  PUSHING,
  PUSH_SUCCEEDED,
  PUSH_FAILED,

  PULLING,
  PULL_SUCCEEDED,
  PULL_FAILED,
}

export enum SettingsType {
  APPEARANCE = 'APPEARANCE',
  PREFERENCES = 'PREFERENCES',
  HOTKEYS = 'HOTKEYS',
  ABOUT = 'ABOUT',
  EXTENSIONS = 'EXTENSIONS',

  ACCOUNT_SETTINGS = 'ACCOUNT_SETTINGS',
  RECOVERY_PHRASE = 'RECOVERY_PHRASE',
  SYNC_BACKUP = 'SYNC_BACKUP',
  LOCAL_BACKUP = 'LOCAL_BACKUP',
  SYNC_SERVER = 'SYNC_SERVER',
  SPACE = 'SPACE',
}

export enum ModalNames {
  DELETE_NODE,

  ROW,

  DELETE_COLUMN,
  CONFIG_COLUMN,
  DELETE_DATABASE,
  DELETE_ACCOUNT,

  CREATE_SPACE,
  SYNC_SERVER,
  RESTORE_FROM_GITHUB,
  IMPORT_SPACE,
  DELETE_SPACE,
  LOGIN_SUCCESS,
  SYNC_DETECTOR,
  SIWE,

  SETTINGS,

  TAG_HUB,

  GENERATE_REFERRAL_CODE,

  MY_REFERRALS,

  LOGIN_BY_TOKEN,
}

export enum RoleType {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum SyncServerType {
  OFFICIAL = 'OFFICIAL',
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export enum NetworkNames {
  MAINNET = 'MAINNET',
  SEPOLIA = 'SEPOLIA',
  DEVELOP = 'DEVELOP',
  LOCAL = 'LOCAL',
}

export const NETWORK = env.NEXT_PUBLIC_NETWORK as NetworkNames

export const RPC_URL_MAP: Record<NetworkNames, string> = {
  [NetworkNames.LOCAL]: env.NEXT_PUBLIC_LOCAL_RPC_URL!,
  [NetworkNames.DEVELOP]: env.NEXT_PUBLIC_DEVELOP_RPC_URL!,
  [NetworkNames.SEPOLIA]: env.NEXT_PUBLIC_SEPOLIA_RPC_URL!,
  [NetworkNames.MAINNET]: env.NEXT_PUBLIC_DEVELOP_RPC_URL!,
}

export enum CliLoginStatus {
  CANCELED = 'CANCELED',
  CONFIRMED = 'CONFIRMED',
  INIT = 'INIT',
}
