import { ExtensionLabelMap } from '@/models/extension'
import { invoke } from '@tauri-apps/api/core'

export function isWindowLabelRegistered(label: string) {
  return invoke<boolean>('plugin:jarvis|is_window_label_registered', { label })
}

/**
 * @param extensionPath
 * @returns Window Label
 */
export function registerExtensionWindow(extensionPath: string) {
  return invoke<string>('plugin:jarvis|register_extension_window', {
    extensionPath,
  })
}

export function unregisterExtensionWindow(label: string) {
  return invoke<void>('plugin:jarvis|unregister_extension_window', { label })
}

export function getExtLabelMap() {
  return invoke<ExtensionLabelMap>('plugin:jarvis|get_ext_label_map')
}
