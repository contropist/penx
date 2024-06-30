import { invoke } from '@tauri-apps/api/core'

/**
 * @returns <app data dir>/extensions
 */
export function getDefaultExtensionsDir() {
  return invoke<String>('plugin:jarvis|get_default_extensions_dir')
}

/**
 * @returns <app data dir>/extensions_storage
 */
export function getDefaultExtensionsStorageDir() {
  return invoke<String>('plugin:jarvis|get_default_extensions_storage_dir')
}
