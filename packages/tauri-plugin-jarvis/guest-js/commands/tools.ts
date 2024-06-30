import { invoke } from '@tauri-apps/api/core'

export function openDevTools() {
  return invoke<void>('plugin:jarvis|open_devtools')
}

export function closeDevTools() {
  return invoke<void>('plugin:jarvis|close_devtools')
}

export function toggleDevTools() {
  return invoke<void>('plugin:jarvis|toggle_devtools')
}

export function isDevToolsOpen() {
  return invoke<boolean>('plugin:jarvis|is_devtools_open')
}

/**
 * Check if the app is running in development mode.
 * @returns true if the app is running in development mode, false otherwise
 */
export function appIsDev() {
  return invoke<boolean>('plugin:jarvis|app_is_dev')
}
